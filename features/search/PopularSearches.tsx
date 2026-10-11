import { Link } from 'react-router-dom'
import { searchPath } from '@/lib/searchPath'

/** Suggested queries as links. Chips are reserved for search suggestions and applied filters. */
export function PopularSearches({
  queries,
  headingId,
  onSelect,
  tone = 'light',
}: {
  queries: string[]
  headingId: string
  onSelect?: () => void
  /** "dark" for the night hero surface. */
  tone?: 'light' | 'dark'
}) {
  const dark = tone === 'dark'
  if (queries.length === 0) return null
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
      <p id={headingId} className={dark ? 'type-meta text-on-ink-muted' : 'type-meta'}>
        Popular searches
      </p>
      <ul aria-labelledby={headingId} className="flex flex-wrap gap-2">
        {queries.map((query) => (
          <li key={query}>
            <Link
              to={searchPath(query)}
              onClick={onSelect}
              className={
                dark
                  ? 'inline-flex min-h-11 items-center rounded-full bg-white/10 px-4 font-medium text-white hover:bg-white/20'
                  : 'inline-flex min-h-11 items-center rounded-control border border-rule bg-surface px-3 font-medium text-body hover:border-ink hover:text-ink'
              }
            >
              {query}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
