import { approvals } from '@/data/approvals'
import { articles } from '@/data/articles'
import { colleges } from '@/data/colleges'
import { streams } from '@/data/streams'
import { universities } from '@/data/universities'
import type { ApprovalHolding, Offering } from '@/types/domain'
import type { ApprovalDetail, CollegeDetail, OfferingRow, UniversityDetail } from '@/types/dto'
import {
  findCourse,
  findUniversity,
  offeringsAt,
  toArticleSummary,
  toCollegeSummary,
  toUniversitySummary,
} from './derive'

const LEVEL_ORDER = ['ug', 'pg', 'diploma', 'certificate', 'doctorate']

function toOfferingRow(offering: Offering): OfferingRow {
  const course = findCourse(offering.courseId)
  const stream = streams.find((candidate) => candidate.id === course.streamId)
  return {
    course: {
      slug: course.slug,
      shortName: course.shortName,
      name: course.name,
      level: course.level,
      streamSlug: stream?.slug ?? '',
      streamName: stream?.name ?? '',
      eligibility: course.eligibility,
    },
    mode: offering.mode,
    durationYears: offering.durationYears,
    totalFee: offering.totalFee,
    annualFee: Math.round(offering.totalFee / offering.durationYears),
  }
}

/** Offerings ordered by level, then course name, then mode. */
function offeringRows(items: Offering[]): OfferingRow[] {
  return items
    .map(toOfferingRow)
    .sort(
      (a, b) =>
        LEVEL_ORDER.indexOf(a.course.level) - LEVEL_ORDER.indexOf(b.course.level) ||
        a.course.shortName.localeCompare(b.course.shortName) ||
        a.mode.localeCompare(b.mode),
    )
}

function approvalDetails(holdings: ApprovalHolding[]): ApprovalDetail[] {
  return holdings.flatMap((holding) => {
    const approval = approvals.find((candidate) => candidate.id === holding.approvalId)
    if (!approval) return []
    return [
      {
        code: approval.code,
        label: holding.grade ? `${approval.code} ${holding.grade}` : approval.code,
        name: approval.name,
        summary: approval.summary,
        howToCheck: approval.howToCheck,
      },
    ]
  })
}

/** Guides linked to any course this institution offers (real article–course relations). */
function relatedArticles(items: Offering[]) {
  const courseIds = new Set(items.map((offering) => offering.courseId))
  return articles
    .filter((article) => article.relatedCourseIds.some((id) => courseIds.has(id)))
    .sort((a, b) => b.publishedOn.localeCompare(a.publishedOn))
    .slice(0, 3)
    .map(toArticleSummary)
}

export async function getUniversityBySlug(slug: string): Promise<UniversityDetail | null> {
  const university = universities.find((candidate) => candidate.slug === slug)
  if (!university) return null
  const own = offeringsAt({ kind: 'university', id: university.id })
  const summary = toUniversitySummary(university)
  const streamSet = new Set(summary.streams)

  const similar = universities
    .filter((candidate) => candidate.id !== university.id)
    .map((candidate) => {
      const other = toUniversitySummary(candidate)
      return { other, shared: other.streams.filter((name) => streamSet.has(name)).length }
    })
    .filter(({ shared }) => shared > 0)
    .sort((a, b) => b.shared - a.shared || a.other.name.localeCompare(b.other.name))
    .slice(0, 3)
    .map(({ other }) => other)

  return {
    ...summary,
    summary: university.summary,
    approvalDetails: approvalDetails(university.approvals),
    offerings: offeringRows(own),
    affiliatedColleges: colleges
      .filter((college) => college.affiliatedUniversityId === university.id)
      .map(toCollegeSummary),
    similar,
    relatedArticles: relatedArticles(own),
  }
}

export async function getCollegeBySlug(slug: string): Promise<CollegeDetail | null> {
  const college = colleges.find((candidate) => candidate.slug === slug)
  if (!college) return null
  const own = offeringsAt({ kind: 'college', id: college.id })
  const rows = offeringRows(own)
  const university = findUniversity(college.affiliatedUniversityId)
  const details = approvalDetails(college.approvals)

  return {
    ...toCollegeSummary(college),
    summary: college.summary,
    established: college.established,
    modes: [...new Set(rows.map((row) => row.mode))],
    courseCount: new Set(rows.map((row) => row.course.slug)).size,
    approvals: details.map(({ code, label }) => ({ code, label })),
    approvalDetails: details,
    offerings: rows,
    university: toUniversitySummary(university),
    siblings: colleges
      .filter(
        (other) =>
          other.affiliatedUniversityId === college.affiliatedUniversityId &&
          other.id !== college.id,
      )
      .map(toCollegeSummary),
    relatedArticles: relatedArticles(own),
  }
}
