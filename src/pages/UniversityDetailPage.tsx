import { useParams } from 'react-router-dom'
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
import { PageContainer } from '@/components/layout/PageContainer'
import { formatFeeRange, formatPlace } from '@/lib/format'
import { OWNERSHIP_LABEL, UNIVERSITY_TYPE_LABEL, listModes } from '@/lib/labels'
import { usePageMeta } from '@/lib/usePageMeta'
import { useServiceQuery } from '@/lib/useServiceQuery'
import { getUniversityBySlug } from '@/services'
import type { UniversityDetail } from '@/types/dto'

export function UniversityDetailPage() {
  const { slug = '' } = useParams()
  const query = useServiceQuery(`university:${slug}`, () => getUniversityBySlug(slug))
  const university = query.status === 'success' ? query.data : null

  usePageMeta({
    title:
      query.status === 'success' && !university
        ? 'University not found'
        : (university?.name ?? 'University'),
    description: university
      ? `${university.name}, ${formatPlace(university.city, university.state)}: courses, fees, eligibility and approvals. Demo with fictional data.`
      : 'University details. Demo with fictional data.',
  })

  if (query.status === 'loading') return <DetailSkeleton label="Loading university" />
  if (query.status === 'error')
    return (
      <PageContainer className="py-16">
        <h1 className="type-h1">University</h1>
        <LoadError message="This university couldn’t be loaded." onRetry={query.retry} />
      </PageContainer>
    )
  if (!university)
    return (
      <DetailNotFound
        noun="university"
        listing={{ to: '/universities', label: 'Browse all universities' }}
      />
    )

  return <UniversityView university={university} />
}

function UniversityView({ university }: { university: UniversityDetail }) {
  const enquiry = {
    interest: university.name,
    source: { type: 'university' as const, slug: university.slug },
  }

  const sections: NavSection[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'courses', label: 'Courses and fees' },
    { id: 'eligibility', label: 'Eligibility' },
    ...(university.approvalDetails.length ? [{ id: 'approvals', label: 'Approvals' }] : []),
    ...(university.affiliatedColleges.length ? [{ id: 'colleges', label: 'Colleges' }] : []),
    ...(university.similar.length ? [{ id: 'similar', label: 'Similar' }] : []),
    ...(university.relatedArticles.length ? [{ id: 'guides', label: 'Guides' }] : []),
  ]

  return (
    <>
      <DetailHeader
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Universities', to: '/universities' },
          { label: university.name },
        ]}
        name={university.name}
        identity={
          <p className="flex flex-wrap gap-x-4">
            <span>{formatPlace(university.city, university.state)}</span>
            <span>{UNIVERSITY_TYPE_LABEL[university.type]}</span>
            <span>Established {university.established}</span>
          </p>
        }
        action={
          <CompareToggle
            type="university"
            item={{ slug: university.slug, name: university.name }}
          />
        }
      />
      <DetailLayout
        name={university.name}
        enquiry={enquiry}
        sections={sections}
        keyFacts={
          <KeyFacts
            facts={[
              { label: 'Study modes', value: listModes(university.modes) },
              { label: 'Courses', value: university.courseCount },
              {
                label: 'Fees per year',
                value: university.annualFeeRange
                  ? formatFeeRange(university.annualFeeRange)
                  : 'Not available',
              },
              {
                label: 'Approvals',
                value: university.approvals.map((a) => a.label).join(', ') || 'None listed',
              },
            ]}
          />
        }
      >
        <DetailSection id="overview" title="Overview">
          <p className="max-w-measure text-lg">{university.summary}</p>
          <dl className="mt-5 max-w-measure">
            <dt className="type-meta">Streams</dt>
            <dd className="mt-1">{university.streams.join(', ')}</dd>
          </dl>
        </DetailSection>

        <DetailSection
          id="courses"
          title="Courses and fees"
          description={`${university.offerings.length} ways to study here, by course and mode. Fees are for the whole programme and per year.`}
          meta={<SampleDataLabel />}
        >
          <OfferingsTable
            rows={university.offerings}
            institution={university.name}
            source={enquiry.source}
          />
        </DetailSection>

        <DetailSection
          id="eligibility"
          title="Eligibility"
          description="General eligibility for each course. The university may set further criteria, such as an entrance test, so confirm before you apply."
        >
          <EligibilityList rows={university.offerings} />
        </DetailSection>

        {university.approvalDetails.length > 0 && (
          <DetailSection
            id="approvals"
            title="Approvals"
            description="What each approval means, and where to check it yourself."
            meta={<SampleDataLabel />}
          >
            <ApprovalsList approvals={university.approvalDetails} />
          </DetailSection>
        )}

        {university.affiliatedColleges.length > 0 && (
          <DetailSection
            id="colleges"
            title="Affiliated colleges"
            description={`Colleges affiliated to ${university.name}.`}
          >
            <RelatedInstitutions
              items={university.affiliatedColleges.map((college) => ({
                href: `/colleges/${college.slug}`,
                name: college.name,
                city: college.city,
                state: college.state,
                kind: OWNERSHIP_LABEL[college.ownership],
                annualFeeRange: college.annualFeeRange,
              }))}
            />
          </DetailSection>
        )}

        {university.similar.length > 0 && (
          <DetailSection
            id="similar"
            title="Similar universities"
            description="Universities that share streams with this one."
          >
            <RelatedInstitutions
              items={university.similar.map((other) => ({
                href: `/universities/${other.slug}`,
                name: other.name,
                city: other.city,
                state: other.state,
                kind: UNIVERSITY_TYPE_LABEL[other.type],
                annualFeeRange: other.annualFeeRange,
              }))}
            />
          </DetailSection>
        )}

        {university.relatedArticles.length > 0 && (
          <DetailSection id="guides" title="Related guides">
            <ul className="divide-y divide-rule border-y border-rule">
              {university.relatedArticles.map((article) => (
                <ArticleRow key={article.slug} article={article} />
              ))}
            </ul>
          </DetailSection>
        )}
      </DetailLayout>
    </>
  )
}
