import { Link } from 'react-router-dom'
import { FactGroup } from '@/components/ui/FactGroup'
import { Monogram } from '@/components/ui/Monogram'
import { CompareToggle } from '@/features/compare/CompareToggle'
import { formatFeeRange, formatPlace } from '@/lib/format'
import { UNIVERSITY_TYPE_LABEL, listModes } from '@/lib/labels'
import type { UniversitySummary } from '@/types/dto'

/** Profile row: the richest listing row, because universities are judged as a whole. */
export function UniversityRow({
  university,
  showCompare = false,
}: {
  university: UniversitySummary
  showCompare?: boolean
}) {
  return (
    <li className="flex gap-4 py-5 lg:gap-6 lg:py-6">
      <Monogram name={university.name} size="responsive" />
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="type-h3">
              <Link
                to={`/universities/${university.slug}`}
                className="text-body hover:text-ink hover:underline"
              >
                {university.name}
              </Link>
            </h3>
            <p className="mt-0.5 flex flex-wrap gap-x-4 text-muted">
              <span>{formatPlace(university.city, university.state)}</span>
              <span>{UNIVERSITY_TYPE_LABEL[university.type]}</span>
            </p>
          </div>
          {showCompare && (
            <CompareToggle
              type="university"
              item={{ slug: university.slug, name: university.name }}
            />
          )}
        </div>
        <FactGroup
          className="mt-3 md:grid md:max-w-3xl md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.6fr)_minmax(0,1fr)_minmax(0,1.3fr)] md:gap-x-6"
          facts={[
            { label: 'Modes', value: listModes(university.modes) },
            { label: 'Courses', value: university.courseCount },
            {
              label: 'Fees per year',
              value: university.annualFeeRange
                ? formatFeeRange(university.annualFeeRange)
                : 'Not available',
            },
            {
              label: 'Approvals',
              value: university.approvals.map((a) => a.label).join(', ') || 'None listed',
            },
          ]}
        />
        {university.highlightedCourses.length > 0 && (
          <p className="type-small mt-3 text-muted">
            Courses here:{' '}
            {university.highlightedCourses.map((course, index) => (
              <span key={course.slug}>
                {index > 0 && ', '}
                <Link to={`/courses/${course.slug}`} className="font-medium text-ink underline">
                  {course.shortName}
                </Link>
              </span>
            ))}
          </p>
        )}
      </div>
    </li>
  )
}
