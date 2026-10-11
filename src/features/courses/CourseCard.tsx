import { Link } from 'react-router-dom'
import { cn } from '@/lib/cn'
import { formatFeeRange, formatYears, pluralise } from '@/lib/format'
import { LEVEL_LABEL, listModes } from '@/lib/labels'
import { streamColor } from '@/lib/streamLines'
import type { CourseSummary } from '@/types/dto'

/**
 * Homepage (Invite) course teaser: a periwinkle paper note, one of the few elements that get
 * the full Margin Notes treatment. The stream dot is always next to the stream's name.
 * Listings use CourseLedger rows instead.
 */
export function CourseCard({ course, className }: { course: CourseSummary; className?: string }) {
  return (
    <article
      className={cn(
        'paper-note relative flex flex-col bg-paper-peri p-6 transition-[translate,box-shadow] duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_var(--color-body)] has-[a:focus-visible]:outline-3 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-ink',
        className,
      )}
    >
      <p className="type-meta flex flex-wrap items-center gap-x-3">
        <span className="inline-flex items-center gap-1.5">
          <span
            aria-hidden="true"
            className="size-3 rounded-full border-[3px] bg-surface"
            style={{ borderColor: streamColor(course.streamSlug) }}
          />
          {course.streamName}
        </span>
        <span>{LEVEL_LABEL[course.level]}</span>
        <span>{formatYears(course.typicalDurationYears)}</span>
      </p>
      <h3 className="mt-2 text-3xl leading-none font-bold tracking-tight [font-stretch:112.5%]">
        <Link
          to={`/courses/${course.slug}`}
          className='after:absolute after:inset-0 after:content-[""] focus-visible:outline-none'
        >
          {course.shortName}
        </Link>
      </h3>
      {course.name !== course.shortName && (
        <p className="type-small mt-1 text-muted">{course.name}</p>
      )}
      <dl className="mt-auto grid grid-cols-3 gap-3 rounded-lg bg-surface/75 p-3">
        <div className="min-w-0">
          <dt className="type-meta">Modes</dt>
          <dd className="type-small font-semibold">{listModes(course.modes) || 'Not available'}</dd>
        </div>
        <div className="min-w-0">
          <dt className="type-meta">Total fees</dt>
          <dd className="type-small font-semibold tabular-nums">
            {course.totalFeeRange ? formatFeeRange(course.totalFeeRange) : 'Not available'}
          </dd>
        </div>
        <div className="min-w-0">
          <dt className="type-meta">Offered at</dt>
          <dd className="type-small font-semibold">
            {pluralise(course.institutionCount, 'place')}
          </dd>
        </div>
      </dl>
    </article>
  )
}
