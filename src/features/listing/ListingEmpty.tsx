import { Button } from '@/components/ui/Button'
import { GuidanceButton } from '@/features/enquiry/GuidanceButton'

/** No results: say why, then offer a way out (DESIGN-DIRECTION.md §9). */
export function ListingEmpty({
  noun,
  q,
  hasFilters,
  onClearAll,
}: {
  noun: string
  q: string
  hasFilters: boolean
  onClearAll: () => void
}) {
  const reason =
    q && hasFilters
      ? `No ${noun} match “${q}” with these filters.`
      : q
        ? `No ${noun} match “${q}”.`
        : `No ${noun} match these filters.`

  return (
    <div className="border-y border-rule py-10">
      <h3 className="type-h3">{reason}</h3>
      <p className="mt-2 max-w-measure text-muted">
        {hasFilters
          ? 'Try removing a filter or two. Fee and location filters usually narrow results the most.'
          : 'Check the spelling, or try a broader term such as a course name or a city.'}
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
        <Button variant="secondary" onClick={onClearAll}>
          {hasFilters ? 'Clear all filters' : 'Clear search'}
        </Button>
        <GuidanceButton
          variant="tertiary"
          className="underline"
          context={{ interest: q || undefined, source: { type: 'search' } }}
        >
          Tell us what you’re looking for
        </GuidanceButton>
      </div>
    </div>
  )
}
