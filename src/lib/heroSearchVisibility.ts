import { useSyncExternalStore } from 'react'

/**
 * Whether the homepage hero search is on screen. While it is, the header hides its own
 * search field so the first viewport has one search, not two.
 */
let visible = false
const listeners = new Set<() => void>()

export function setHeroSearchVisible(next: boolean) {
  if (next === visible) return
  visible = next
  listeners.forEach((listener) => listener())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function useHeroSearchVisible(): boolean {
  return useSyncExternalStore(subscribe, () => visible)
}
