import { Section } from '@/components/layout/Section'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { ButtonLink } from '@/components/ui/Button'
import { SampleDataLabel } from '@/components/ui/SampleDataLabel'
import { ComparisonSheet } from '@/features/compare/ComparisonSheet'
import { UNIVERSITY_ATTRIBUTES } from '@/features/compare/universityAttributes'
import type { UniversitySummary } from '@/types/dto'

/** Q: "Can I compare them?" The annotated comparison sheet, with real comparison data. */
export function ComparePreviewSection({ universities }: { universities: UniversitySummary[] }) {
  return (
    <Section labelledBy="compare-title" tone="tint" spacing="feature">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:items-start lg:gap-14">
        <div>
          <SectionHeading
            id="compare-title"
            size="section"
            title="Mark up the difference"
            description="Two sample universities on one sheet. What differs is highlighted, so you can see what actually separates them."
            meta={<SampleDataLabel />}
          />
          <ButtonLink to="/universities">Start your own comparison</ButtonLink>
        </div>
        <ComparisonSheet
          items={universities}
          attributes={UNIVERSITY_ATTRIBUTES}
          caption="Comparison of two sample universities"
        />
      </div>
    </Section>
  )
}
