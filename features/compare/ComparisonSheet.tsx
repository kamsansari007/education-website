import { useInView } from 'motion/react'
import { useRef, useState } from 'react'
import { cn } from '@/lib/cn'
import type { ComparisonAttribute } from './universityAttributes'

interface ComparedItem {
  slug: string
  name: string
}

/**
 * The annotated comparison sheet (DESIGN-DIRECTION.md §11.0): a real table on white paper.
 * Values that differ get a highlighter stroke, swept in once when the sheet comes into view
 * (instant under reduced motion), plus a "Differs" label, so colour is never the only
 * signal. One short blue-pen margin note summarises; it is decorative because the same count
 * is stated in text above the sheet.
 */
export function ComparisonSheet<T extends ComparedItem>({
  items,
  attributes,
  caption,
}: {
  items: T[]
  attributes: ComparisonAttribute<T>[]
  caption: string
}) {
  const [highlight, setHighlight] = useState(true)
  const sheetRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sheetRef, { once: true, amount: 0.35 })
  const rows = attributes.map((attribute) => {
    const values = items.map((item) => attribute.value(item))
    return { label: attribute.label, values, differs: new Set(values).size > 1 }
  })
  const differing = rows.filter((row) => row.differs).length

  // Stagger the sweep down the sheet, row by row.
  const differingIndex = new Map(
    rows.filter((row) => row.differs).map((row, index) => [row.label, index] as const),
  )
  const mark = (label: string, differs: boolean) => ({
    className: 'highlighter',
    'data-on': highlight && differs && inView ? '' : undefined,
    style: { transitionDelay: `${(differingIndex.get(label) ?? 0) * 90}ms` },
  })
  const differsLabel = (
    <span className="mt-1 inline-flex items-center gap-1.5 text-xs font-bold text-body">
      <span aria-hidden="true" className="h-2.5 w-4 rounded-[2px] bg-highlight" />
      Differs
    </span>
  )

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="type-small text-muted">
          {differing} of {rows.length} details differ.
        </p>
        <button
          type="button"
          aria-pressed={highlight}
          onClick={() => setHighlight((on) => !on)}
          className={cn(
            'inline-flex min-h-11 items-center rounded-full border-[1.5px] border-body px-5 font-semibold transition-colors duration-150',
            highlight ? 'bg-highlight text-body' : 'bg-surface text-body hover:bg-ink-50',
          )}
        >
          Highlight differences
        </button>
      </div>

      <div ref={sheetRef} className="paper-note relative bg-surface p-5 sm:p-8">
        <span aria-hidden="true" className="tape -top-3 left-10 -rotate-3" />
        <span aria-hidden="true" className="tape -top-3 right-10 rotate-3" />

        {/* ≥640px: a real table */}
        <table className="hidden w-full text-left sm:table">
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr>
              <td className="w-[30%] pb-3" />
              {items.map((item) => (
                <th
                  key={item.slug}
                  scope="col"
                  className="pb-3 text-xl leading-tight font-bold [font-stretch:112.5%]"
                >
                  {item.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-t border-rule">
                <th scope="row" className="py-3 pr-4 align-top font-normal">
                  <span className="type-meta block">{row.label}</span>
                  {highlight && row.differs && differsLabel}
                </th>
                {row.values.map((value, index) => (
                  <td
                    key={index}
                    className="py-3 pr-4 align-top text-lg font-semibold tabular-nums"
                  >
                    <span {...mark(row.label, row.differs)}>{value}</span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {/* <640px: each label sits above its paired values */}
        <div className="sm:hidden">
          <ul aria-label="Compared items" className="grid grid-cols-2 gap-3 pb-3">
            {items.map((item) => (
              <li key={item.slug} className="leading-tight font-bold [font-stretch:112.5%]">
                {item.name}
              </li>
            ))}
          </ul>
          <dl>
            {rows.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-2 gap-x-3 gap-y-1 border-t border-rule py-3"
              >
                <dt className="col-span-2 flex items-center justify-between gap-2">
                  <span className="type-meta">{row.label}</span>
                  {highlight && row.differs && differsLabel}
                </dt>
                {row.values.map((value, index) => (
                  <dd
                    key={index}
                    className="min-w-0 font-semibold tabular-nums [overflow-wrap:anywhere]"
                  >
                    <span className="sr-only">{items[index]?.name}: </span>
                    <span {...mark(row.label, row.differs)}>{value}</span>
                  </dd>
                ))}
              </div>
            ))}
          </dl>
        </div>

        <p aria-hidden="true" className="hand mt-4 -rotate-1 text-right text-xl">
          {differing} of {rows.length} differ — look at the marked ones
        </p>
      </div>
    </div>
  )
}
