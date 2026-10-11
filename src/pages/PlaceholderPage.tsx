import { PageContainer } from '@/components/layout/PageContainer'
import { ButtonLink } from '@/components/ui/Button'
import { usePageMeta } from '@/lib/usePageMeta'

/**
 * Stand-in for routes scheduled in later milestones, so navigation never dead-ends.
 * Replace each with the real page as it is built.
 */
export function PlaceholderPage({ title }: { title: string }) {
  usePageMeta({ title, description: `${title}: coming in a later build of this demo.` })
  return (
    <PageContainer className="py-16 lg:py-24">
      <div className="max-w-measure">
        <h1 className="type-h1">{title}</h1>
        <p className="mt-4 text-lg text-muted">
          This page is part of the next build of the demo. The homepage shows the design direction
          and sample data in the meantime.
        </p>
        <ButtonLink to="/" variant="secondary" className="mt-8">
          Back to the homepage
        </ButtonLink>
      </div>
    </PageContainer>
  )
}
