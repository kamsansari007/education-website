import { X } from 'lucide-react'
import type { Facet } from '@/types/listing'

interface AppliedFiltersProps {
  facets: Facet[]
  q: string
  onRemove: (key: string, value: string) => void
  onClearQuery: () => void
  onClearAll: () => void
}

/** Removable chips for the active query and filters. Wraps rather than clipping. */
export function AppliedFilters({
  facets,
  q,
  onRemove,
  onClearQuery,
  onClearAll,
}: AppliedFiltersProps) {
  const chips = facets.flatMap((facet) =>
    facet.options
      .filter((option) => option.selected)
      .map((option) => ({
        key: facet.key,
        value: option.value,
        label: option.label,
        facet: facet.label,
      })),
  )
  if (chips.length === 0 && !q) return null

  const chipClass =
    'inline-flex min-h-11 items-center gap-2 rounded-control border border-rule-strong bg-surface pr-2 pl-3 text-sm font-medium hover:border-ink hover:text-ink'

  return (
    <div className="flex flex-wrap items-center gap-2">
      <h2 className="sr-only">Applied filters</h2>
      {q && (
        <button type="button" onClick={onClearQuery} className={chipClass}>
          “{q}”
          <X aria-hidden="true" className="size-4" strokeWidth={2} />
          <span className="sr-only">, remove search term</span>
        </button>
      )}
      {chips.map((chip) => (
        <button
          key={`${chip.key}:${chip.value}`}
          type="button"
          onClick={() => onRemove(chip.key, chip.value)}
          className={chipClass}
        >
          {chip.label}
          <X aria-hidden="true" className="size-4" strokeWidth={2} />
          <span className="sr-only">, remove {chip.facet.toLowerCase()} filter</span>
        </button>
      ))}
      <button
        type="button"
        onClick={onClearAll}
        className="inline-flex min-h-11 items-center px-2 text-sm font-semibold text-ink underline"
      >
        Clear all
      </button>
    </div>
  )
}
