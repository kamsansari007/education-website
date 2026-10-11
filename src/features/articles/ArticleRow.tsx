import { Link } from 'react-router-dom'
import { cn } from '@/lib/cn'
import { formatDate } from '@/lib/format'
import type { ArticleSummary } from '@/types/dto'

function ArticleMeta({ article }: { article: ArticleSummary }) {
  return (
    <p className="type-meta mt-3 flex flex-wrap gap-x-4">
      <time dateTime={article.publishedOn}>{formatDate(article.publishedOn)}</time>
      <span>{article.readingMinutes} min read</span>
    </p>
  )
}

/** Text row for article lists. */
export function ArticleRow({ article }: { article: ArticleSummary }) {
  return (
    <li className="py-5">
      <article>
        <p className="type-meta">{article.category.name}</p>
        <h3 className="type-h3 mt-1">
          <Link
            to={`/articles/${article.slug}`}
            className="text-body hover:text-ink hover:underline"
          >
            {article.title}
          </Link>
        </h3>
        <p className="mt-1 line-clamp-2 text-muted">{article.excerpt}</p>
        <ArticleMeta article={article} />
      </article>
    </li>
  )
}

/**
 * Featured article. Typographic for Phase 1: no licensed imagery yet
 * (DESIGN-DIRECTION.md §19.3, question 5).
 */
export function FeaturedArticle({
  article,
  className,
}: {
  article: ArticleSummary
  className?: string
}) {
  return (
    <article className={cn('border-t-2 border-ink pt-5', className)}>
      <p className="type-meta">{article.category.name}</p>
      <h3 className="type-h2 mt-2">
        <Link to={`/articles/${article.slug}`} className="text-body hover:text-ink hover:underline">
          {article.title}
        </Link>
      </h3>
      <p className="mt-3 max-w-measure text-lg text-muted">{article.excerpt}</p>
      <ArticleMeta article={article} />
    </article>
  )
}
