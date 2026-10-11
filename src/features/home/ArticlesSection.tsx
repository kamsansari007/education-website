import { Section } from '@/components/layout/Section'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { ArticleCard } from '@/features/articles/ArticleCard'
import type { HomeHighlights } from '@/types/dto'

/** Q: "Where can I learn more?" One featured guide plus recent ones, with illustrated covers. */
export function ArticlesSection({
  featured,
  recent,
}: {
  featured: HomeHighlights['featuredArticle']
  recent: HomeHighlights['recentArticles']
}) {
  return (
    <Section labelledBy="articles-title" spacing="feature">
      <SectionHeading
        id="articles-title"
        size="section"
        title="Guides for the journey"
        action={{ to: '/articles', label: 'All articles' }}
      />
      <ul className="grid gap-5 md:grid-cols-[repeat(2,minmax(0,1fr))] lg:grid-cols-[repeat(4,minmax(0,1fr))]">
        {featured && (
          <li className="min-w-0 md:col-span-2 lg:row-span-2">
            <ArticleCard article={featured} featured />
          </li>
        )}
        {recent.map((article) => (
          <li key={article.slug} className="min-w-0">
            <ArticleCard article={article} />
          </li>
        ))}
      </ul>
    </Section>
  )
}
