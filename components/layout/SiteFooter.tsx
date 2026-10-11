import { Link } from 'react-router-dom'
import { useServiceQuery } from '@/lib/useServiceQuery'
import { COMPANY_NAV, LEGAL_NAV, PRIMARY_NAV, type NavItem } from '@/lib/navigation'
import { SITE_NAME } from '@/lib/site'
import { getStreams } from '@/services'
import { PageContainer } from './PageContainer'
import { Wordmark } from './Wordmark'

const MODE_LINKS: NavItem[] = [
  { to: '/courses?mode=regular', label: 'Regular (on campus)' },
  { to: '/courses?mode=online', label: 'Online' },
  { to: '/courses?mode=distance', label: 'Distance' },
]

function FooterNav({ id, title, items }: { id: string; title: string; items: NavItem[] }) {
  return (
    <nav aria-labelledby={id}>
      <h2 id={id} className="type-meta text-on-ink-muted">
        {title}
      </h2>
      <ul className="mt-2">
        {items.map((item) => (
          <li key={item.to}>
            <Link
              to={item.to}
              className="inline-flex min-h-11 items-center text-white/85 hover:text-white hover:underline"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export function SiteFooter() {
  const streams = useServiceQuery('streams', getStreams)
  const streamLinks: NavItem[] =
    streams.status === 'success'
      ? streams.data
          .slice(0, 6)
          .map((stream) => ({ to: `/courses?stream=${stream.slug}`, label: stream.name }))
      : []

  return (
    <footer className="on-ink bg-ink-900 text-white">
      <PageContainer className="grid gap-x-8 gap-y-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:py-16">
        <div className="max-w-xs">
          <Wordmark />
          <p className="type-small mt-2 text-on-ink-muted">
            Discover and compare courses, colleges and universities, then talk it through with a
            counsellor.
          </p>
          <p className="type-small mt-4 text-on-ink-muted">
            Phone and email will be added once confirmed.
          </p>
        </div>
        <FooterNav id="footer-streams" title="Browse by stream" items={streamLinks} />
        <FooterNav id="footer-modes" title="Browse by mode" items={MODE_LINKS} />
        <FooterNav id="footer-explore" title="Explore" items={[...PRIMARY_NAV, ...COMPANY_NAV]} />
      </PageContainer>
      <div className="border-t border-white/15">
        <PageContainer className="flex flex-col gap-3 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="type-small text-on-ink-muted">
            Demo site. All institutions, fees, approvals and articles are fictional sample content.
          </p>
          <div className="flex items-center gap-4">
            {LEGAL_NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="type-small inline-flex min-h-11 items-center text-on-ink-muted hover:text-white hover:underline"
              >
                {item.label}
              </Link>
            ))}
            <p className="type-small text-on-ink-muted">
              © {new Date().getFullYear()} {SITE_NAME}
            </p>
          </div>
        </PageContainer>
      </div>
    </footer>
  )
}
