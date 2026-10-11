import { CourseLedger } from '@/features/courses/CourseLedger'
import { LedgerRowsSkeleton } from '@/features/institutions/RowSkeletons'
import { ListingPage } from '@/features/listing/ListingPage'
import { getCourses } from '@/services'

const FACET_KEYS = ['level', 'stream', 'mode', 'duration', 'fee']

export function CoursesPage() {
  return (
    <ListingPage
      type="course"
      title="Courses"
      description="Every course, with its duration, study modes, fee range and how many institutions offer it."
      metaDescription="Browse and filter courses by level, stream, mode, duration and fees. Demo with fictional data."
      searchPlaceholder="Course name, e.g. MBA or B.Tech"
      facetKeys={FACET_KEYS}
      load={getCourses}
      skeleton={<LedgerRowsSkeleton />}
      renderResults={(courses) => <CourseLedger courses={courses} showCompare />}
    />
  )
}
