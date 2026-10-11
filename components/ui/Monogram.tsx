import { cn } from '@/lib/cn'
import { monogram } from '@/lib/format'

const SIZE = {
  sm: 'size-12 text-lg',
  md: 'size-14 text-xl',
  lg: 'size-18 text-2xl',
  /** 48px on small screens, 56px from 768px. */
  responsive: 'size-12 text-lg md:size-14 md:text-xl',
} as const

/**
 * Initials tile that stands in for an institution logo. Decorative: the name is always
 * shown next to it.
 */
export function Monogram({ name, size = 'sm' }: { name: string; size?: keyof typeof SIZE }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'grid shrink-0 place-items-center rounded-tile bg-ink-50 font-semibold text-ink [font-stretch:87.5%]',
        SIZE[size],
      )}
    >
      {monogram(name)}
    </span>
  )
}
