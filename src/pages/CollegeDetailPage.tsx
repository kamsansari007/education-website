import { Link, useParams } from 'react-router-dom'
import { PageContainer } from '@/components/layout/PageContainer'
import { Monogram } from '@/components/ui/Monogram'
import { LoadError } from '@/components/ui/QueryStates'
import { SampleDataLabel } from '@/components/ui/SampleDataLabel'
import { ArticleRow } from '@/features/articles/ArticleRow'
import { CompareToggle } from '@/features/compare/CompareToggle'
import { ApprovalsList } from '@/features/institutions/detail/ApprovalsList'
import { DetailHeader } from '@/features/institutions/detail/DetailHeader'
import { DetailLayout } from '@/features/institutions/detail/DetailLayout'
import { DetailSection } from '@/features/institutions/detail/DetailSection'
import { DetailNotFound, DetailSkeleton } from '@/features/institutions/detail/DetailStates'
import { EligibilityList } from '@/features/institutions/detail/EligibilityList'
import { KeyFacts } from '@/features/institutions/detail/KeyFacts'
import { OfferingsTable } from '@/features/institutions/detail/OfferingsTable'
import { RelatedInstitutions } from '@/features/institutions/detail/RelatedInstitutions'
import type { NavSection } from '@/features/institutions/detail/SectionNav'
import { formatFeeRange, formatPlace } from '@/lib/format'
import { OWNERSHIP_LABEL, UNIVERSITY_TYPE_LABEL, listModes } from '@/lib/labels'
import { usePageMeta } from '@/lib/usePageMeta'
import { useServiceQuery } from '@/lib/useServiceQuery'
import { getCollegeBySlug } from '@/services'
import type { CollegeDetail } from '@/types/dto'

export function CollegeDetailPage() {
  const { slug = '' } = useParams()
  const query = useServiceQuery(`college:${slug}`, () => getCollegeBySlug(slug))
  const college = query.status === 'success' ? query.data : null

  usePageMeta({
    title:
      query.status === 'success' && !college ? 'College not found' : (college?.name ?? 'College'),
    description: college
      ? `${college.name}, ${formatPlace(college.city, college.state)}, affiliated to ${college.affiliatedUniversity.name}: courses, fees and approvals. Demo with fictional data.`
      : 'College details. Demo with fictional data.',
  })

  if (query.status === 'loading') return <DetailSkeleton label="Loading college" />
  if (query.status === 'error')
    return (
      <PageContainer className="py-16">
        <h1 className="type-h1">College</h1>
        <LoadError message="This college couldn’t be loaded." onRetry={query.retry} />
      </PageContainer>
    )
  if (!college)
    return (
      <DetailNotFound noun="college" listing={{ to: '/colleges', label: 'Browse all colleges' }} />
    )

  return <CollegeView college={college} />
}

function CollegeView({ college }: { college: CollegeDetail }) {
  const enquiry = {
    interest: college.name,
    source: { type: 'college' as const, slug: college.slug },
  }
  const university = college.university
  const universityHref = `/universities/${university.slug}`

  const sections: NavSection[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'affiliation', label: 'Affiliation' },
    { id: 'courses', label: 'Courses and fees' },
    { id: 'eligibility', label: 'Eligibility' },
    ...(college.approvalDetails.length ? [{ id: 'approvals', label: 'Approvals' }] : []),
    ...(college.siblings.length ? [{ id: 'siblings', label: 'Other colleges' }] : []),
    ...(college.relatedArticles.length ? [{ id: 'guides', label: 'Guides' }] : []),
  ]

  return (
    <>
      <DetailHeader
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Colleges', to: '/colleges' },
          { label: college.name },
        ]}
        name={college.name}
        identity={
          <p className="flex flex-wrap gap-x-4">
            <span>{formatPlace(college.city, college.state)}</span>
            <span>{OWNERSHIP_LABEL[college.ownership]}</span>
            <span>
              Affiliated to{' '}
              <Link to={universityHref} className="text-white underline">
                {university.name}
              </Link>
            </span>
          </p>
        }
        action={<CompareToggle type="college" item={{ slug: college.slug, name: college.name }} />}
      />
      <DetailLayout
        name={college.name}
        enquiry={enquiry}
        sections={sections}
        keyFacts={
          <KeyFacts
            facts={[
              { label: 'Ownership', value: OWNERSHIP_LABEL[college.ownership] },
              { label: 'Streams', value: college.streams.join(', ') },
              { label: 'Courses', value: college.courseCount },
              {
                label: 'Fees per year',
                value: college.annualFeeRange
                  ? formatFeeRange(college.annualFeeRange)
                  : 'Not available',
              },
              {
                label: 'Approvals',
                value: college.approvals.map((a) => a.label).join(', ') || 'None listed',
              },
            ]}
          />
        }
      >
        <DetailSection id="overview" title="Overview">
          <p className="max-w-measure text-lg">{college.summary}</p>
          <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
            <div>
              <dt className="type-meta">Established</dt>
              <dd className="mt-1">{college.established}</dd>
            </div>
            <div>
              <dt className="type-meta">Study modes</dt>
              <dd className="mt-1">{listModes(college.modes)}</dd>
            </div>
          </dl>
        </DetailSection>

        <DetailSection
          id="affiliation"
          title="Affiliated university"
          description="An affiliated college teaches the course; its university usually sets the syllabus, runs the examinations and awards the degree."
        >
          <div className="flex gap-4 rounded-layer border border-rule bg-surface p-5">
            <Monogram name={university.name} size="md" />
            <div className="min-w-0 flex-1 [overflow-wrap:anywhere]">
              <h3 className="type-h3">
                <Link to={universityHref} className="text-body hover:text-ink hover:underline">
                  {university.name}
                </Link>
              </h3>
              <p className="mt-0.5 flex flex-wrap gap-x-4 text-muted">
                <span>{formatPlace(university.city, university.state)}</span>
                <span>{UNIVERSITY_TYPE_LABEL[university.type]}</span>
              </p>
              <p className="type-small mt-2">
                <span className="type-meta">Approvals </span>
                {university.approvals.map((a) => a.label).join(', ') || 'None listed'}
              </p>
              <Link
                to={universityHref}
                className="mt-3 inline-flex min-h-11 items-center font-semibold text-ink underline"
              >
                View university
              </Link>
            </div>
          </div>
        </DetailSection>

        <DetailSection
          id="courses"
          title="Courses and fees"
          description={`${college.offerings.length} ways to study here, by course and mode. Fees are for the whole programme and per year.`}
          meta={<SampleDataLabel />}
        >
          <OfferingsTable
            rows={college.offerings}
            institution={college.name}
            source={enquiry.source}
          />
        </DetailSection>

        <DetailSection
          id="eligibility"
          title="Eligibility"
          description="General eligibility for each course. The college or its university may set further criteria, so confirm before you apply."
        >
          <EligibilityList rows={college.offerings} />
        </DetailSection>

        {college.approvalDetails.length > 0 && (
          <DetailSection
            id="approvals"
            title="Approvals"
            description="What each approval means, and where to check it yourself."
            meta={<SampleDataLabel />}
          >
            <ApprovalsList approvals={college.approvalDetails} />
          </DetailSection>
        )}

        {college.siblings.length > 0 && (
          <DetailSection id="siblings" title={`Other colleges affiliated to ${university.name}`}>
            <RelatedInstitutions
              items={college.siblings.map((other) => ({
                href: `/colleges/${other.slug}`,
                name: other.name,
                city: other.city,
                state: other.state,
                kind: OWNERSHIP_LABEL[other.ownership],
                annualFeeRange: other.annualFeeRange,
              }))}
            />
          </DetailSection>
        )}

        {college.relatedArticles.length > 0 && (
          <DetailSection id="guides" title="Related guides">
            <ul className="divide-y divide-rule border-y border-rule">
              {college.relatedArticles.map((article) => (
                <ArticleRow key={article.slug} article={article} />
              ))}
            </ul>
          </DetailSection>
        )}
      </DetailLayout>
    </>
  )
}
