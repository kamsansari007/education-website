/**
 * Listing contract shared by universities, colleges and courses.
 * Phase 2: the API accepts the same query and returns the same result shape, so a
 * MySQL-backed implementation can replace the static one without UI changes.
 */

export type ListingType = 'university' | 'college' | 'course'

/** Selected values per facet key, e.g. { mode: ['online', 'distance'] }. */
export type FilterSelection = Record<string, string[]>

export interface ListQuery {
  q?: string
  filters?: FilterSelection
  sort?: string
  /** 1-based. Out-of-range pages are clamped. */
  page?: number
  pageSize?: number
}

export interface FacetOption {
  value: string
  label: string
  /** Results if this option were added to the current selection. */
  count: number
  selected: boolean
}

export interface Facet {
  key: string
  label: string
  /**
   * "multiple": checkboxes, OR within the facet. "single": radio options (fee bands),
   * at most one value.
   */
  selection: 'single' | 'multiple'
  /** Results with no value selected in this facet ("Any" for single-select facets). */
  anyCount: number
  options: FacetOption[]
}

export interface ListResult<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  pageCount: number
  /** Facets with counts that reflect the current query and other selected facets. */
  facets: Facet[]
  /** The sort actually applied (unknown values fall back to the default). */
  sort: string
  sortOptions: SortOption[]
}

export interface SortOption {
  value: string
  label: string
}

export const PAGE_SIZE = 20
