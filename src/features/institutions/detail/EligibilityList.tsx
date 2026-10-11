import { Link } from 'react-router-dom'
import type { OfferingRow } from '@/types/dto'

/** General eligibility, once per course offered here (not per mode). */
export function EligibilityList({ rows }: { rows: OfferingRow[] }) {
  const courses = [...new Map(rows.map((row) => [row.course.slug, row.course])).values()]
  return (
    <dl className="divide-y divide-rule border-y border-rule">
      {courses.map((course) => (
        <div key={course.slug} className="gap-6 py-4 md:grid md:grid-cols-[12rem_minmax(0,1fr)]">
          <dt className="font-semibold">
            <Link
              to={`/courses/${course.slug}`}
              className="text-body hover:text-ink hover:underline"
            >
              {course.shortName}
            </Link>
          </dt>
          <dd className="mt-1 md:mt-0">{course.eligibility}</dd>
        </div>
      ))}
    </dl>
  )
}
