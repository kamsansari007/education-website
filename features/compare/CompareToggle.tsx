import { Check } from 'lucide-react'
import { cn } from '@/lib/cn'
import type { ListingType } from '@/types/listing'
import { COMPARE_LIMIT, TYPE_NOUN, useCompare, type CompareItem } from './compareContext'

/**
 * Add/remove an item from the comparison. A utility toggle, not a CTA
 * (DESIGN-DIRECTION.md §10–11): outline when off, highlighter fill with "Added" when on.
 */
export function CompareToggle({
  type,
  item,
  className,
}: {
  type: ListingType
  item: CompareItem
  className?: string
}) {
  const compare = useCompare()
  const selected = compare.isSelected(type, item.slug)
  // Full, or holding another type: adding needs the tray or a confirmation, so look muted.
  const blocked = !selected && compare.isFull && compare.type === type

  return (
    <button
      type="button"
      aria-pressed={selected}
      aria-disabled={blocked || undefined}
      aria-label={selected ? `Added to compare: ${item.name}` : `Compare ${item.name}`}
      title={blocked ? `You can compare up to ${COMPARE_LIMIT} ${TYPE_NOUN[type].many}` : undefined}
      onClick={() => compare.toggle(type, item)}
      className={cn(
        'inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-control border-[1.5px] px-3 text-sm font-semibold transition-colors duration-150',
        selected && 'border-ink bg-highlight text-body',
        !selected && !blocked && 'border-ink bg-surface text-ink hover:bg-ink-50',
        blocked && 'cursor-not-allowed border-rule bg-surface text-muted',
        className,
      )}
    >
      {selected && <Check aria-hidden="true" className="size-4" strokeWidth={2.5} />}
      {selected ? 'Added' : 'Compare'}
    </button>
  )
}
