import { useCallback, useRef, useState } from 'react'
import { focusPageHeading } from '@/lib/focusPageHeading'

/**
 * Open state for a sheet that closes when the user navigates from inside it.
 * After such a close, focus goes to the new page's H1 instead of back to the trigger.
 */
export function useNavigateAndClose() {
  const [open, setOpen] = useState(false)
  const navigated = useRef(false)

  const closeAfterNavigation = useCallback(() => {
    navigated.current = true
    setOpen(false)
  }, [])

  const onCloseAutoFocus = useCallback((event: Event) => {
    if (!navigated.current) return
    navigated.current = false
    event.preventDefault()
    focusPageHeading()
  }, [])

  return { open, setOpen, closeAfterNavigation, onCloseAutoFocus }
}
