import { createContext, useContext } from 'react'
import type { ListingType } from '@/types/listing'

export const COMPARE_LIMIT = 3

export interface CompareItem {
  slug: string
  name: string
}

export interface CompareSelection {
  type: ListingType | null
  items: CompareItem[]
}

export interface CompareContextValue extends CompareSelection {
  isSelected: (type: ListingType, slug: string) => boolean
  isFull: boolean
  toggle: (type: ListingType, item: CompareItem) => void
  remove: (slug: string) => void
  clear: () => void
  /** The tray's bottom sheet (<768px), also opened from the detail-page action bar. */
  sheetOpen: boolean
  setSheetOpen: (open: boolean) => void
  /**
   * True while a page's own bottom action bar is mounted. Below 768px that bar carries the
   * compare entry, so the tray hides its compact bar: one bottom bar at a time.
   */
  actionBarActive: boolean
  registerActionBar: () => () => void
}

export const CompareContext = createContext<CompareContextValue | null>(null)

export function useCompare(): CompareContextValue {
  const value = useContext(CompareContext)
  if (!value) throw new Error('useCompare must be used inside <CompareProvider>')
  return value
}

export const TYPE_NOUN: Record<ListingType, { one: string; many: string; route: string }> = {
  university: { one: 'university', many: 'universities', route: '/universities' },
  college: { one: 'college', many: 'colleges', route: '/colleges' },
  course: { one: 'course', many: 'courses', route: '/courses' },
}

export function compareHref(selection: CompareSelection): string {
  if (!selection.type) return '/compare'
  const items = selection.items.map((item) => item.slug).join(',')
  return `/compare?type=${selection.type}&items=${items}`
}
