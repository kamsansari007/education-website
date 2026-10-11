import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { focusPageHeading } from '@/lib/focusPageHeading'

/**
 * After client-side navigation, move focus to the page's H1 so screen-reader and keyboard
 * users start at the new content (PRD §16). Skips the initial page load.
 */
export function useRouteFocus() {
  const { pathname } = useLocation()
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    return focusPageHeading()
  }, [pathname])
}
