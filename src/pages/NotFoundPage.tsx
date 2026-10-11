import { PageContainer } from '@/components/layout/PageContainer'
import { SearchField } from '@/features/search/SearchField'
import { usePageMeta } from '@/lib/usePageMeta'

export function NotFoundPage() {
  usePageMeta({
    title: 'Page not found',
    description: 'The page you were looking for doesn’t exist.',
  })
  return (
    <PageContainer className="py-16 lg:py-24">
      <div className="max-w-measure">
        <h1 className="type-h1">This page doesn’t exist</h1>
        <p className="mt-4 text-lg text-muted">
          The link may be out of date. Search for a course or institution instead.
        </p>
        <div className="mt-6">
          <SearchField
            inputId="not-found-search"
            hiddenLabel="Search courses, universities and colleges"
            size="lg"
          />
        </div>
      </div>
    </PageContainer>
  )
}
