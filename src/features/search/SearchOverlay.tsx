import { Search } from 'lucide-react'
import { PageContainer } from '@/components/layout/PageContainer'
import { SheetContent, SheetRoot, SheetTrigger } from '@/components/ui/Sheet'
import { useNavigateAndClose } from '@/components/ui/useNavigateAndClose'
import { useServiceQuery } from '@/lib/useServiceQuery'
import { getPopularSearches } from '@/services'
import { PopularSearches } from './PopularSearches'
import { SearchField } from './SearchField'

/** Full-screen search for screens below 1024px (DESIGN-DIRECTION.md §12). */
export function SearchOverlay({ triggerClassName }: { triggerClassName?: string }) {
  const { open, setOpen, closeAfterNavigation: close, onCloseAutoFocus } = useNavigateAndClose()
  const popular = useServiceQuery('popular-searches', getPopularSearches)

  return (
    <SheetRoot open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className={`grid size-11 place-items-center rounded-control text-current hover:bg-white/10 ${triggerClassName ?? ''}`}
      >
        <Search aria-hidden="true" className="size-6" strokeWidth={1.75} />
        <span className="sr-only">Search</span>
      </SheetTrigger>
      <SheetContent
        title="Search"
        showTitle={false}
        side="full"
        onCloseAutoFocus={onCloseAutoFocus}
      >
        <PageContainer className="space-y-6 py-6">
          <SearchField
            inputId="overlay-search"
            hiddenLabel="Search courses, universities and colleges"
            size="lg"
            autoFocus
            onSearch={close}
          />
          {popular.status === 'success' && (
            <PopularSearches queries={popular.data} headingId="overlay-popular" onSelect={close} />
          )}
        </PageContainer>
      </SheetContent>
    </SheetRoot>
  )
}
