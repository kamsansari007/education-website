import { Link } from 'react-router-dom'
import { PageContainer } from './PageContainer'

/**
 * Site-wide demo notice (DESIGN-DIRECTION.md §17). Not sticky and not dismissible.
 * Uses ink, never the highlighter, so the highlighter keeps its meaning.
 */
export function DemoStrip() {
  return (
    <div className="bg-ink-50 text-body">
      <PageContainer className="flex flex-wrap items-center gap-x-3 pt-2 sm:py-0">
        <p className="type-small">
          <strong className="font-semibold">Demo site:</strong> institutions, fees and approvals
          shown are fictional.
        </p>
        <Link
          to="/about"
          className="type-small inline-flex min-h-11 items-center font-medium text-ink underline"
        >
          About this demo
        </Link>
      </PageContainer>
    </div>
  )
}
