import { MessageCircle } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { ExternalButtonLink } from '@/components/ui/Button'
import { useCompare } from '@/features/compare/compareContext'
import { GuidanceButton } from '@/features/enquiry/GuidanceButton'
import { whatsappHref } from '@/lib/site'
import type { EnquiryContext } from '@/types/dto'

/**
 * Desktop (≥1024px): sticky panel beside the content, so the enquiry is always reachable.
 * No promises about response times or cost (client to confirm).
 */
export function GuidancePanel({ name, context }: { name: string; context: EnquiryContext }) {
  return (
    <aside aria-labelledby="guidance-panel-title" className="sticky top-24 hidden lg:block">
      <div className="rounded-layer border border-rule bg-surface p-6 shadow-raised">
        <h2 id="guidance-panel-title" className="type-h3">
          Questions about {name}?
        </h2>
        <p className="mt-2 text-muted">
          Share what you’re considering, and a counsellor can talk through courses, fees and
          eligibility with you.
        </p>
        <GuidanceButton context={context} fullWidth className="mt-5" />
        <ExternalButtonLink
          href={whatsappHref(`Hello, I have a question about ${name}.`)}
          variant="tertiary"
          className="mt-3 w-full"
        >
          <MessageCircle aria-hidden="true" className="size-5" strokeWidth={1.75} />
          Chat on WhatsApp
        </ExternalButtonLink>
        <p className="type-caption mt-4 border-t border-rule pt-3">
          Demo: enquiries are not sent or stored.
        </p>
      </div>
    </aside>
  )
}

/**
 * Below 1024px: one bottom bar with the enquiry, WhatsApp and (below 768px, when something
 * is selected) the comparison. Sits directly above the docked compare tray at 768–1023px.
 * Its height is reserved as body padding (index.css), so the footer stays clear of it.
 */
export function DetailActionBar({ name, context }: { name: string; context: EnquiryContext }) {
  const compare = useCompare()
  const barRef = useRef<HTMLDivElement>(null)
  const { registerActionBar } = compare

  useEffect(() => registerActionBar(), [registerActionBar])

  useEffect(() => {
    const root = document.documentElement.style
    const element = barRef.current
    if (!element) return
    const observer = new ResizeObserver(([entry]) => {
      const measured = Math.ceil(entry?.borderBoxSize[0]?.blockSize ?? element.offsetHeight)
      root.setProperty('--action-bar-height', `${measured}px`)
    })
    observer.observe(element)
    return () => {
      observer.disconnect()
      root.removeProperty('--action-bar-height')
    }
  }, [])

  const count = compare.items.length

  return (
    <>
      <div
        ref={barRef}
        role="region"
        aria-label="Page actions"
        style={{ bottom: 'var(--compare-tray-height, 0px)' }}
        className="fixed inset-x-0 z-30 border-t border-rule bg-surface pb-[env(safe-area-inset-bottom)] shadow-raised lg:hidden"
      >
        <div className="mx-auto flex max-w-page items-center gap-2 px-4 py-2 sm:px-6">
          <GuidanceButton context={context} className="min-w-0 flex-1" />
          <a
            href={whatsappHref(`Hello, I have a question about ${name}.`)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp (opens in a new tab)"
            className="grid size-12 shrink-0 place-items-center rounded-control border-[1.5px] border-ink text-ink hover:bg-ink-50"
          >
            <MessageCircle aria-hidden="true" className="size-5 shrink-0" strokeWidth={1.75} />
          </a>
          {count > 0 && (
            <button
              type="button"
              aria-haspopup="dialog"
              onClick={() => compare.setSheetOpen(true)}
              className="inline-flex min-h-12 shrink-0 items-center rounded-control border-[1.5px] border-ink px-3 font-semibold text-ink hover:bg-ink-50 md:hidden"
            >
              Compare ({count})
            </button>
          )}
        </div>
      </div>
    </>
  )
}
