import { useId } from 'react'
import type { SortOption } from '@/types/listing'

export function SortSelect({
  options,
  value,
  onChange,
}: {
  options: SortOption[]
  value: string
  onChange: (value: string) => void
}) {
  const id = useId()
  return (
    <div className="flex min-w-0 items-center gap-2">
      <label htmlFor={id} className="type-meta whitespace-nowrap max-sm:sr-only">
        Sort by
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 max-w-full min-w-0 rounded-control border border-rule-strong bg-surface pr-8 pl-3 text-base"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
