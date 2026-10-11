import { useState, type FocusEvent } from 'react'
import { NavLink } from 'react-router-dom'
import { GuidanceButton } from '@/features/enquiry/GuidanceButton'
import { SearchField } from '@/features/search/SearchField'
import { SearchOverlay } from '@/features/search/SearchOverlay'
import { cn } from '@/lib/cn'
import { useHeroSearchVisible } from '@/lib/heroSearchVisibility'
import { PRIMARY_NAV } from '@/lib/navigation'
import { MobileNav } from './MobileNav'
import { PageContainer } from './PageContainer'
import { Wordmark } from './Wordmark'
import { useHideOnScroll } from './useHideOnScroll'

/**
 * <768: wordmark, search icon, menu. 768–1023: adds Get guidance.
 * ≥1024: full navigation, inline search field and Get guidance.
 * Below 1024 the header hides while scrolling down and returns on scroll up.
 */
export function SiteHeader() {
  const scrolledDown = useHideOnScroll()
  const [focusWithin, setFocusWithin] = useState(false)
  const hidden = scrolledDown && !focusWithin
  const heroSearchVisible = useHeroSearchVisible()

  const onBlur = (event: FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setFocusWithin(false)
  }

  return (
    <header
      onFocus={() => setFocusWithin(true)}
      onBlur={onBlur}
      className={cn(
        // Night brand surface; `on-ink` switches focus rings to signal yellow.
        'on-ink sticky top-0 z-20 bg-ink-900 text-white transition-transform duration-200 ease-out',
        hidden && 'max-lg:-translate-y-full',
      )}
    >
      <PageContainer className="flex h-16 items-center gap-4 lg:gap-8">
        <Wordmark />
        <nav aria-label="Main" className="hidden self-stretch lg:block">
          <ul className="flex h-full gap-6">
            {PRIMARY_NAV.map((item) => (
              <li key={item.to} className="flex">
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center border-b-2 pt-0.5 font-medium transition-colors duration-150',
                      isActive
                        ? 'border-highlight text-white'
                        : 'border-transparent text-white/80 hover:text-white',
                    )
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-2 lg:gap-4">
          <div
            className={cn(
              'hidden w-64 transition-opacity duration-200 lg:block xl:w-80',
              // `invisible` also removes it from the tab order and accessibility tree.
              heroSearchVisible && 'invisible opacity-0',
            )}
          >
            <SearchField
              inputId="header-search"
              hiddenLabel="Search courses, universities and colleges"
            />
          </div>
          <SearchOverlay triggerClassName="lg:hidden" />
          {/* Wrapper controls visibility: the button's own display class would override `hidden`. */}
          <div className="hidden md:block">
            <GuidanceButton size="sm" variant="inverse" />
          </div>
          <MobileNav triggerClassName="lg:hidden" />
        </div>
      </PageContainer>
    </header>
  )
}
