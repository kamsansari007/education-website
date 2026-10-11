import { useId, useState } from 'react'
import { cn } from '@/lib/cn'
import type { Facet, FacetOption, FilterSelection } from '@/types/listing'

const VISIBLE_OPTIONS = 6

interface FilterPanelProps {
  facets: Facet[]
  /** Selection shown as checked. In the mobile sheet this is the unapplied draft. */
  selection: FilterSelection
  /** Receives the facet's complete new selection. */
  onChange: (key: string, values: string[]) => void
}

/**
 * Facets as fieldsets. Multi-select facets are checkboxes (OR within the facet); the fee
 * facet is single-select radio bands. Facets combine with AND. Each option shows how many
 * results it would give; options that would give none are disabled.
 */
export function FilterPanel({ facets, selection, onChange }: FilterPanelProps) {
  return (
    <div className="divide-y divide-rule">
      {facets.map((facet) => {
        const selected = selection[facet.key] ?? []
        return facet.selection === 'single' ? (
          <SingleFacet
            key={facet.key}
            facet={facet}
            selected={selected[0] ?? ''}
            onSelect={(value) => onChange(facet.key, value ? [value] : [])}
          />
        ) : (
          <MultiFacet
            key={facet.key}
            facet={facet}
            selected={selected}
            onToggle={(value) =>
              onChange(
                facet.key,
                selected.includes(value)
                  ? selected.filter((v) => v !== value)
                  : [...selected, value],
              )
            }
          />
        )
      })}
    </div>
  )
}

function OptionRow({
  type,
  name,
  label,
  count,
  checked,
  onChange,
}: {
  type: 'checkbox' | 'radio'
  name?: string
  label: string
  count: number
  checked: boolean
  onChange: () => void
}) {
  const disabled = count === 0 && !checked
  return (
    <li>
      <label
        className={cn(
          'flex min-h-11 cursor-pointer items-center gap-3 py-1',
          disabled && 'cursor-not-allowed text-muted',
        )}
      >
        <input
          type={type}
          name={name}
          checked={checked}
          disabled={disabled}
          onChange={onChange}
          className="size-5 shrink-0 accent-ink"
        />
        <span className="min-w-0 flex-1 leading-snug">{label}</span>
        <span className="type-small text-muted tabular-nums">
          <span className="sr-only">, </span>
          {count}
          <span className="sr-only"> results</span>
        </span>
      </label>
    </li>
  )
}

function SingleFacet({
  facet,
  selected,
  onSelect,
}: {
  facet: Facet
  selected: string
  onSelect: (value: string) => void
}) {
  const name = useId()
  return (
    <fieldset className="py-4 first:pt-0">
      <legend className="float-left mb-1 w-full font-semibold">{facet.label}</legend>
      <ul className="clear-left">
        <OptionRow
          type="radio"
          name={name}
          label="Any"
          count={facet.anyCount}
          checked={selected === ''}
          onChange={() => onSelect('')}
        />
        {facet.options.map((option) => (
          <OptionRow
            key={option.value}
            type="radio"
            name={name}
            label={option.label}
            count={option.count}
            checked={selected === option.value}
            onChange={() => onSelect(option.value)}
          />
        ))}
      </ul>
    </fieldset>
  )
}

function MultiFacet({
  facet,
  selected,
  onToggle,
}: {
  facet: Facet
  selected: string[]
  onToggle: (value: string) => void
}) {
  const [expanded, setExpanded] = useState(false)
  const listId = useId()
  const overflow = facet.options.length > VISIBLE_OPTIONS
  const visible = facet.options.filter(
    (option: FacetOption, index) =>
      expanded || index < VISIBLE_OPTIONS || selected.includes(option.value),
  )

  return (
    <fieldset className="py-4 first:pt-0">
      <legend className="float-left mb-1 w-full font-semibold">{facet.label}</legend>
      <ul id={listId} className="clear-left">
        {visible.map((option) => (
          <OptionRow
            key={option.value}
            type="checkbox"
            label={option.label}
            count={option.count}
            checked={selected.includes(option.value)}
            onChange={() => onToggle(option.value)}
          />
        ))}
      </ul>
      {overflow && (
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={listId}
          onClick={() => setExpanded((value) => !value)}
          className="mt-1 inline-flex min-h-11 items-center font-semibold text-ink underline decoration-transparent hover:decoration-current"
        >
          {expanded ? 'Show fewer' : `Show all ${facet.options.length}`}
          <span className="sr-only"> {facet.label.toLowerCase()} options</span>
        </button>
      )}
    </fieldset>
  )
}
