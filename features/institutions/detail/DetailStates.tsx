import { PageContainer } from '@/components/layout/PageContainer'
import { ButtonLink } from '@/components/ui/Button'
import { LoadingStatus } from '@/components/ui/QueryStates'
import { SearchField } from '@/features/search/SearchField'

/** Placeholder shaped like the title band, facts and first section. */
export function DetailSkeleton({ label }: { label: string }) {
  return (
    <>
      <LoadingStatus label={label} />
      <div aria-hidden="true">
        <div className="bg-ink-900">
          <PageContainer className="pt-6 pb-8 lg:pb-10">
            <div className="h-5 w-48 rounded-control bg-white/10" />
            <div className="mt-6 flex gap-4">
              <div className="size-18 shrink-0 rounded-tile bg-white/10" />
              <div className="flex-1 space-y-3">
                <div className="h-8 w-2/3 max-w-md rounded-control bg-white/10" />
                <div className="h-5 w-1/2 max-w-xs rounded-control bg-white/10" />
              </div>
            </div>
          </PageContainer>
        </div>
        <PageContainer className="py-8">
          <div className="grid max-w-3xl animate-pulse grid-cols-2 gap-4 sm:grid-cols-4">
            {Array.from({ length: 4 }, (_, index) => (
              <div key={index} className="h-14 rounded-control bg-ink-50" />
            ))}
          </div>
          <div className="mt-10 h-40 max-w-3xl animate-pulse rounded-control bg-ink-50" />
        </PageContainer>
      </div>
    </>
  )
}

/** Unknown slug: say so plainly and offer a way on (search, or the listing). */
export function DetailNotFound({
  noun,
  listing,
}: {
  noun: 'university' | 'college'
  listing: { to: string; label: string }
}) {
  return (
    <PageContainer className="py-16 lg:py-24">
      <div className="max-w-measure">
        <p className="type-meta">Not found</p>
        <h1 className="type-h1 mt-2">We couldn’t find that {noun}</h1>
        <p className="mt-4 text-lg text-muted">
          The link may be mistyped or out of date. Search for it by name, or browse the full list.
        </p>
        <div className="mt-6">
          <SearchField
            inputId="detail-not-found-search"
            hiddenLabel={`Search for a ${noun}`}
            size="lg"
          />
        </div>
        <ButtonLink to={listing.to} variant="secondary" className="mt-6">
          {listing.label}
        </ButtonLink>
      </div>
    </PageContainer>
  )
}
