import type { Fact } from '@/components/ui/FactGroup'
import { SampleDataLabel } from '@/components/ui/SampleDataLabel'

/**
 * The first thing on a detail page: the facts people decide on, as a ruled grid
 * (two columns on phones, one row from 1024px).
 */
export function KeyFacts({ facts }: { facts: Fact[] }) {
  return (
    <section aria-labelledby="key-facts-title">
      <div className="flex items-center justify-between gap-4">
        <h2 id="key-facts-title" className="type-h3">
          Key facts
        </h2>
        <SampleDataLabel />
      </div>
      <dl className="mt-2 grid grid-cols-2 border-t-2 border-body sm:grid-cols-[repeat(auto-fit,minmax(10rem,1fr))]">
        {facts.map((fact) => (
          <div
            key={fact.label}
            className="min-w-0 border-b border-rule py-3 pr-4 [overflow-wrap:anywhere]"
          >
            <dt className="type-meta">{fact.label}</dt>
            <dd className="type-fact mt-1">{fact.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
