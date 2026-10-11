import { useEffect, useState } from 'react'

/**
 * True while the user scrolls down past `threshold`; false as soon as they scroll up.
 * Used for the auto-hiding mobile header.
 */
export function useHideOnScroll(threshold = 160): boolean {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    let lastY = window.scrollY
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const y = window.scrollY
        const delta = y - lastY
        if (Math.abs(delta) < 6) return
        setHidden(delta > 0 && y > threshold)
        lastY = y
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [threshold])

  return hidden
}
