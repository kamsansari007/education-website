import { Link } from 'react-router-dom'
import { Monogram } from '@/components/ui/Monogram'
import { formatFeeRange, formatPlace } from '@/lib/format'
import type { FeeRange } from '@/types/dto'

export interface RelatedInstitution {
  href: string
  name: string
  city: string
  state: string
  /** e.g. "Private university" or "Government college". */
  kind: string
  annualFeeRange: FeeRange | null
}

/** Light rows for related universities or colleges: enough to choose where to go next. */
export function RelatedInstitutions({ items }: { items: RelatedInstitution[] }) {
  return (
    <ul className="divide-y divide-rule border-y border-rule">
      {items.map((item) => (
        <li key={item.href} className="flex items-center gap-4 py-4">
          <Monogram name={item.name} />
          <div className="min-w-0 flex-1 [overflow-wrap:anywhere]">
            <h3 className="font-semibold">
              <Link to={item.href} className="text-body hover:text-ink hover:underline">
                {item.name}
              </Link>
            </h3>
            <p className="type-small flex flex-wrap gap-x-4 text-muted">
              <span>{formatPlace(item.city, item.state)}</span>
              <span>{item.kind}</span>
              {item.annualFeeRange && (
                <span className="tabular-nums">{formatFeeRange(item.annualFeeRange)} per year</span>
              )}
            </p>
          </div>
        </li>
      ))}
    </ul>
  )
}
