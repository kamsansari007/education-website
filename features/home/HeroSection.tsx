import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useRef } from 'react'
import { PageContainer } from '@/components/layout/PageContainer'
import { PopularSearches } from '@/features/search/PopularSearches'
import { SearchField } from '@/features/search/SearchField'
import { setHeroSearchVisible } from '@/lib/heroSearchVisibility'
import type { QueryState } from '@/lib/useServiceQuery'
import { useServiceQuery } from '@/lib/useServiceQuery'
import { getCatalogStats, getPopularSearches } from '@/services'
import type { HomeHighlights } from '@/types/dto'
import { RouteList, RouteMap } from './RouteMap'

/**
 * Q: "Where do I start?" The Routes hero (DESIGN-DIRECTION.md §8.1): the H1 labels the search,
 * which stays the primary action; the route map shows illustrative paths between real courses.
 */
export function HeroSection({ highlights }: { highlights: QueryState<HomeHighlights> }) {
  const popular = useServiceQuery('popular-searches', getPopularSearches)
  const stats = useServiceQuery('catalog-stats', getCatalogStats)
  const searchRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const element = searchRef.current
    if (!element) return
    const observer = new IntersectionObserver(([entry]) =>
      setHeroSearchVisible(entry?.isIntersecting ?? false),
    )
    observer.observe(element)
    return () => {
      observer.disconnect()
      setHeroSearchVisible(false)
    }
  }, [])

  const routes = highlights.status === 'success' ? highlights.data.routes : []

  return (
    <section
      aria-labelledby="home-title"
      className="on-ink bg-ink-900 pt-8 pb-16 text-white md:pt-12 lg:pt-16 lg:pb-24"
    >
      <PageContainer className="grid grid-cols-[minmax(0,1fr)] items-center gap-12 lg:grid-cols-[minmax(0,5.4fr)_minmax(0,6.6fr)] lg:gap-14">
        <div>
          <h1 id="home-title" className="type-display [overflow-wrap:anywhere]">
            <label htmlFor="home-search">What do you want to study?</label>
          </h1>
          <p className="type-lead mt-5 max-w-xl text-on-ink-muted">
            Follow a path from one course to the next, mark up what matters, and compare the facts
            side by side.
          </p>
          <div ref={searchRef} className="mt-8">
            <SearchField
              inputId="home-search"
              size="hero"
              placeholder="MBA, nursing or a university"
            />
          </div>
          <div className="mt-5 min-h-11">
            {popular.status === 'success' && (
              <PopularSearches queries={popular.data} headingId="home-popular" tone="dark" />
            )}
          </div>
          {stats.status === 'success' && (
            <p className="type-small mt-6 text-on-ink-muted">
              This demo lists {stats.data.courses} courses at {stats.data.universities} universities
              and {stats.data.colleges} colleges. All of them are fictional.
            </p>
          )}
        </div>
        {routes.length > 0 && (
          <div>
            <div className="hidden pt-10 md:block">
              <RouteMap routes={routes} />
            </div>
            <div className="md:hidden">
              <RouteList routes={routes} />
            </div>
            {/* The hero annotation: a taped note placed once after the routes draw. It is the
                visible caption that keeps the paths honest. */}
            <motion.div
              initial={reduced ? false : { opacity: 0, y: -14, rotate: -6 }}
              animate={{ opacity: 1, y: 0, rotate: -2 }}
              transition={{ type: 'spring', stiffness: 240, damping: 22, delay: 1.4 }}
              className="paper-note relative mt-8 max-w-xs bg-paper-mint p-4 pt-5 text-body md:-mt-2 md:ml-8"
            >
              <span
                aria-hidden="true"
                className="tape -top-3 left-1/2 -translate-x-1/2 -rotate-2"
              />
              <p aria-hidden="true" className="hand text-lg leading-none">
                Good to know
              </p>
              <p className="type-small mt-1">
                These are example paths between related courses in this demo, not admission
                requirements. Eligibility varies by course.
              </p>
            </motion.div>
          </div>
        )}
      </PageContainer>
    </section>
  )
}
