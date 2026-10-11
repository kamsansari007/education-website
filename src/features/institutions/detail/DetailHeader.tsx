import type { ReactNode } from 'react'
import { Breadcrumbs, type Crumb } from '@/components/layout/Breadcrumbs'
import { PageContainer } from '@/components/layout/PageContainer'
import { Monogram } from '@/components/ui/Monogram'

/**
 * Title band for detail pages: continues the night header like the listings do, then the
 * page below stays in the calm Evaluate register.
 */
export function DetailHeader({
  crumbs,
  name,
  identity,
  action,
}: {
  crumbs: Crumb[]
  name: string
  /** Location, type and similar identity facts, shown under the name. */
  identity: ReactNode
  /** The compare toggle. */
  action: ReactNode
}) {
  return (
    <div className="on-ink bg-ink-900 text-white">
      <PageContainer className="pt-3 pb-8 lg:pb-10">
        <Breadcrumbs items={crumbs} onDark />
        <div className="mt-3 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between lg:mt-4">
          <div className="flex min-w-0 gap-4 lg:gap-5">
            <Monogram name={name} size="lg" />
            <div className="min-w-0 [overflow-wrap:anywhere]">
              <h1 className="type-h1">{name}</h1>
              <div className="mt-1.5 text-on-ink-muted">{identity}</div>
            </div>
          </div>
          <div className="shrink-0 sm:pt-1">{action}</div>
        </div>
      </PageContainer>
    </div>
  )
}
