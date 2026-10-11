import { Info } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'

/**
 * Marks fact-heavy content as demo data (DESIGN-DIRECTION.md §17).
 * A disclosure button rather than a hover tooltip, so it works with touch and keyboard.
 */
export function SampleDataLabel({ onDark = false }: { onDark?: boolean }) {
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const rootRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!open) return
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <span ref={rootRef} className="relative inline-block align-middle">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className={`type-meta inline-flex min-h-11 items-center gap-1.5 rounded-control px-2 ${onDark ? 'text-on-ink-muted hover:text-white' : 'hover:text-body'}`}
      >
        <Info aria-hidden="true" className="size-4" strokeWidth={1.75} />
        Sample data
      </button>
      <span
        id={panelId}
        role="note"
        hidden={!open}
        className="type-small absolute top-full left-0 z-40 mt-1 w-64 rounded-layer bg-surface p-3 text-body shadow-overlay"
      >
        The institutions, fees and approvals shown here are fictional. They demonstrate how the
        product will present real, verified information.
      </span>
    </span>
  )
}
