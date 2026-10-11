import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/cn'

/** Page numbers to show: first, last, current ±1, with gaps marked as null. */
function pageItems(page: number, pageCount: number): (number | null)[] {
  const wanted = new Set(
    [1, pageCount, page - 1, page, page + 1].filter((n) => n >= 1 && n <= pageCount),
  )
  const sorted = [...wanted].sort((a, b) => a - b)
  const items: (number | null)[] = []
  sorted.forEach((n, index) => {
    const previous = sorted[index - 1]
    if (previous !== undefined && n - previous > 1) items.push(null)
    items.push(n)
  })
  return items
}

interface PaginationProps {
  page: number
  pageCount: number
  pageSearch: (page: number) => string
  onNavigate: () => void
}

/** Numbered pagination as real links, so pages can be opened, shared and bookmarked. */
export function Pagination({ page, pageCount, pageSearch, onNavigate }: PaginationProps) {
  if (pageCount <= 1) return null
  const linkClass =
    'inline-flex min-h-11 min-w-11 items-center justify-center rounded-control px-3 font-semibold tabular-nums'

  const step = (target: number, label: string, icon: 'prev' | 'next') => {
    const disabled = target < 1 || target > pageCount
    const content = (
      <>
        {icon === 'prev' && <ChevronLeft aria-hidden="true" className="size-4" strokeWidth={2} />}
        {label}
        {icon === 'next' && <ChevronRight aria-hidden="true" className="size-4" strokeWidth={2} />}
      </>
    )
    return disabled ? (
      <span aria-disabled="true" className={cn(linkClass, 'gap-1 text-muted')}>
        {content}
      </span>
    ) : (
      <Link
        to={{ search: pageSearch(target) }}
        preventScrollReset
        onClick={onNavigate}
        className={cn(linkClass, 'gap-1 text-ink hover:bg-ink-50')}
      >
        {content}
      </Link>
    )
  }

  return (
    <nav aria-label="Pagination" className="mt-8">
      <ul className="flex flex-wrap items-center gap-1">
        <li>{step(page - 1, 'Previous', 'prev')}</li>
        {pageItems(page, pageCount).map((n, index) => (
          <li key={n ?? `gap-${index}`}>
            {n === null ? (
              <span className="px-2 text-muted">…</span>
            ) : n === page ? (
              <span aria-current="page" className={cn(linkClass, 'bg-ink text-white')}>
                <span className="sr-only">Page </span>
                {n}
              </span>
            ) : (
              <Link
                to={{ search: pageSearch(n) }}
                preventScrollReset
                onClick={onNavigate}
                className={cn(linkClass, 'text-ink hover:bg-ink-50')}
              >
                <span className="sr-only">Page </span>
                {n}
              </Link>
            )}
          </li>
        ))}
        <li>{step(page + 1, 'Next', 'next')}</li>
      </ul>
    </nav>
  )
}
