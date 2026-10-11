/**
 * Moves focus to the main H1 (or <main> as a fallback). Retries for a few frames because
 * lazy routes may render slightly after navigation.
 * Returns a cancel function.
 */
export function focusPageHeading(): () => void {
  let attempts = 0
  let frame = 0
  const tryFocus = () => {
    const heading = document.querySelector<HTMLElement>('main h1')
    if (heading) {
      heading.setAttribute('tabindex', '-1')
      heading.focus({ preventScroll: true })
      return
    }
    if (++attempts < 20) frame = requestAnimationFrame(tryFocus)
    else document.querySelector<HTMLElement>('main')?.focus({ preventScroll: true })
  }
  frame = requestAnimationFrame(tryFocus)
  return () => cancelAnimationFrame(frame)
}
