import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/cn'

export interface Crumb {
  label: string
  /** Omit for the current page. */
  to?: string
}

/** Breadcrumb trail (PRD §17). The last crumb is the current page. */
export function Breadcrumbs({ items, onDark = false }: { items: Crumb[]; onDark?: boolean }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol
        className={cn(
          'type-small flex flex-wrap items-center',
          onDark ? 'text-on-ink-muted' : 'text-muted',
        )}
      >
        {items.map((item, index) => (
          // On phones the current page (already the H1 below) is screen-reader only.
          <li
            key={item.label}
            className={cn('flex min-w-0 items-center', !item.to && 'max-sm:sr-only')}
          >
            {index > 0 && (
              <ChevronRight
                aria-hidden="true"
                className="mx-1 size-4 shrink-0"
                strokeWidth={1.75}
              />
            )}
            {item.to ? (
              <Link
                to={item.to}
                className={cn(
                  'inline-flex min-h-11 items-center underline decoration-transparent hover:decoration-current',
                  onDark ? 'hover:text-white' : 'hover:text-body',
                )}
              >
                {item.label}
              </Link>
            ) : (
              <span
                aria-current="page"
                className={cn(
                  'min-w-0 [overflow-wrap:anywhere]',
                  onDark ? 'text-white' : 'text-body',
                )}
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
