import { Link } from 'react-router-dom'
import { cardClass, cardPadding, stretchedLink } from '@/components/ui/cardStyles'
import { cn } from '@/lib/cn'
import { formatPlace, monogram } from '@/lib/format'

interface InstitutionCardProps {
  href: string
  name: string
  city: string
  state: string
  kindLabel: string
  facts: { label: string; value: string }[]
}

/** Homepage (Invite) featured institution. Listings use UniversityRow / CollegeRow. */
export function InstitutionCard({
  href,
  name,
  city,
  state,
  kindLabel,
  facts,
}: InstitutionCardProps) {
  return (
    <article className={cn(cardClass, cardPadding)}>
      <span
        aria-hidden="true"
        className="grid size-14 place-items-center rounded-2xl bg-ink-900 text-lg font-bold text-white [font-stretch:87.5%]"
      >
        {monogram(name)}
      </span>
      <h3 className="type-h3 mt-4">
        <Link to={href} className={stretchedLink}>
          {name}
        </Link>
      </h3>
      <p className="type-small text-muted">
        {formatPlace(city, state)}, {kindLabel.toLowerCase()}
      </p>
      <dl className="mt-auto grid gap-y-2 border-t border-rule pt-4">
        {facts.map((fact) => (
          <div key={fact.label} className="flex flex-wrap justify-between gap-x-4">
            <dt className="type-meta">{fact.label}</dt>
            <dd className="text-right font-semibold tabular-nums">{fact.value}</dd>
          </div>
        ))}
      </dl>
    </article>
  )
}
