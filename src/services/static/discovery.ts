import { approvals } from '@/data/approvals'
import { colleges } from '@/data/colleges'
import { courses } from '@/data/courses'
import { locations } from '@/data/locations'
import { offerings } from '@/data/offerings'
import { streams } from '@/data/streams'
import { universities } from '@/data/universities'
import { LEVEL_LABEL, MODE_LABEL, OWNERSHIP_LABEL, UNIVERSITY_TYPE_LABEL } from '@/lib/labels'
import type {
  ApprovalHolding,
  CourseLevel,
  ID,
  Offering,
  Ownership,
  StudyMode,
  UniversityType,
} from '@/types/domain'
import type { CollegeSummary, CourseSummary, UniversitySummary } from '@/types/dto'
import type { ListQuery, ListResult } from '@/types/listing'
import {
  annualFees,
  findCourse,
  findUniversity,
  offeringsAt,
  toCollegeSummary,
  toCourseSummary,
  toUniversitySummary,
} from './derive'
import { runListing, type FacetDefinition, type ListingDoc, type SortDefinition } from './listing'

/* ---------- shared facet helpers ---------- */

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/\+/g, '-plus')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

const MODES: StudyMode[] = ['regular', 'online', 'distance']
const NAAC_ORDER = ['A++', 'A+', 'A', 'B++', 'B+', 'B', 'C']

interface Band {
  value: string
  label: string
  /** Inclusive lower bound, exclusive upper bound (INR). */
  min: number
  max: number
}

const LAKH = 100_000
/**
 * Fee bands (DESIGN-DIRECTION.md §12): single-select presets. Institutions are banded by
 * fee per year, courses by total fee; the facet label says which.
 */
const FEE_BANDS: Band[] = [
  { value: 'under-1-lakh', label: 'Under ₹1 lakh', min: 0, max: LAKH },
  { value: '1-3-lakh', label: '₹1–3 lakh', min: LAKH, max: 3 * LAKH },
  { value: '3-5-lakh', label: '₹3–5 lakh', min: 3 * LAKH, max: 5 * LAKH },
  { value: 'over-5-lakh', label: 'Over ₹5 lakh', min: 5 * LAKH, max: Infinity },
]

const bandsFor = (amounts: number[], bands: Band[]) =>
  bands
    .filter((band) => amounts.some((amount) => amount >= band.min && amount < band.max))
    .map((band) => band.value)

const stateOf = (locationId: ID) =>
  locations.find((location) => location.id === locationId)?.state ?? ''

function stateOptions(locationIds: ID[]) {
  const states = [...new Set(locationIds.map(stateOf))].sort((a, b) => a.localeCompare(b))
  return states.map((state) => ({ value: slugify(state), label: state }))
}

const streamOptions = () => streams.map((stream) => ({ value: stream.slug, label: stream.name }))

function streamSlugsFor(items: Offering[]): string[] {
  const ids = new Set(items.map((offering) => findCourse(offering.courseId).streamId))
  return streams.filter((stream) => ids.has(stream.id)).map((stream) => stream.slug)
}

function approvalValue(holding: ApprovalHolding): { value: string; label: string } {
  const approval = approvals.find((candidate) => candidate.id === holding.approvalId)
  const label = approval
    ? holding.grade
      ? `${approval.code} ${holding.grade}`
      : approval.code
    : ''
  return { value: slugify(label), label }
}

function approvalOptions(holdings: ApprovalHolding[]) {
  const unique = new Map(
    holdings.map((holding) => [approvalValue(holding).value, approvalValue(holding)]),
  )
  const rank = (label: string) => {
    if (label === 'UGC') return 0
    if (label === 'AICTE') return 1
    return 2 + NAAC_ORDER.indexOf(label.replace('NAAC ', ''))
  }
  return [...unique.values()].sort((a, b) => rank(a.label) - rank(b.label))
}

const modeOptions = MODES.map((mode) => ({ value: mode, label: MODE_LABEL[mode] }))
const modesOf = (items: Offering[]) => [...new Set(items.map((offering) => offering.mode))]

const courseNamesFor = (items: Offering[]) =>
  [...new Set(items.map((offering) => offering.courseId))]
    .map((id) => {
      const course = findCourse(id)
      return `${course.shortName} ${course.name}`
    })
    .join(' ')

const streamNamesFor = (slugs: string[]) =>
  streams
    .filter((stream) => slugs.includes(stream.slug))
    .map((stream) => stream.name)
    .join(' ')

const NAME_SORT: SortDefinition = { value: 'name', label: 'Name A–Z', by: 'name', direction: 'asc' }
const RELEVANCE_SORT: SortDefinition = {
  value: 'relevance',
  label: 'Relevance',
  by: 'relevance',
  direction: 'asc',
}

/* ---------- universities ---------- */

const UNIVERSITY_TYPES: UniversityType[] = ['central', 'state', 'private', 'deemed']

const universityFacets = (): FacetDefinition[] => [
  { key: 'state', label: 'State', options: stateOptions(universities.map((u) => u.locationId)) },
  {
    key: 'type',
    label: 'Type',
    options: UNIVERSITY_TYPES.map((type) => ({ value: type, label: UNIVERSITY_TYPE_LABEL[type] })),
  },
  { key: 'mode', label: 'Mode', options: modeOptions },
  {
    key: 'approval',
    label: 'Approvals',
    options: approvalOptions(universities.flatMap((u) => u.approvals)),
  },
  { key: 'stream', label: 'Streams offered', options: streamOptions() },
  { key: 'fee', label: 'Fees per year', selection: 'single', options: FEE_BANDS },
]

let universityDocs: ListingDoc<UniversitySummary>[] | null = null
function getUniversityDocs() {
  universityDocs ??= universities.map((university) => {
    const own = offeringsAt({ kind: 'university', id: university.id })
    const summary = toUniversitySummary(university)
    const streamSlugs = streamSlugsFor(own)
    const fees = annualFees(own)
    return {
      item: summary,
      text: {
        name: university.name,
        other: [
          summary.city,
          summary.state,
          UNIVERSITY_TYPE_LABEL[university.type],
          streamNamesFor(streamSlugs),
          courseNamesFor(own),
        ].join(' '),
      },
      facetValues: {
        state: [slugify(summary.state)],
        type: [university.type],
        mode: modesOf(own),
        approval: university.approvals.map((holding) => approvalValue(holding).value),
        stream: streamSlugs,
        fee: bandsFor(fees, FEE_BANDS),
      },
      sortKeys: { name: university.name, fees: fees.length ? Math.min(...fees) : null },
    }
  })
  return universityDocs
}

export const UNIVERSITY_SORTS: SortDefinition[] = [
  RELEVANCE_SORT,
  NAME_SORT,
  { value: 'fees', label: 'Fees: low to high', by: 'fees', direction: 'asc' },
]

export async function getUniversities(query: ListQuery): Promise<ListResult<UniversitySummary>> {
  return runListing(getUniversityDocs(), universityFacets(), UNIVERSITY_SORTS, query)
}

/* ---------- colleges ---------- */

const OWNERSHIPS: Ownership[] = ['government', 'private']

const collegeFacets = (): FacetDefinition[] => {
  const affiliated = [...new Set(colleges.map((college) => college.affiliatedUniversityId))]
    .map((id) => findUniversity(id))
    .sort((a, b) => a.name.localeCompare(b.name))
  return [
    { key: 'state', label: 'State', options: stateOptions(colleges.map((c) => c.locationId)) },
    {
      key: 'ownership',
      label: 'Ownership',
      options: OWNERSHIPS.map((ownership) => ({
        value: ownership,
        label: OWNERSHIP_LABEL[ownership],
      })),
    },
    { key: 'stream', label: 'Stream', options: streamOptions() },
    {
      key: 'university',
      label: 'Affiliated university',
      options: affiliated.map((university) => ({ value: university.slug, label: university.name })),
    },
    {
      key: 'approval',
      label: 'Approvals',
      options: approvalOptions(colleges.flatMap((c) => c.approvals)),
    },
    { key: 'fee', label: 'Fees per year', selection: 'single', options: FEE_BANDS },
  ]
}

let collegeDocs: ListingDoc<CollegeSummary>[] | null = null
function getCollegeDocs() {
  collegeDocs ??= colleges.map((college) => {
    const own = offeringsAt({ kind: 'college', id: college.id })
    const summary = toCollegeSummary(college)
    const streamSlugs = streamSlugsFor(own)
    const fees = annualFees(own)
    return {
      item: summary,
      text: {
        name: college.name,
        other: [
          summary.city,
          summary.state,
          OWNERSHIP_LABEL[college.ownership],
          summary.affiliatedUniversity.name,
          streamNamesFor(streamSlugs),
          courseNamesFor(own),
        ].join(' '),
      },
      facetValues: {
        state: [slugify(summary.state)],
        ownership: [college.ownership],
        stream: streamSlugs,
        university: [summary.affiliatedUniversity.slug],
        approval: college.approvals.map((holding) => approvalValue(holding).value),
        fee: bandsFor(fees, FEE_BANDS),
      },
      sortKeys: { name: college.name, fees: fees.length ? Math.min(...fees) : null },
    }
  })
  return collegeDocs
}

export const COLLEGE_SORTS: SortDefinition[] = UNIVERSITY_SORTS

export async function getColleges(query: ListQuery): Promise<ListResult<CollegeSummary>> {
  return runListing(getCollegeDocs(), collegeFacets(), COLLEGE_SORTS, query)
}

/* ---------- courses ---------- */

const LEVELS: CourseLevel[] = ['ug', 'pg', 'diploma', 'certificate', 'doctorate']

const DURATIONS = [
  { value: 'up-to-1-year', label: 'Up to 1 year', test: (years: number) => years <= 1 },
  { value: '2-years', label: '2 years', test: (years: number) => years > 1 && years <= 2 },
  { value: '3-years', label: '3 years', test: (years: number) => years > 2 && years <= 3 },
  { value: '4-years', label: '4 years', test: (years: number) => years > 3 && years <= 4 },
  { value: '5-years-or-more', label: '5 years or more', test: (years: number) => years > 4 },
]

const courseFacets = (): FacetDefinition[] => [
  {
    key: 'level',
    label: 'Level',
    options: LEVELS.map((level) => ({ value: level, label: LEVEL_LABEL[level] })),
  },
  { key: 'stream', label: 'Stream', options: streamOptions() },
  { key: 'mode', label: 'Mode', options: modeOptions },
  {
    key: 'duration',
    label: 'Duration',
    options: DURATIONS.map(({ value, label }) => ({ value, label })),
  },
  { key: 'fee', label: 'Total fees', selection: 'single', options: FEE_BANDS },
]

let courseDocs: ListingDoc<CourseSummary>[] | null = null
function getCourseDocs() {
  courseDocs ??= courses.map((course) => {
    const own = offerings.filter((offering) => offering.courseId === course.id)
    const summary = toCourseSummary(course)
    const stream = streams.find((candidate) => candidate.id === course.streamId)
    return {
      item: summary,
      text: {
        name: `${course.shortName} ${course.name}`,
        other: [
          summary.streamName,
          LEVEL_LABEL[course.level],
          course.specializations.join(' '),
        ].join(' '),
      },
      facetValues: {
        level: [course.level],
        stream: stream ? [stream.slug] : [],
        mode: modesOf(own),
        duration: DURATIONS.filter((duration) => duration.test(course.typicalDurationYears)).map(
          (d) => d.value,
        ),
        fee: bandsFor(
          own.map((offering) => offering.totalFee),
          FEE_BANDS,
        ),
      },
      sortKeys: { name: course.shortName, duration: course.typicalDurationYears },
    }
  })
  return courseDocs
}

export const COURSE_SORTS: SortDefinition[] = [
  RELEVANCE_SORT,
  NAME_SORT,
  { value: 'duration', label: 'Duration: shortest first', by: 'duration', direction: 'asc' },
]

export async function getCourses(query: ListQuery): Promise<ListResult<CourseSummary>> {
  return runListing(getCourseDocs(), courseFacets(), COURSE_SORTS, query)
}
