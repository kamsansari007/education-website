import { Search } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { cn } from '@/lib/cn'
import { searchPath } from '@/lib/searchPath'

interface SearchFieldProps {
  inputId: string
  /**
   * Visually hidden label. Omit when the caller renders its own visible
   * <label htmlFor={inputId}> (e.g. the homepage H1).
   */
  hiddenLabel?: string
  /** md: header. lg: overlay and pages. hero: the homepage's primary search. */
  size?: 'hero' | 'lg' | 'md'
  placeholder?: string
  autoFocus?: boolean
  /** Called after navigation, e.g. to close the mobile search overlay. */
  onSearch?: () => void
  defaultValue?: string
  /**
   * Handle the query locally instead of going to /search (listing pages).
   * Receives the trimmed query, which may be empty to clear the search.
   */
  onSubmitQuery?: (query: string) => void
  submitLabel?: string
}

/**
 * Search input that submits to /search?q=.
 * Structured for the typeahead milestone: the input becomes an ARIA combobox and a
 * grouped listbox renders below it. Not built yet (Milestone 1 scope).
 */
export function SearchField({
  inputId,
  hiddenLabel,
  size = 'md',
  placeholder = 'Course, university or college',
  autoFocus,
  onSearch,
  defaultValue = '',
  onSubmitQuery,
  submitLabel = 'Search',
}: SearchFieldProps) {
  const navigate = useNavigate()
  const [query, setQuery] = useState(defaultValue)

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (onSubmitQuery) {
      onSubmitQuery(query.trim())
      return
    }
    if (!query.trim()) return
    navigate(searchPath(query))
    onSearch?.()
  }

  const large = size !== 'md'
  const hero = size === 'hero'

  return (
    <form
      role="search"
      onSubmit={onSubmit}
      className={cn(
        'relative flex w-full',
        // Hero: a white card on the night surface; the whole card shows focus.
        hero &&
          'gap-2 rounded-card bg-surface p-2 shadow-[0_18px_40px_-18px_rgb(0_0_0/0.55)] focus-within:outline-3 focus-within:outline-offset-4 focus-within:outline-highlight',
      )}
    >
      {hiddenLabel && (
        <label htmlFor={inputId} className="sr-only">
          {hiddenLabel}
        </label>
      )}
      <input
        id={inputId}
        type="search"
        name="q"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        enterKeyHint="search"
        autoFocus={autoFocus}
        className={cn(
          'w-full min-w-0 bg-surface text-body placeholder:text-muted',
          '[&::-webkit-search-cancel-button]:appearance-none',
          hero
            ? 'h-14 rounded-xl px-3 text-lg focus-visible:outline-none lg:h-16 lg:px-4 lg:text-xl'
            : cn(
                'rounded-l-control border border-r-0 border-rule-strong',
                large ? 'h-14 px-4 text-lg' : 'h-11 px-3 text-base',
              ),
        )}
      />
      <button
        type="submit"
        className={cn(
          'inline-flex shrink-0 items-center justify-center gap-2 bg-ink font-semibold text-white hover:bg-ink-700',
          hero
            ? 'h-14 rounded-xl px-4 sm:px-7 lg:h-16'
            : cn('rounded-r-control', large ? 'h-14 px-4 sm:px-6' : 'h-11 w-11'),
        )}
      >
        <Search aria-hidden="true" className="size-5" strokeWidth={2} />
        <span className={large ? 'max-sm:sr-only' : 'sr-only'}>{submitLabel}</span>
      </button>
    </form>
  )
}
