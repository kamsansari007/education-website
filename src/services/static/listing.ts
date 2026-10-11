import type { Facet, FilterSelection, ListQuery, ListResult } from '@/types/listing'
import { PAGE_SIZE } from '@/types/listing'
import { score, tokenise, type SearchableText } from './textSearch'

/** A listable record with everything needed to search, filter and sort it. */
export interface ListingDoc<T> {
  item: T
  text: SearchableText
  /** Facet key → values this record has (a record can have several, e.g. modes). */
  facetValues: Record<string, string[]>
  sortKeys: Record<string, string | number | null>
}

export interface FacetDefinition {
  key: string
  label: string
  /** Defaults to "multiple". Single-select facets keep at most one value. */
  selection?: 'single' | 'multiple'
  /** Ordered options. Options with no matching records are still listed (count 0). */
  options: { value: string; label: string }[]
}

export interface SortDefinition {
  value: string
  label: string
  /** Key into ListingDoc.sortKeys, or "relevance". */
  by: string
  direction: 'asc' | 'desc'
}

function matchesFacets<T>(
  doc: ListingDoc<T>,
  selection: FilterSelection,
  facets: FacetDefinition[],
  ignoreKey?: string,
): boolean {
  // OR within a facet, AND across facets.
  return facets.every((facet) => {
    if (facet.key === ignoreKey) return true
    const selected = selection[facet.key] ?? []
    if (selected.length === 0) return true
    const values = doc.facetValues[facet.key] ?? []
    return selected.some((value) => values.includes(value))
  })
}

/** Drops unknown facet keys and values so the URL can't produce impossible states. */
function sanitise(
  selection: FilterSelection | undefined,
  facets: FacetDefinition[],
): FilterSelection {
  const clean: FilterSelection = {}
  for (const facet of facets) {
    const allowed = new Set(facet.options.map((option) => option.value))
    const values = [
      ...new Set((selection?.[facet.key] ?? []).filter((value) => allowed.has(value))),
    ]
    const kept = facet.selection === 'single' ? values.slice(0, 1) : values
    if (kept.length > 0) clean[facet.key] = kept
  }
  return clean
}

function compare(a: string | number | null, b: string | number | null): number {
  // Missing values always sort last.
  if (a === null && b === null) return 0
  if (a === null) return 1
  if (b === null) return -1
  if (typeof a === 'number' && typeof b === 'number') return a - b
  return String(a).localeCompare(String(b), 'en-IN')
}

export function runListing<T>(
  docs: ListingDoc<T>[],
  facets: FacetDefinition[],
  sorts: SortDefinition[],
  query: ListQuery,
): ListResult<T> {
  const tokens = tokenise(query.q ?? '')
  const selection = sanitise(query.filters, facets)

  const searched = docs
    .map((doc, index) => ({ doc, index, relevance: score(tokens, doc.text) }))
    .filter((entry) => entry.relevance > 0)

  const matching = searched.filter((entry) => matchesFacets(entry.doc, selection, facets))

  const sortDefinition = sorts.find((sort) => sort.value === query.sort) ?? sorts[0]
  const sorted = [...matching].sort((a, b) => {
    if (!sortDefinition || sortDefinition.by === 'relevance') {
      return b.relevance - a.relevance || a.index - b.index
    }
    const result = compare(
      a.doc.sortKeys[sortDefinition.by] ?? null,
      b.doc.sortKeys[sortDefinition.by] ?? null,
    )
    const directed = sortDefinition.direction === 'desc' ? -result : result
    return directed || a.index - b.index
  })

  const pageSize = query.pageSize ?? PAGE_SIZE
  const pageCount = Math.max(1, Math.ceil(sorted.length / pageSize))
  const page = Math.min(Math.max(1, Math.floor(query.page ?? 1)), pageCount)

  const facetResults: Facet[] = facets.map((facet) => {
    // Counts for a facet ignore its own selection so sibling options stay meaningful.
    const base = searched.filter((entry) => matchesFacets(entry.doc, selection, facets, facet.key))
    const selected = selection[facet.key] ?? []
    return {
      key: facet.key,
      label: facet.label,
      selection: facet.selection ?? 'multiple',
      anyCount: base.length,
      options: facet.options.map((option) => ({
        ...option,
        count: base.filter((entry) =>
          (entry.doc.facetValues[facet.key] ?? []).includes(option.value),
        ).length,
        selected: selected.includes(option.value),
      })),
    }
  })

  return {
    items: sorted.slice((page - 1) * pageSize, page * pageSize).map((entry) => entry.doc.item),
    total: sorted.length,
    page,
    pageSize,
    pageCount,
    facets: facetResults,
    sort: sortDefinition?.value ?? 'relevance',
    sortOptions: sorts.map(({ value, label }) => ({ value, label })),
  }
}
