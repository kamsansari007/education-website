import { PageContainer } from '@/components/layout/PageContainer'
import { Button, ButtonLink } from '@/components/ui/Button'

/** Per-route error boundary content. Keeps the site shell visible. */
export function RouteError() {
  return (
    <PageContainer className="py-16 lg:py-24">
      <div role="alert" className="max-w-measure">
        <h1 className="type-h1">Something went wrong on this page</h1>
        <p className="mt-4 text-lg text-muted">Reload to try again, or go back to the homepage.</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button onClick={() => window.location.reload()}>Reload page</Button>
          <ButtonLink to="/" variant="secondary">
            Go to the homepage
          </ButtonLink>
        </div>
      </div>
    </PageContainer>
  )
}
