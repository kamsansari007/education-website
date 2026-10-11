import type { ReactNode } from 'react'
import { PageContainer } from '@/components/layout/PageContainer'
import type { EnquiryContext } from '@/types/dto'
import { DetailActionBar, GuidancePanel } from './GuidancePanel'
import { SectionNav, type NavSection } from './SectionNav'

/**
 * Body of a detail page: key facts, section nav and sections in the main column; the
 * guidance panel beside it from 1024px, or the bottom action bar below that.
 */
export function DetailLayout({
  name,
  enquiry,
  keyFacts,
  sections,
  children,
}: {
  name: string
  enquiry: EnquiryContext
  keyFacts: ReactNode
  sections: NavSection[]
  children: ReactNode
}) {
  return (
    <>
      <PageContainer className="pt-6 pb-16 lg:grid lg:grid-cols-[minmax(0,1fr)_19rem] lg:items-start lg:gap-12 lg:pt-8 lg:pb-20 xl:gap-16">
        <div className="min-w-0">
          {keyFacts}
          {/* A direct child of the column, so it can stay stuck for the column's full height. */}
          <SectionNav sections={sections} className="mt-6 lg:mt-8" />
          <div className="mt-8 space-y-12 lg:space-y-16">{children}</div>
        </div>
        <GuidancePanel name={name} context={enquiry} />
      </PageContainer>
      <DetailActionBar name={name} context={enquiry} />
    </>
  )
}
