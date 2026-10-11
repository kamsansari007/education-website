import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export const SheetRoot = Dialog.Root
export const SheetTrigger = Dialog.Trigger
export const SheetClose = Dialog.Close

interface SheetContentProps {
  title: string
  /** Show the title visually (true) or only to screen readers (false). */
  showTitle?: boolean
  side?: 'right' | 'bottom' | 'full'
  /** Sticky footer actions, outside the scrolling body. */
  footer?: ReactNode
  children: ReactNode
  /** Override focus return, e.g. when closing because the user navigated. */
  onCloseAutoFocus?: (event: Event) => void
}

/**
 * Modal sheet built on Radix Dialog: focus trap, Esc, focus return and inert background.
 * Always has a visible close button; dragging is never required.
 */
export function SheetContent({
  title,
  showTitle = true,
  side = 'right',
  children,
  onCloseAutoFocus,
  footer,
}: SheetContentProps) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-50 bg-body/50 data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in" />
      <Dialog.Content
        aria-describedby={undefined}
        onCloseAutoFocus={onCloseAutoFocus}
        className={cn(
          'fixed z-50 flex flex-col bg-surface shadow-overlay focus:outline-none',
          side === 'right' &&
            'inset-y-0 right-0 w-full max-w-sm data-[state=closed]:animate-sheet-out-right data-[state=open]:animate-sheet-in-right',
          side === 'bottom' &&
            'inset-x-0 bottom-0 max-h-[90dvh] rounded-t-layer pb-[env(safe-area-inset-bottom)] data-[state=closed]:animate-sheet-out-bottom data-[state=open]:animate-sheet-in-bottom',
          side === 'full' &&
            'inset-0 data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in',
        )}
      >
        <div className="flex min-h-16 items-center justify-between gap-4 border-b border-rule pr-2 pl-4">
          <Dialog.Title className={showTitle ? 'type-h3' : 'sr-only'}>{title}</Dialog.Title>
          <Dialog.Close
            className={cn(
              'grid size-11 place-items-center rounded-control text-body hover:bg-ink-50',
              !showTitle && 'ml-auto',
            )}
          >
            <X aria-hidden="true" className="size-6" strokeWidth={1.75} />
            <span className="sr-only">Close</span>
          </Dialog.Close>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">{children}</div>
        {footer && <div className="border-t border-rule bg-surface px-4 py-3">{footer}</div>}
      </Dialog.Content>
    </Dialog.Portal>
  )
}
