import { Link } from 'react-router-dom'
import { CompareToggle } from '@/features/compare/CompareToggle'
import { cn } from '@/lib/cn'
import { formatFeeRange, formatYears, pluralise } from '@/lib/format'
import { LEVEL_LABEL, LEVEL_SHORT_LABEL, listModes } from '@/lib/labels'
import type { CourseSummary } from '@/types/dto'

const FACT_LABELS = ['Level', 'Duration', 'Modes', 'Total fees', 'Offered at'] as const

/**
 * Class sets per layout. "wide" (homepage, full width) switches to aligned columns at
 * 1024px. "listing" sits beside the filter rail and has a compare column, so it waits
 * until 1280px for enough room. Literal strings so Tailwind can see every class.
 */
const LAYOUT = {
  wide: {
    columns:
      'lg:grid lg:grid-cols-[minmax(0,2.2fr)_minmax(0,0.7fr)_minmax(0,0.8fr)_minmax(0,1.3fr)_minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-x-6',
    header: 'hidden lg:grid',
    row: 'lg:items-center lg:py-5',
    facts: 'lg:col-span-5 lg:mt-0 lg:grid lg:grid-cols-subgrid',
    factLabel: 'lg:sr-only',
    inlineToggle: 'lg:hidden',
    columnToggle: 'hidden lg:block',
    headerLabels: ['Level', 'Duration', 'Modes', 'Total fees', 'Offered at'],
    /** Level has its own column. */
    levelFact: '',
    levelInTitle: 'hidden',
  },
  listing: {
    columns:
      'xl:grid xl:grid-cols-[minmax(0,1.6fr)_5.5rem_minmax(0,1.2fr)_minmax(0,1.5fr)_minmax(0,1fr)_7rem] xl:gap-x-5',
    header: 'hidden xl:grid',
    row: 'xl:items-center xl:py-5',
    facts: 'xl:col-span-4 xl:mt-0 xl:grid xl:grid-cols-subgrid',
    factLabel: 'xl:sr-only',
    inlineToggle: 'xl:hidden',
    columnToggle: 'hidden xl:block',
    headerLabels: ['Duration', 'Modes', 'Total fees', 'Offered at'],
    /** Beside the filter rail there is no room for a level column: level moves under the name. */
    levelFact: 'xl:hidden',
    levelInTitle: 'hidden xl:block',
  },
} as const

/**
 * Courses as catalogue lines (DESIGN-DIRECTION.md §9). With room, the facts sit in aligned
 * columns under a visual header; otherwise each fact shows its own inline label.
 */
export function CourseLedger({
  courses,
  showCompare = false,
}: {
  courses: CourseSummary[]
  /** Listing pages show the compare toggle; the homepage preview does not. */
  showCompare?: boolean
}) {
  const layout = showCompare ? LAYOUT.listing : LAYOUT.wide
  return (
    <div>
      <div
        aria-hidden="true"
        className={cn('type-meta border-b border-rule pb-2', layout.header, layout.columns)}
      >
        <span>Course</span>
        {layout.headerLabels.map((label) => (
          <span key={label}>{label}</span>
        ))}
        {showCompare && <span />}
      </div>
      <ul className="divide-y divide-rule border-b border-rule">
        {courses.map((course) => (
          <CourseLedgerRow
            key={course.slug}
            course={course}
            layout={layout}
            showCompare={showCompare}
          />
        ))}
      </ul>
    </div>
  )
}

function CourseLedgerRow({
  course,
  layout,
  showCompare,
}: {
  course: CourseSummary
  layout: (typeof LAYOUT)[keyof typeof LAYOUT]
  showCompare: boolean
}) {
  const values = [
    LEVEL_SHORT_LABEL[course.level],
    formatYears(course.typicalDurationYears),
    course.modes.length > 0 ? listModes(course.modes) : 'Not available',
    course.totalFeeRange ? formatFeeRange(course.totalFeeRange) : 'Not available',
    pluralise(course.institutionCount, 'institution'),
  ]
  const toggle = showCompare && (
    <CompareToggle type="course" item={{ slug: course.slug, name: course.shortName }} />
  )

  return (
    <li className={cn('py-4', layout.row, layout.columns)}>
      <div className="flex min-w-0 items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="type-h3">
            <Link
              to={`/courses/${course.slug}`}
              className="text-body hover:text-ink hover:underline"
            >
              {course.shortName}
            </Link>
          </h3>
          {course.name !== course.shortName && (
            <p className="type-small text-muted">{course.name}</p>
          )}
          <p className={cn('type-small font-medium text-muted', layout.levelInTitle)}>
            {LEVEL_LABEL[course.level]}
          </p>
        </div>
        {toggle && <div className={layout.inlineToggle}>{toggle}</div>}
      </div>
      <dl className={cn('mt-2 flex flex-wrap gap-x-5 gap-y-1', layout.facts)}>
        {FACT_LABELS.map((label, index) => (
          <div
            key={label}
            className={cn(
              'flex min-w-0 items-baseline gap-2',
              label === 'Level' && layout.levelFact,
            )}
          >
            <dt className={cn('type-meta', layout.factLabel)}>{label}</dt>
            <dd className="font-medium tabular-nums">{values[index]}</dd>
          </div>
        ))}
      </dl>
      {toggle && <div className={cn('justify-self-end', layout.columnToggle)}>{toggle}</div>}
    </li>
  )
}
