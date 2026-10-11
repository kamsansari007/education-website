import '@fontsource/kalam/latin-400.css'
import { MotionConfig } from 'motion/react'
import { Section } from '@/components/layout/Section'
import { LoadError, LoadingStatus, SkeletonRows } from '@/components/ui/QueryStates'
import { ArticlesSection } from '@/features/home/ArticlesSection'
import { ComparePreviewSection } from '@/features/home/ComparePreviewSection'
import { ExploreSection } from '@/features/home/ExploreSection'
import { GuidanceSection } from '@/features/home/GuidanceSection'
import { HeroSection } from '@/features/home/HeroSection'
import { LineIndexSection } from '@/features/home/LineIndexSection'
import { StudyModesSection } from '@/features/home/StudyModesSection'
import { TrustSection } from '@/features/home/TrustSection'
import { usePageMeta } from '@/lib/usePageMeta'
import { useServiceQuery } from '@/lib/useServiceQuery'
import { getHomeHighlights } from '@/services'

/**
 * Homepage as a sequence of answers to the questions a family asks
 * (DESIGN-DIRECTION.md §8): start → stream → mode → where → compare → trust → help → learn.
 */
export function HomePage() {
  usePageMeta({
    description:
      'Find and compare courses, colleges and universities, then get guidance from a counsellor. Demo with fictional data.',
  })
  const highlights = useServiceQuery('home-highlights', getHomeHighlights)

  return (
    // Every Motion animation on the homepage honours the user's reduced-motion setting.
    <MotionConfig reducedMotion="user">
      <HeroSection highlights={highlights} />
      <LineIndexSection />
      <StudyModesSection />
      {highlights.status === 'loading' && (
        <Section labelledBy="home-loading">
          <p id="home-loading" className="sr-only">
            Loading courses and institutions
          </p>
          <LoadingStatus label="Loading courses and institutions" />
          <SkeletonRows count={4} />
        </Section>
      )}
      {highlights.status === 'error' && (
        <Section labelledBy="home-error">
          <p id="home-error" className="sr-only">
            Courses and institutions
          </p>
          <LoadError
            message="Courses and institutions couldn’t be loaded."
            onRetry={highlights.retry}
          />
        </Section>
      )}
      {highlights.status === 'success' && (
        <>
          <ExploreSection highlights={highlights.data} />
          <ComparePreviewSection universities={highlights.data.comparePreview} />
        </>
      )}
      <TrustSection />
      <GuidanceSection />
      {highlights.status === 'success' && (
        <ArticlesSection
          featured={highlights.data.featuredArticle}
          recent={highlights.data.recentArticles}
        />
      )}
    </MotionConfig>
  )
}
