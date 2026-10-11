import { Link } from 'react-router-dom'
import { cardClass, stretchedLink } from '@/components/ui/cardStyles'
import { cn } from '@/lib/cn'
import { formatDate } from '@/lib/format'
import type { ArticleSummary } from '@/types/dto'
import { ArticleCover } from './ArticleCover'

/** Homepage article card: illustrated cover, category, title and reading metadata. */
export function ArticleCard({
  article,
  featured = false,
}: {
  article: ArticleSummary
  featured?: boolean
}) {
  return (
    <article className={cn(cardClass, 'h-full')}>
      <ArticleCover categorySlug={article.category.slug} featured={featured} className="m-3" />
      <div className={featured ? 'px-6 pt-2 pb-7' : 'px-5 pt-1 pb-5'}>
        <p className="type-meta">{article.category.name}</p>
        <h3
          className={cn(
            'mt-1 leading-tight font-bold [font-stretch:112.5%]',
            featured ? 'text-3xl' : 'text-xl',
          )}
        >
          <Link to={`/articles/${article.slug}`} className={stretchedLink}>
            {article.title}
          </Link>
        </h3>
        {featured && <p className="mt-3 text-muted">{article.excerpt}</p>}
        <p className="type-meta mt-3 flex flex-wrap gap-x-4">
          <time dateTime={article.publishedOn}>{formatDate(article.publishedOn)}</time>
          <span>{article.readingMinutes} min read</span>
        </p>
      </div>
    </article>
  )
}
