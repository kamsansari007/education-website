import { motion } from 'motion/react'
import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

export interface TabItem {
  id: string
  label: string
  content: ReactNode
}

/**
 * WAI-ARIA tabs (automatic activation; arrow / Home / End keys). The selected pill slides
 * between tabs and panels crossfade (Motion); with reduced motion both are instant.
 */
export function Tabs({ items, label }: { items: TabItem[]; label: string }) {
  const [selectedId, setSelectedId] = useState(items[0]?.id)
  const baseId = useId()
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  const select = (index: number) => {
    const item = items[index]
    if (!item) return
    setSelectedId(item.id)
    tabRefs.current[index]?.focus()
  }

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = items.length - 1
    const next: Record<string, number> = {
      ArrowRight: index === last ? 0 : index + 1,
      ArrowLeft: index === 0 ? last : index - 1,
      Home: 0,
      End: last,
    }
    const target = next[event.key]
    if (target === undefined) return
    event.preventDefault()
    select(target)
  }

  const selected = items.find((item) => item.id === selectedId)

  return (
    <div>
      <div
        role="tablist"
        aria-label={label}
        className="inline-flex max-w-full gap-1 overflow-x-auto rounded-full bg-paper p-1.5"
      >
        {items.map((item, index) => {
          const isSelected = item.id === selectedId
          return (
            <button
              key={item.id}
              ref={(element) => {
                tabRefs.current[index] = element
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${item.id}`}
              aria-selected={isSelected}
              aria-controls={`${baseId}-panel`}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => setSelectedId(item.id)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className={cn(
                'relative min-h-11 shrink-0 rounded-full px-5 font-semibold whitespace-nowrap transition-colors duration-150',
                isSelected ? 'text-white' : 'text-muted hover:text-body',
              )}
            >
              {isSelected && (
                <motion.span
                  layoutId={`${baseId}-pill`}
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full bg-ink-900"
                  transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                />
              )}
              <span className="relative">{item.label}</span>
            </button>
          )
        })}
      </div>
      {selected && (
        <motion.div
          key={selected.id}
          role="tabpanel"
          id={`${baseId}-panel`}
          aria-labelledby={`${baseId}-tab-${selected.id}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          {selected.content}
        </motion.div>
      )}
    </div>
  )
}
