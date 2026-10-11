import * as Dialog from '@radix-ui/react-dialog'
import { SlidersHorizontal } from 'lucide-react'
import { useRef, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { SheetContent, SheetRoot, SheetTrigger } from '@/components/ui/Sheet'
import { useServiceQuery } from '@/lib/useServiceQuery'
import type { FilterSelection, ListQuery, ListResult } from '@/types/listing'
import { FilterPanel } from './FilterPanel'

interface FilterSheetProps<T> {
  listingKey: string
  q: string
  applied: FilterSelection
  activeCount: number
  load: (query: ListQuery) => Promise<ListResult<T>>
  onApply: (filters: FilterSelection) => void
}

/** Compares selections ignoring empty facets and value order. */
function sameSelection(a: FilterSelection, b: FilterSelection): boolean {
  const normalise = (selection: FilterSelection) =>
    JSON.stringify(
      Object.entries(selection)
        .filter(([, values]) => values.length > 0)
        .map(([key, values]) => [key, [...values].sort()])
        .sort(([x], [y]) => String(x).localeCompare(String(y))),
    )
  return normalise(a) === normalise(b)
}

/**
 * Below 1024px: filters open in a bottom sheet. Changes are a draft until
 * "Show N results". Closing with unapplied changes (close button, Esc or outside click)
 * asks "Discard filter changes?" first; with no changes it closes immediately
 * (DESIGN-DIRECTION.md §12).
 */
export function FilterSheet<T>({
  listingKey,
  q,
  applied,
  activeCount,
  load,
  onApply,
}: FilterSheetProps<T>) {
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState<FilterSelection>(applied)
  const [confirming, setConfirming] = useState(false)
  /** Element focused inside the sheet when the user tried to close it. */
  const resumeFocus = useRef<HTMLElement | null>(null)
  const discarding = useRef(false)

  const onOpenChange = (next: boolean) => {
    if (next) {
      setDraft(applied)
      setOpen(true)
      return
    }
    if (!sameSelection(draft, applied)) {
      resumeFocus.current =
        document.activeElement instanceof HTMLElement ? document.activeElement : null
      setConfirming(true)
      return
    }
    setOpen(false)
  }

  const discard = () => {
    discarding.current = true
    setConfirming(false)
    // Closing the sheet lets Radix return focus to the Filters trigger.
    setOpen(false)
  }

  return (
    <>
      <SheetRoot open={open} onOpenChange={onOpenChange}>
        <SheetTrigger className="inline-flex min-h-11 items-center gap-2 rounded-control border-[1.5px] border-ink bg-surface px-4 font-semibold text-ink hover:bg-ink-50">
          <SlidersHorizontal aria-hidden="true" className="size-4" strokeWidth={2} />
          Filters{activeCount > 0 && ` (${activeCount})`}
        </SheetTrigger>
        {open && (
          <DraftFilters
            listingKey={listingKey}
            q={q}
            draft={draft}
            setDraft={setDraft}
            load={load}
            onApply={() => {
              onApply(draft)
              setOpen(false)
            }}
          />
        )}
      </SheetRoot>

      <Dialog.Root open={confirming} onOpenChange={(next) => !next && setConfirming(false)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[60] bg-body/50 data-[state=open]:animate-fade-in" />
          <Dialog.Content
            role="alertdialog"
            onCloseAutoFocus={(event) => {
              event.preventDefault()
              if (discarding.current) {
                discarding.current = false
                return
              }
              // "Keep editing" or Esc: carry on where the user was in the sheet.
              resumeFocus.current?.focus()
            }}
            className="fixed top-1/2 left-1/2 z-[60] w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-layer bg-surface p-6 shadow-overlay data-[state=open]:animate-fade-in"
          >
            <Dialog.Title className="type-h3">Discard filter changes?</Dialog.Title>
            <Dialog.Description className="mt-2 text-muted">
              You changed filters but didn’t apply them.
            </Dialog.Description>
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Dialog.Close asChild>
                <Button variant="secondary">Keep editing</Button>
              </Dialog.Close>
              <Button onClick={discard}>Discard</Button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  )
}

function DraftFilters<T>({
  listingKey,
  q,
  draft,
  setDraft,
  load,
  onApply,
}: {
  listingKey: string
  q: string
  draft: FilterSelection
  setDraft: (draft: FilterSelection) => void
  load: (query: ListQuery) => Promise<ListResult<T>>
  onApply: () => void
}) {
  // Preview counts for the draft selection without applying it.
  const preview = useServiceQuery(`${listingKey}:draft:${q}:${JSON.stringify(draft)}`, () =>
    load({ q, filters: draft, pageSize: 1 }),
  )
  const data =
    preview.status === 'success'
      ? preview.data
      : preview.status === 'loading'
        ? preview.previous
        : undefined
  const total = data?.total ?? 0

  return (
    <SheetContent
      title="Filters"
      side="bottom"
      footer={
        <div className="flex items-center justify-between gap-4">
          <Button variant="tertiary" size="sm" onClick={() => setDraft({})}>
            Clear all
          </Button>
          <Button onClick={onApply} disabled={!data || total === 0}>
            {data
              ? total === 0
                ? 'No results'
                : `Show ${total} ${total === 1 ? 'result' : 'results'}`
              : 'Show results'}
          </Button>
        </div>
      }
    >
      <p role="status" className="sr-only">
        {data ? `${total} results with these filters` : ''}
      </p>
      <div className="px-4 py-4">
        {data && (
          <FilterPanel
            facets={data.facets}
            selection={draft}
            onChange={(key, values) => setDraft({ ...draft, [key]: values })}
          />
        )}
      </div>
    </SheetContent>
  )
}
