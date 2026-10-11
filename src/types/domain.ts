/**
 * Domain model, normalised like a database: entities reference each other by ID.
 * Derived values (fee ranges, modes, counts) are computed from offerings, never stored.
 */

export type ID = string

export type StudyMode = 'regular' | 'online' | 'distance'
export type CourseLevel = 'ug' | 'pg' | 'diploma' | 'certificate' | 'doctorate'
export type UniversityType = 'central' | 'state' | 'private' | 'deemed'
export type Ownership = 'government' | 'private'
export type ApprovalCode = 'UGC' | 'AICTE' | 'NAAC'

export interface Location {
  id: ID
  city: string
  state: string
}

export interface Stream {
  id: ID
  slug: string
  name: string
}

export interface Approval {
  id: ID
  code: ApprovalCode
  name: string
  summary: string
  howToCheck: string
}

/** An approval as held by an institution, e.g. NAAC with a grade. */
export interface ApprovalHolding {
  approvalId: ID
  grade?: string
}

export interface Course {
  id: ID
  slug: string
  shortName: string
  name: string
  level: CourseLevel
  streamId: ID
  typicalDurationYears: number
  eligibility: string
  summary: string
  specializations: string[]
}

export interface University {
  id: ID
  slug: string
  name: string
  type: UniversityType
  locationId: ID
  established: number
  approvals: ApprovalHolding[]
  summary: string
}

export interface College {
  id: ID
  slug: string
  name: string
  ownership: Ownership
  locationId: ID
  affiliatedUniversityId: ID
  established: number
  approvals: ApprovalHolding[]
  summary: string
}

export type InstitutionKind = 'university' | 'college'

export interface InstitutionRef {
  kind: InstitutionKind
  id: ID
}

/** A course as offered by a specific institution. Holds the institution-specific facts. */
export interface Offering {
  id: ID
  courseId: ID
  institution: InstitutionRef
  mode: StudyMode
  durationYears: number
  /** Total programme fee in INR. */
  totalFee: number
}

export interface ArticleCategory {
  id: ID
  slug: string
  name: string
}

export type ContentBlock =
  | { type: 'heading'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; ordered: boolean; items: string[] }
  | { type: 'quote'; text: string; cite?: string }
  | { type: 'callout'; title: string; text: string }

export interface Article {
  id: ID
  slug: string
  title: string
  excerpt: string
  categoryId: ID
  authorName: string
  /** ISO date (YYYY-MM-DD). */
  publishedOn: string
  updatedOn?: string
  readingMinutes: number
  relatedCourseIds: ID[]
  body: ContentBlock[]
}

/** Editorial explanation of a study mode (content, not catalogue data). */
export interface StudyModeGuide {
  mode: StudyMode
  howYouStudy: string
  schedule: string
  oftenSuits: string
  exams: string
  checkBeforeApplying: string
}
