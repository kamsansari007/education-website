import { Link } from 'react-router-dom'
import { Monogram } from '@/components/ui/Monogram'
import { CompareToggle } from '@/features/compare/CompareToggle'
import { formatFeeRange, formatPlace } from '@/lib/format'
import { OWNERSHIP_LABEL } from '@/lib/labels'
import type { CollegeSummary } from '@/types/dto'

/** Compact row: colleges are defined by affiliation and stream, and are scanned in numbers. */
export function CollegeRow({
  college,
  showCompare = false,
}: {
  college: CollegeSummary
  showCompare?: boolean
}) {
  return (
    <li className="flex gap-4 py-4 lg:py-5">
      <Monogram name={college.name} />
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-4">
          <h3 className="type-h3 min-w-0">
            <Link
              to={`/colleges/${college.slug}`}
              className="text-body hover:text-ink hover:underline"
            >
              {college.name}
            </Link>
          </h3>
          {showCompare && (
            <CompareToggle type="college" item={{ slug: college.slug, name: college.name }} />
          )}
        </div>
        <p className="mt-0.5 flex flex-wrap gap-x-4 text-muted">
          <span>{formatPlace(college.city, college.state)}</span>
          <span>{OWNERSHIP_LABEL[college.ownership]}</span>
          <span>
            Affiliated to{' '}
            <Link
              to={`/universities/${college.affiliatedUniversity.slug}`}
              className="text-ink underline"
            >
              {college.affiliatedUniversity.name}
            </Link>
          </span>
        </p>
        <dl className="mt-2 flex flex-wrap gap-x-6 gap-y-1">
          <div className="flex gap-2">
            <dt className="type-meta">Streams</dt>
            <dd className="type-small font-medium">{college.streams.join(', ')}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="type-meta">Fees per year</dt>
            <dd className="type-small font-medium tabular-nums">
              {college.annualFeeRange ? formatFeeRange(college.annualFeeRange) : 'Not available'}
            </dd>
          </div>
        </dl>
      </div>
    </li>
  )
}
