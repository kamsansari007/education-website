import { colleges } from '@/data/colleges'
import { courses } from '@/data/courses'
import { locations } from '@/data/locations'
import { offerings } from '@/data/offerings'
import { streams } from '@/data/streams'
import { universities } from '@/data/universities'
import { approvals } from '@/data/approvals'
import { articleCategories } from '@/data/articles'
import type {
  Article,
  College,
  Course,
  ID,
  InstitutionRef,
  Offering,
  StudyMode,
  University,
} from '@/types/domain'
import type {
  ApprovalLabel,
  ArticleSummary,
  CollegeSummary,
  CourseSummary,
  FeeRange,
  UniversitySummary,
} from '@/types/dto'

const MODE_ORDER: StudyMode[] = ['regular', 'online', 'distance']

function byId<T extends { id: ID }>(items: T[], id: ID, entity: string): T {
  const item = items.find((candidate) => candidate.id === id)
  if (!item) throw new Error(`${entity} not found: ${id}`)
  return item
}

export const findCourse = (id: ID): Course => byId(courses, id, 'Course')
export const findUniversity = (id: ID): University => byId(universities, id, 'University')
export const findCollege = (id: ID): College => byId(colleges, id, 'College')

function range(values: number[]): FeeRange | null {
  if (values.length === 0) return null
  return { min: Math.min(...values), max: Math.max(...values) }
}

function uniqueModes(items: Offering[]): StudyMode[] {
  const present = new Set(items.map((offering) => offering.mode))
  return MODE_ORDER.filter((mode) => present.has(mode))
}

export function offeringsAt(ref: InstitutionRef): Offering[] {
  return offerings.filter(
    (offering) => offering.institution.kind === ref.kind && offering.institution.id === ref.id,
  )
}

function streamNamesFor(items: Offering[]): string[] {
  const streamIds = new Set(items.map((offering) => findCourse(offering.courseId).streamId))
  return streams.filter((stream) => streamIds.has(stream.id)).map((stream) => stream.name)
}

function approvalLabels(holdings: University['approvals']): ApprovalLabel[] {
  return holdings.map(({ approvalId, grade }) => {
    const approval = byId(approvals, approvalId, 'Approval')
    return { code: approval.code, label: grade ? `${approval.code} ${grade}` : approval.code }
  })
}

export const annualFees = (items: Offering[]) =>
  items.map((offering) => Math.round(offering.totalFee / offering.durationYears))

export function toCourseSummary(course: Course): CourseSummary {
  const courseOfferings = offerings.filter((offering) => offering.courseId === course.id)
  const institutionKeys = new Set(
    courseOfferings.map((offering) => `${offering.institution.kind}:${offering.institution.id}`),
  )
  return {
    slug: course.slug,
    shortName: course.shortName,
    name: course.name,
    level: course.level,
    streamSlug: byId(streams, course.streamId, 'Stream').slug,
    streamName: byId(streams, course.streamId, 'Stream').name,
    typicalDurationYears: course.typicalDurationYears,
    modes: uniqueModes(courseOfferings),
    totalFeeRange: range(courseOfferings.map((offering) => offering.totalFee)),
    institutionCount: institutionKeys.size,
  }
}

export function toUniversitySummary(university: University): UniversitySummary {
  const own = offeringsAt({ kind: 'university', id: university.id })
  const location = byId(locations, university.locationId, 'Location')
  const courseIds = [...new Set(own.map((offering) => offering.courseId))]
  return {
    slug: university.slug,
    name: university.name,
    city: location.city,
    state: location.state,
    type: university.type,
    established: university.established,
    modes: uniqueModes(own),
    courseCount: courseIds.length,
    streams: streamNamesFor(own),
    annualFeeRange: range(annualFees(own)),
    approvals: approvalLabels(university.approvals),
    highlightedCourses: courseIds.slice(0, 3).map((id) => {
      const course = findCourse(id)
      return { slug: course.slug, shortName: course.shortName }
    }),
  }
}

export function toCollegeSummary(college: College): CollegeSummary {
  const own = offeringsAt({ kind: 'college', id: college.id })
  const location = byId(locations, college.locationId, 'Location')
  const university = findUniversity(college.affiliatedUniversityId)
  return {
    slug: college.slug,
    name: college.name,
    city: location.city,
    state: location.state,
    ownership: college.ownership,
    affiliatedUniversity: { slug: university.slug, name: university.name },
    streams: streamNamesFor(own),
    annualFeeRange: range(annualFees(own)),
  }
}

export function toArticleSummary(article: Article): ArticleSummary {
  const category = byId(articleCategories, article.categoryId, 'Article category')
  return {
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    category: { slug: category.slug, name: category.name },
    authorName: article.authorName,
    publishedOn: article.publishedOn,
    readingMinutes: article.readingMinutes,
  }
}
