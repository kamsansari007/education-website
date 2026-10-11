import { useCallback, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import type { FilterSelection } from '@/types/listing'

/** Keeps commas readable in the URL: ?mode=online,distance */
const encode = (value: string) => encodeURIComponent(value).replace(/%2C/gi, ',')

export interface ListingParams {
  q: string
  filters: FilterSelection
  sort: string
  page: number
  /** Stable string that identifies the current query (for data loading). */
  key: string
  activeFilterCount: number
  setQuery: (q: string) => void
  toggleFilter: (key: string, value: string) => void
  /** Replace one facet's selection (used by the filter panel). */
  setFacet: (key: string, values: string[]) => void
  setFilters: (filters: FilterSelection) => void
  clearAll: () => void
  setSort: (sort: string) => void
  /** Search string for a page link, e.g. "?mode=online&page=2". */
  pageSearch: (page: number) => string
}

/**
 * Listing state lives entirely in the URL (q, one param per facet, sort, page) so refresh,
 * sharing and Back/Forward all reproduce the same results. Every change pushes a history
 * entry; any change other than the page resets to page 1.
 */
export function useListingParams(facetKeys: string[], defaultSort = 'relevance'): ListingParams {
  const { search } = useLocation()
  const navigate = useNavigate()

  const state = useMemo(() => {
    const params = new URLSearchParams(search)
    const filters: FilterSelection = {}
    for (const key of facetKeys) {
      const values = (params.get(key) ?? '').split(',').filter(Boolean)
      if (values.length > 0) filters[key] = [...new Set(values)]
    }
    const page = Math.max(1, Number.parseInt(params.get('page') ?? '1', 10) || 1)
    return {
      q: params.get('q')?.trim() ?? '',
      filters,
      sort: params.get('sort') ?? defaultSort,
      page,
    }
  }, [search, facetKeys, defaultSort])

  const build = useCallback(
    (next: { q: string; filters: FilterSelection; sort: string; page: number }) => {
      const parts: string[] = []
      if (next.q) parts.push(`q=${encode(next.q)}`)
      for (const key of facetKeys) {
        const values = next.filters[key]
        if (values?.length) parts.push(`${key}=${values.map(encode).join(',')}`)
      }
      if (next.sort !== defaultSort) parts.push(`sort=${encode(next.sort)}`)
      if (next.page > 1) parts.push(`page=${next.page}`)
      return parts.length ? `?${parts.join('&')}` : ''
    },
    [facetKeys, defaultSort],
  )

  const go = useCallback(
    (next: Partial<typeof state>) => {
      navigate({ search: build({ ...state, page: 1, ...next }) }, { preventScrollReset: true })
    },
    [navigate, build, state],
  )

  return {
    ...state,
    key: build(state),
    activeFilterCount: Object.values(state.filters).reduce((sum, values) => sum + values.length, 0),
    setQuery: (q) => go({ q }),
    toggleFilter: (key, value) => {
      const current = state.filters[key] ?? []
      const values = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value]
      go({ filters: { ...state.filters, [key]: values } })
    },
    setFacet: (key, values) => go({ filters: { ...state.filters, [key]: values } }),
    setFilters: (filters) => go({ filters }),
    clearAll: () => go({ q: '', filters: {} }),
    setSort: (sort) => go({ sort }),
    pageSearch: (page) => build({ ...state, page }),
  }
}
