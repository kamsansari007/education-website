import { Link } from 'react-router-dom'
import { Section } from '@/components/layout/Section'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { SampleDataLabel } from '@/components/ui/SampleDataLabel'
import { Tabs } from '@/components/ui/Tabs'
import { CourseCard } from '@/features/courses/CourseCard'
import { InstitutionCard } from '@/features/institutions/InstitutionCard'
import { formatFeeRange } from '@/lib/format'
import { OWNERSHIP_LABEL, UNIVERSITY_TYPE_LABEL } from '@/lib/labels'
import type { FeeRange, HomeHighlights } from '@/types/dto'

const fees = (range: FeeRange | null) => (range ? formatFeeRange(range) : 'Not available')

function SeeAll({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      className="mt-8 inline-flex min-h-11 items-center font-semibold text-ink underline"
    >
      {label}
    </Link>
  )
}

/**
 * Q: "Where can I study it?" Invite-register teaser cards on the homepage only; the listings
 * keep their evaluation rows.
 */
export function ExploreSection({ highlights }: { highlights: HomeHighlights }) {
  return (
    <Section labelledBy="explore-title" tone="surface" spacing="feature">
      <SectionHeading
        id="explore-title"
        size="section"
        title="Courses and where to study them"
        description="Fees, modes and the number of institutions come from what each one actually offers."
        meta={<SampleDataLabel />}
      />
      <Tabs
        label="Browse by"
        items={[
          {
            id: 'courses',
            label: 'Courses',
            content: (
              <div className="pt-8">
                <ul className="grid gap-5 sm:grid-cols-[repeat(2,minmax(0,1fr))] lg:grid-cols-[repeat(3,minmax(0,1fr))]">
                  {highlights.courses.map((course, index) => (
                    // Four cards on phones, six from tablet up.
                    <li
                      key={course.slug}
                      className={index >= 4 ? 'hidden min-w-0 sm:block' : 'min-w-0'}
                    >
                      <CourseCard course={course} className="h-full" />
                    </li>
                  ))}
                </ul>
                <SeeAll to="/courses" label="See all courses" />
              </div>
            ),
          },
          {
            id: 'universities',
            label: 'Universities',
            content: (
              <div className="pt-8">
                <ul className="grid gap-5 md:grid-cols-[repeat(3,minmax(0,1fr))]">
                  {highlights.universities.map((university) => (
                    <li key={university.slug} className="min-w-0">
                      <InstitutionCard
                        href={`/universities/${university.slug}`}
                        name={university.name}
                        city={university.city}
                        state={university.state}
                        kindLabel={UNIVERSITY_TYPE_LABEL[university.type]}
                        facts={[
                          { label: 'Courses', value: String(university.courseCount) },
                          { label: 'Fees per year', value: fees(university.annualFeeRange) },
                        ]}
                      />
                    </li>
                  ))}
                </ul>
                <SeeAll to="/universities" label="See all universities" />
              </div>
            ),
          },
          {
            id: 'colleges',
            label: 'Colleges',
            content: (
              <div className="pt-8">
                <ul className="grid gap-5 md:grid-cols-[repeat(3,minmax(0,1fr))]">
                  {highlights.colleges.map((college) => (
                    <li key={college.slug} className="min-w-0">
                      <InstitutionCard
                        href={`/colleges/${college.slug}`}
                        name={college.name}
                        city={college.city}
                        state={college.state}
                        kindLabel={OWNERSHIP_LABEL[college.ownership]}
                        facts={[
                          { label: 'Streams', value: college.streams.join(', ') },
                          { label: 'Fees per year', value: fees(college.annualFeeRange) },
                        ]}
                      />
                    </li>
                  ))}
                </ul>
                <SeeAll to="/colleges" label="See all colleges" />
              </div>
            ),
          },
        ]}
      />
    </Section>
  )
}
