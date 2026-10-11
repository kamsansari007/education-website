import { useEffect, useRef, type ReactNode } from 'react'
import { PageContainer } from '@/components/layout/PageContainer'
import { useHideOnScroll } from '@/components/layout/useHideOnScroll'
import { LoadError, LoadingStatus } from '@/components/ui/QueryStates'
import { SampleDataLabel } from '@/components/ui/SampleDataLabel'
import { TYPE_NOUN } from '@/features/compare/compareContext'
import { SearchField } from '@/features/search/SearchField'
import { cn } from '@/lib/cn'
import { usePageMeta } from '@/lib/usePageMeta'
import { useServiceQuery } from '@/lib/useServiceQuery'
import type { ListingType, ListQuery, ListResult } from '@/types/listing'
import { AppliedFilters } from './AppliedFilters'
import { FilterPanel } from './FilterPanel'
import { FilterSheet } from './FilterSheet'
import { ListingEmpty } from './ListingEmpty'
import { Pagination } from './Pagination'
import { SortSelect } from './SortSelect'
import { useListingParams } from './useListingParams'

export interface ListingPageProps<T> {
  type: ListingType
  title: string
  description: string
  metaDescription: string
  searchPlaceholder: string
  /** Must be a stable (module-level) array. */
  facetKeys: string[]
  load: (query: ListQuery) => Promise<ListResult<T>>
  /** Entity-specific list markup: each entity keeps its own row design. */
  renderResults: (items: T[]) => ReactNode
  skeleton: ReactNode
}

/**
 * Shared frame for the three discovery listings: search, filter rail / sheet, applied
 * filters, sort, results, pagination. All state comes from the URL.
 */
export function ListingPage<T>({
  type,
  title,
  description,
  metaDescription,
  searchPlaceholder,
  facetKeys,
  load,
  renderResults,
  skeleton,
}: ListingPageProps<T>) {
  usePageMeta({ title, description: metaDescription })
  const noun = TYPE_NOUN[type]
  const params = useListingParams(facetKeys)
  const query = useServiceQuery(`${type}${params.key}`, () =>
    load({ q: params.q, filters: params.filters, sort: params.sort, page: params.page }),
  )
  const data =
    query.status === 'success'
      ? query.data
      : query.status === 'loading'
        ? query.previous
        : undefined

  const resultsRef = useRef<HTMLDivElement>(null)
  const pagedByUser = useRef(false)
  useEffect(() => {
    // After a pagination click, bring the results into view and move focus there.
    if (!pagedByUser.current) return
    pagedByUser.current = false
    resultsRef.current?.scrollIntoView({ block: 'start' })
    resultsRef.current?.focus({ preventScroll: true })
  }, [params.page])

  const headerHidden = useHideOnScroll()

  const summary = data
    ? data.total === 0
      ? `No ${noun.many} found`
      : `${data.total} ${data.total === 1 ? noun.one : noun.many}${
          data.pageCount > 1 ? `, page ${data.page} of ${data.pageCount}` : ''
        }`
    : ''

  return (
    <>
      {/* Title band continues the night header (Evaluate pages stay calm below it). */}
      <div className="on-ink bg-ink-900 text-white">
        <PageContainer className="pt-8 pb-10 lg:pt-12 lg:pb-12">
          <div className="max-w-measure">
            <h1 className="type-h1">{title}</h1>
            <p className="mt-2 text-on-ink-muted">{description}</p>
            <div className="mt-1 -ml-2">
              <SampleDataLabel onDark />
            </div>
          </div>
          <div className="mt-6 max-w-xl">
            <SearchField
              key={params.q}
              inputId={`${type}-search`}
              hiddenLabel={`Search ${noun.many}`}
              placeholder={searchPlaceholder}
              defaultValue={params.q}
              onSubmitQuery={params.setQuery}
            />
          </div>
        </PageContainer>
      </div>
      <PageContainer className="pt-8 pb-16 lg:pt-10 lg:pb-20">
        <p role="status" className="sr-only">
          {summary}
        </p>
        <div className="lg:grid lg:grid-cols-[16.5rem_minmax(0,1fr)] lg:gap-10 xl:gap-14">
          <aside aria-labelledby="filters-title" className="hidden lg:block">
            <div className="mb-3 flex min-h-11 items-center justify-between">
              <h2 id="filters-title" className="type-h3">
                Filters
              </h2>
              {params.activeFilterCount > 0 && (
                <button
                  type="button"
                  onClick={() => params.setFilters({})}
                  className="inline-flex min-h-11 items-center text-sm font-semibold text-ink underline"
                >
                  Clear filters
                </button>
              )}
            </div>
            {data && (
              <FilterPanel
                facets={data.facets}
                selection={params.filters}
                onChange={params.setFacet}
              />
            )}
          </aside>

          <div>
            <div
              className={cn(
                'sticky z-10 -mx-4 flex items-center justify-between gap-3 border-b border-rule bg-paper px-4 py-2 transition-[top] duration-200 sm:-mx-6 sm:px-6',
                'lg:static lg:mx-0 lg:border-0 lg:bg-transparent lg:px-0 lg:py-0',
                headerHidden ? 'top-0' : 'top-16',
              )}
            >
              <div className="lg:hidden">
                <FilterSheet
                  listingKey={type}
                  q={params.q}
                  applied={params.filters}
                  activeCount={params.activeFilterCount}
                  load={load}
                  onApply={params.setFilters}
                />
              </div>
              <p aria-hidden="true" className="font-semibold max-lg:hidden">
                {summary}
              </p>
              {data && (
                <SortSelect
                  options={data.sortOptions}
                  value={data.sort}
                  onChange={params.setSort}
                />
              )}
            </div>

            <div
              ref={resultsRef}
              tabIndex={-1}
              className="scroll-mt-32 focus:outline-none lg:scroll-mt-24"
            >
              <p className="mt-4 font-semibold lg:hidden" aria-hidden="true">
                {summary}
              </p>
              {data && (
                <div className="mt-4 lg:mt-5">
                  <AppliedFilters
                    facets={data.facets}
                    q={params.q}
                    onRemove={params.toggleFilter}
                    onClearQuery={() => params.setQuery('')}
                    onClearAll={params.clearAll}
                  />
                </div>
              )}

              <h2 className="sr-only">Results</h2>
              <div aria-busy={query.status === 'loading'} className="mt-4">
                {query.status === 'error' && (
                  <LoadError message={`${title} couldn’t be loaded.`} onRetry={query.retry} />
                )}
                {query.status === 'loading' && !data && (
                  <>
                    <LoadingStatus label={`Loading ${noun.many}`} />
                    {skeleton}
                  </>
                )}
                {data &&
                  query.status !== 'error' &&
                  (data.items.length > 0 ? (
                    renderResults(data.items)
                  ) : (
                    <ListingEmpty
                      noun={noun.many}
                      q={params.q}
                      hasFilters={params.activeFilterCount > 0}
                      onClearAll={params.clearAll}
                    />
                  ))}
              </div>

              {data && (
                <Pagination
                  page={data.page}
                  pageCount={data.pageCount}
                  pageSearch={params.pageSearch}
                  onNavigate={() => {
                    pagedByUser.current = true
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </PageContainer>
    </>
  )
}
