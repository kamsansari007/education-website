import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export interface Fact {
  label: string
  value: ReactNode
}

/**
 * Labelled facts as a definition list. Label sits above value; values use tabular figures.
 * Used for listing rows now and the detail-page key facts later.
 */
export function FactGroup({ facts, className }: { facts: Fact[]; className?: string }) {
  return (
    <dl className={cn('flex flex-wrap gap-x-6 gap-y-3', className)}>
      {facts.map((fact) => (
        <div key={fact.label} className="min-w-0">
          <dt className="type-meta">{fact.label}</dt>
          <dd className="type-fact mt-1">{fact.value}</dd>
        </div>
      ))}
    </dl>
  )
}
