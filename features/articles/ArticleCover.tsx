import { ClipboardList, Compass, Laptop, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/cn'

const CATEGORY_GLYPH: Record<string, LucideIcon> = {
  'choosing-a-course': Compass,
  admissions: ClipboardList,
  'online-learning': Laptop,
}

/**
 * Illustrated editorial cover (DESIGN-DIRECTION.md §14): coral paper (people and reading) with
 * the category's line glyph. Only the featured cover gets the paper-note outline, tape and a
 * slight tilt. Decorative: the card carries the text.
 */
export function ArticleCover({
  categorySlug,
  featured = false,
  className,
}: {
  categorySlug: string
  featured?: boolean
  className?: string
}) {
  const Glyph = CATEGORY_GLYPH[categorySlug] ?? Compass
  return (
    <div
      aria-hidden="true"
      className={cn(
        'relative grid place-items-center bg-paper-coral',
        featured ? 'paper-note aspect-[16/9] -rotate-1' : 'aspect-[16/8] rounded-2xl',
        className,
      )}
    >
      {featured && <span className="tape -top-3 left-1/2 -translate-x-1/2 rotate-2" />}
      <Glyph className={featured ? 'size-20 text-body' : 'size-10 text-body'} strokeWidth={1.5} />
    </div>
  )
}
