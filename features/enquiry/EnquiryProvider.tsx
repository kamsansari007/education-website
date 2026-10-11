import { useCallback, useMemo, useRef, useState, type ReactNode } from 'react'
import type { EnquiryContext } from '@/types/dto'
import { EMPTY_DRAFT, EnquiryApiContext, type EnquiryDraft } from './enquiryContext'
import { EnquiryDialog } from './EnquiryDialog'

/**
 * One enquiry dialog for the whole app (PRD §13). Holds the draft for the session (in memory
 * only), so closing and reopening keeps what was typed, and returns focus to whatever opened it.
 */
export function EnquiryProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [context, setContext] = useState<EnquiryContext>({})
  const [draft, setDraft] = useState<EnquiryDraft>(EMPTY_DRAFT)
  const opener = useRef<HTMLElement | null>(null)

  const openDialog = useCallback((next: EnquiryContext = {}) => {
    opener.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    setContext(next)
    // A new context replaces "Interested in"; everything else the user typed is kept.
    setDraft((current) => ({ ...current, interest: next.interest ?? current.interest }))
    setOpen(true)
  }, [])

  const api = useMemo(() => ({ open: openDialog }), [openDialog])

  return (
    <EnquiryApiContext.Provider value={api}>
      {children}
      <EnquiryDialog
        open={open}
        onOpenChange={setOpen}
        context={context}
        draft={draft}
        setDraft={setDraft}
        opener={opener}
      />
    </EnquiryApiContext.Provider>
  )
}
