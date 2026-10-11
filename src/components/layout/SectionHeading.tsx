import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/cn'

interface SectionHeadingProps {
  id: string
  title: string
  description?: ReactNode
  /** Small supporting element on its own line, e.g. the sample-data label. */
  meta?: ReactNode
  action?: { to: string; label: string }
  /** "section": Invite-register heading (homepage). "h2": Evaluate pages. */
  size?: 'h2' | 'section'
  /** Text colours for the deep-ink band. */
  onDark?: boolean
  className?: string
}

/** H2 with an optional lead, meta line and "see all" style link. */
export function SectionHeading({
  id,
  title,
  description,
  meta,
  action,
  size = 'h2',
  onDark = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'mb-6 flex flex-wrap items-end justify-between gap-x-8 gap-y-2 lg:mb-10',
        className,
      )}
    >
      <div className="max-w-measure min-w-0 [overflow-wrap:anywhere]">
        <h2 id={id} className={size === 'section' ? 'type-section' : 'type-h2'}>
          {title}
        </h2>
        {description && (
          <p
            className={cn(
              size === 'section' ? 'type-lead mt-3' : 'mt-2',
              onDark ? 'text-ink-100' : 'text-muted',
            )}
          >
            {description}
          </p>
        )}
        {meta && <div className="mt-1 -ml-2">{meta}</div>}
      </div>
      {action && (
        <Link
          to={action.to}
          className={cn(
            'inline-flex min-h-11 items-center font-semibold underline decoration-transparent hover:decoration-current',
            onDark ? 'text-white' : 'text-ink',
          )}
        >
          {action.label}
        </Link>
      )}
    </div>
  )
}
