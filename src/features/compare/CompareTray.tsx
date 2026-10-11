import { ChevronDown, ChevronUp, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { PageContainer } from '@/components/layout/PageContainer'
import { cn } from '@/lib/cn'
import { Button, ButtonLink } from '@/components/ui/Button'
import { SheetContent, SheetRoot } from '@/components/ui/Sheet'
import { COMPARE_LIMIT, TYPE_NOUN, compareHref, useCompare } from './compareContext'

/**
 * Persistent compare tray (DESIGN-DIRECTION.md §11).
 * ≥768px: docked bar with three slots, collapsible. <768px: one compact bar that opens a
 * bottom sheet. A spacer and scroll padding keep page content and focus clear of it.
 * The measured height is published as --compare-tray-height so a detail page's action bar
 * can sit directly above the docked tray. Below 768px, when that action bar is present,
 * the tray hides and the action bar's Compare button opens this tray's sheet instead.
 */
export function CompareTray() {
  const compare = useCompare()
  const [collapsed, setCollapsed] = useState(false)
  const [height, setHeight] = useState(0)
  const regionRef = useRef<HTMLElement>(null)
  const visible = compare.items.length > 0 && compare.type !== null
  const { sheetOpen, setSheetOpen } = compare

  // An emptied selection closes the sheet, so it doesn't reopen with the next selection.
  useEffect(() => {
    if (!visible) setSheetOpen(false)
  }, [visible, setSheetOpen])

  useEffect(() => {
    const root = document.documentElement.style
    const element = regionRef.current
    if (!visible || !element) {
      root.removeProperty('--compare-tray-height')
      return
    }
    const observer = new ResizeObserver(([entry]) => {
      const measured = Math.ceil(entry?.borderBoxSize[0]?.blockSize ?? element.offsetHeight)
      setHeight(measured)
      root.setProperty('--compare-tray-height', `${measured}px`)
    })
    observer.observe(element)
    return () => {
      observer.disconnect()
      root.removeProperty('--compare-tray-height')
    }
  }, [visible])

  if (!visible || !compare.type) return null

  const noun = TYPE_NOUN[compare.type]
  const count = compare.items.length
  const canCompare = count >= 2
  const emptySlots = COMPARE_LIMIT - count
  const href = compareHref(compare)

  const removeItem = (slug: string) => {
    compare.remove(slug)
    regionRef.current?.focus()
  }

  const slots = (
    <>
      {compare.items.map((item) => (
        <li
          key={item.slug}
          className="flex min-h-11 min-w-0 flex-1 items-center justify-between gap-1 rounded-control border border-rule bg-paper pl-3"
        >
          <span className="truncate font-medium" title={item.name}>
            {item.name}
          </span>
          <button
            type="button"
            onClick={() => removeItem(item.slug)}
            className="grid size-11 shrink-0 place-items-center rounded-control text-muted hover:bg-ink-50 hover:text-body"
          >
            <X aria-hidden="true" className="size-4" strokeWidth={2} />
            <span className="sr-only">Remove {item.name} from comparison</span>
          </button>
        </li>
      ))}
      {Array.from({ length: emptySlots }, (_, index) => (
        <li
          key={`empty-${index}`}
          className="type-small flex min-h-11 min-w-0 flex-1 items-center rounded-control border border-dashed border-rule-strong px-3 text-muted"
        >
          Add another {noun.one}
        </li>
      ))}
    </>
  )

  const action = (fullWidth?: boolean) =>
    canCompare ? (
      <ButtonLink to={href} size="sm" fullWidth={fullWidth}>
        Compare {count} {noun.many}
      </ButtonLink>
    ) : (
      <div className={fullWidth ? 'space-y-1 text-center' : 'flex items-center gap-3'}>
        <Button size="sm" disabled fullWidth={fullWidth} aria-describedby="compare-need-more">
          Compare
        </Button>
        <span id="compare-need-more" className="type-small text-muted">
          Add at least 2 to compare
        </span>
      </div>
    )

  return (
    <>
      <div aria-hidden="true" style={{ height }} />
      <section
        ref={regionRef}
        tabIndex={-1}
        aria-labelledby="compare-tray-title"
        className={cn(
          'fixed inset-x-0 bottom-0 z-30 border-t border-rule bg-surface pb-[env(safe-area-inset-bottom)] shadow-raised focus:outline-none',
          compare.actionBarActive && 'max-md:hidden',
        )}
      >
        <h2 id="compare-tray-title" className="sr-only">
          Comparison: {count} of {COMPARE_LIMIT} {noun.many} selected
        </h2>

        {/* <768px */}
        <PageContainer className="flex min-h-16 items-center justify-between gap-3 py-2 md:hidden">
          <button
            type="button"
            onClick={() => setSheetOpen(true)}
            aria-haspopup="dialog"
            className="inline-flex min-h-11 items-center gap-2 rounded-control px-1 font-semibold text-body"
          >
            <ChevronUp aria-hidden="true" className="size-5" strokeWidth={2} />
            {count} {count === 1 ? noun.one : noun.many} selected
          </button>
          {canCompare ? (
            <ButtonLink to={href} size="sm">
              Compare
            </ButtonLink>
          ) : (
            <span className="type-small text-muted">Add 1 more to compare</span>
          )}
        </PageContainer>

        {/* ≥768px */}
        <PageContainer className="hidden items-center gap-6 py-3 md:flex">
          <div className="shrink-0">
            <p className="font-semibold">Compare {noun.many}</p>
            <p className="type-meta">
              {count} of {COMPARE_LIMIT} selected
            </p>
          </div>
          {collapsed ? (
            <div className="flex-1" />
          ) : (
            <ul aria-label={`Selected ${noun.many}`} className="flex min-w-0 flex-1 gap-3">
              {slots}
            </ul>
          )}
          <div className="flex shrink-0 items-center gap-2">
            <Button variant="tertiary" size="sm" onClick={compare.clear}>
              Clear
            </Button>
            <button
              type="button"
              aria-expanded={!collapsed}
              onClick={() => setCollapsed((value) => !value)}
              className="grid size-11 place-items-center rounded-control text-body hover:bg-ink-50"
            >
              {collapsed ? (
                <ChevronUp aria-hidden="true" className="size-5" strokeWidth={2} />
              ) : (
                <ChevronDown aria-hidden="true" className="size-5" strokeWidth={2} />
              )}
              <span className="sr-only">
                {collapsed ? 'Show' : 'Hide'} selected {noun.many}
              </span>
            </button>
            {action()}
          </div>
        </PageContainer>
      </section>

      <SheetRoot open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent title={`Compare ${noun.many}`} side="bottom" footer={action(true)}>
          <div className="space-y-4 p-4">
            <p className="type-meta">
              {count} of {COMPARE_LIMIT} selected
            </p>
            <ul aria-label={`Selected ${noun.many}`} className="flex flex-col gap-2">
              {slots}
            </ul>
            <Button variant="tertiary" size="sm" onClick={compare.clear}>
              Clear comparison
            </Button>
          </div>
        </SheetContent>
      </SheetRoot>
    </>
  )
}
