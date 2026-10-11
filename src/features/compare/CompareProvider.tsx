import * as Dialog from '@radix-ui/react-dialog'
import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { Button } from '@/components/ui/Button'
import type { ListingType } from '@/types/listing'
import {
  COMPARE_LIMIT,
  CompareContext,
  TYPE_NOUN,
  type CompareContextValue,
  type CompareItem,
  type CompareSelection,
} from './compareContext'

const STORAGE_KEY = 'compare-selection:v1'
const EMPTY: CompareSelection = { type: null, items: [] }
const TYPES: ListingType[] = ['university', 'college', 'course']
const ZERO_WIDTH_SPACE = String.fromCharCode(0x200b)

/** Reads the saved selection. Storage is a convenience: any failure falls back to empty. */
function readStored(): CompareSelection {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return EMPTY
    const parsed: unknown = JSON.parse(raw)
    if (typeof parsed !== 'object' || parsed === null) return EMPTY
    const { type, items } = parsed as { type?: unknown; items?: unknown }
    if (!TYPES.includes(type as ListingType) || !Array.isArray(items)) return EMPTY
    const valid = items
      .filter(
        (item): item is CompareItem =>
          typeof item === 'object' &&
          item !== null &&
          typeof (item as CompareItem).slug === 'string' &&
          typeof (item as CompareItem).name === 'string',
      )
      .slice(0, COMPARE_LIMIT)
    return valid.length > 0 ? { type: type as ListingType, items: valid } : EMPTY
  } catch {
    return EMPTY
  }
}

function writeStored(selection: CompareSelection) {
  try {
    if (selection.items.length === 0) window.localStorage.removeItem(STORAGE_KEY)
    else window.localStorage.setItem(STORAGE_KEY, JSON.stringify(selection))
  } catch {
    // Storage unavailable (private mode, blocked): selection still works for this visit.
  }
}

/**
 * Compare selection shared across pages (PRD §12): up to 3 items of one type, saved in
 * localStorage. Announces every change through a polite live region.
 */
export function CompareProvider({ children }: { children: ReactNode }) {
  const [selection, setSelection] = useState<CompareSelection>(readStored)
  const [pending, setPending] = useState<{ type: ListingType; item: CompareItem } | null>(null)
  const [message, setMessage] = useState('')
  const [sheetOpen, setSheetOpen] = useState(false)
  const [actionBars, setActionBars] = useState(0)

  useEffect(() => writeStored(selection), [selection])

  const announce = useCallback((text: string) => {
    // Toggle a zero-width space so repeating the same message is still announced.
    setMessage((previous) => (previous === text ? `${text}${ZERO_WIDTH_SPACE}` : text))
  }, [])

  const toggle = useCallback<CompareContextValue['toggle']>(
    (type, item) => {
      const noun = TYPE_NOUN[type]
      const selected = selection.type === type && selection.items.some((i) => i.slug === item.slug)
      if (selected) {
        const items = selection.items.filter((i) => i.slug !== item.slug)
        setSelection(items.length ? { type, items } : EMPTY)
        announce(
          `${item.name} removed from comparison. ${items.length} of ${COMPARE_LIMIT} selected.`,
        )
        return
      }
      if (selection.type && selection.type !== type && selection.items.length > 0) {
        setPending({ type, item })
        return
      }
      if (selection.items.length >= COMPARE_LIMIT) {
        announce(`You can compare up to ${COMPARE_LIMIT} ${noun.many}. Remove one to add another.`)
        return
      }
      const items = [...selection.items, item]
      setSelection({ type, items })
      announce(`${item.name} added to comparison. ${items.length} of ${COMPARE_LIMIT} selected.`)
    },
    [selection, announce],
  )

  const remove = useCallback(
    (slug: string) => {
      const item = selection.items.find((i) => i.slug === slug)
      const items = selection.items.filter((i) => i.slug !== slug)
      setSelection(items.length ? { type: selection.type, items } : EMPTY)
      if (item) announce(`${item.name} removed from comparison.`)
    },
    [selection, announce],
  )

  const clear = useCallback(() => {
    setSelection(EMPTY)
    announce('Comparison cleared.')
  }, [announce])

  const registerActionBar = useCallback(() => {
    setActionBars((count) => count + 1)
    return () => setActionBars((count) => count - 1)
  }, [])

  const value = useMemo<CompareContextValue>(
    () => ({
      ...selection,
      isSelected: (type, slug) =>
        selection.type === type && selection.items.some((i) => i.slug === slug),
      isFull: selection.items.length >= COMPARE_LIMIT,
      toggle,
      remove,
      clear,
      sheetOpen,
      setSheetOpen,
      actionBarActive: actionBars > 0,
      registerActionBar,
    }),
    [selection, toggle, remove, clear, sheetOpen, actionBars, registerActionBar],
  )

  const startNew = () => {
    if (!pending) return
    setSelection({ type: pending.type, items: [pending.item] })
    announce(`New comparison started with ${pending.item.name}.`)
    setPending(null)
  }

  const current = selection.type ? TYPE_NOUN[selection.type] : null
  const next = pending ? TYPE_NOUN[pending.type] : null

  return (
    <CompareContext.Provider value={value}>
      {children}
      <p role="status" aria-live="polite" className="sr-only">
        {message}
      </p>
      <Dialog.Root open={pending !== null} onOpenChange={(open) => !open && setPending(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-body/50 data-[state=open]:animate-fade-in" />
          <Dialog.Content
            role="alertdialog"
            className="fixed top-1/2 left-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-layer bg-surface p-6 shadow-overlay data-[state=open]:animate-fade-in"
          >
            <Dialog.Title className="type-h3">Start a new comparison?</Dialog.Title>
            <Dialog.Description className="mt-2 text-muted">
              Your comparison has {current?.many}. You can only compare one kind at a time. Start a
              new comparison with {next?.many}?
            </Dialog.Description>
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Dialog.Close asChild>
                <Button variant="secondary">Keep current</Button>
              </Dialog.Close>
              <Button onClick={startNew}>Start new</Button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </CompareContext.Provider>
  )
}
