/**
 * Data transfer objects returned by the service layer.
 * These shapes are the contract the Phase 2 API will implement.
 */
import type { CourseLevel, Ownership, StudyMode, StudyModeGuide, UniversityType } from './domain'

export interface FeeRange {
  /** INR */
  min: number
  /** INR */
  max: number
}

export interface LinkRef {
  slug: string
  name: string
}

export interface StreamSummary {
  slug: string
  name: string
  courseCount: number
}

export interface CourseSummary {
  slug: string
  shortName: string
  name: string
  level: CourseLevel
  streamSlug: string
  streamName: string
  typicalDurationYears: number
  modes: StudyMode[]
  /** Range of total programme fees across offerings. Null when no offering exists. */
  totalFeeRange: FeeRange | null
  institutionCount: number
}

export interface ApprovalLabel {
  code: string
  /** Display text, e.g. "NAAC A+". */
  label: string
}

export interface UniversitySummary {
  slug: string
  name: string
  city: string
  state: string
  type: UniversityType
  established: number
  modes: StudyMode[]
  courseCount: number
  streams: string[]
  /** Per-year fee range across offerings. */
  annualFeeRange: FeeRange | null
  approvals: ApprovalLabel[]
  highlightedCourses: { slug: string; shortName: string }[]
}

export interface CollegeSummary {
  slug: string
  name: string
  city: string
  state: string
  ownership: Ownership
  affiliatedUniversity: LinkRef
  streams: string[]
  annualFeeRange: FeeRange | null
}

export interface ApprovalInfo {
  code: string
  name: string
  summary: string
  howToCheck: string
}

export interface ArticleSummary {
  slug: string
  title: string
  excerpt: string
  category: LinkRef
  authorName: string
  publishedOn: string
  readingMinutes: number
}

export interface CatalogStats {
  courses: number
  universities: number
  colleges: number
}

/**
 * An illustrative path between two related courses in one stream (homepage route map).
 * Not an admission requirement: eligibility is per course.
 */
export interface CourseRoute {
  from: CourseSummary
  to: CourseSummary
}

export interface HomeHighlights {
  courses: CourseSummary[]
  universities: UniversitySummary[]
  colleges: CollegeSummary[]
  featuredArticle: ArticleSummary | null
  recentArticles: ArticleSummary[]
  comparePreview: UniversitySummary[]
  routes: CourseRoute[]
}

export type { StudyModeGuide }

/* ---------- Detail pages (Milestone 3A) ---------- */

/** One course as offered by one institution (a row in "Courses and fees"). */
export interface OfferingRow {
  course: {
    slug: string
    shortName: string
    name: string
    level: CourseLevel
    streamSlug: string
    streamName: string
    /** General eligibility for the course (not institution-specific). */
    eligibility: string
  }
  mode: StudyMode
  durationYears: number
  /** INR, whole programme. */
  totalFee: number
  /** INR, total divided by duration. */
  annualFee: number
}

/** An approval held by an institution, with what it means and where to check it. */
export interface ApprovalDetail {
  code: string
  /** e.g. "NAAC A+" */
  label: string
  name: string
  summary: string
  howToCheck: string
}

export interface UniversityDetail extends UniversitySummary {
  summary: string
  approvalDetails: ApprovalDetail[]
  offerings: OfferingRow[]
  affiliatedColleges: CollegeSummary[]
  /** Other universities sharing the most streams with this one. */
  similar: UniversitySummary[]
  relatedArticles: ArticleSummary[]
}

export interface CollegeDetail extends CollegeSummary {
  summary: string
  established: number
  modes: StudyMode[]
  courseCount: number
  approvals: ApprovalLabel[]
  approvalDetails: ApprovalDetail[]
  offerings: OfferingRow[]
  /** The affiliated university, summarised for its card. */
  university: UniversitySummary
  /** Other colleges affiliated to the same university. */
  siblings: CollegeSummary[]
  relatedArticles: ArticleSummary[]
}

/* ---------- Enquiry (PRD §13) ---------- */

export interface EnquiryContext {
  /** Prefill for "Interested in", e.g. "MBA at Deccan Lantern University". */
  interest?: string
  source?: { type: 'university' | 'college' | 'course' | 'search' | 'general'; slug?: string }
}

export interface EnquiryPayload {
  fullName: string
  /** Ten digits, without +91. */
  mobile: string
  email?: string
  location: string
  interest: string
  preferredMode?: StudyMode | 'not-sure'
  message?: string
  consent: true
  context: EnquiryContext & { pagePath: string; submittedAt: string }
}

export interface EnquiryResult {
  /** Phase 1 never sends anything. Phase 2 returns 'received'. */
  status: 'simulated'
}
