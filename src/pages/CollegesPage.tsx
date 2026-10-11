import { CollegeRow } from '@/features/institutions/CollegeRow'
import { InstitutionRowsSkeleton } from '@/features/institutions/RowSkeletons'
import { ListingPage } from '@/features/listing/ListingPage'
import { getColleges } from '@/services'

const FACET_KEYS = ['state', 'ownership', 'stream', 'university', 'approval', 'fee']

export function CollegesPage() {
  return (
    <ListingPage
      type="college"
      title="Colleges"
      description="Find colleges by location, stream and affiliated university, and compare their fees."
      metaDescription="Browse and filter colleges by state, ownership, stream, affiliated university, approvals and fees. Demo with fictional data."
      searchPlaceholder="College name, city or university"
      facetKeys={FACET_KEYS}
      load={getColleges}
      skeleton={<InstitutionRowsSkeleton count={8} dense />}
      renderResults={(colleges) => (
        <ul className="divide-y divide-rule border-y border-rule">
          {colleges.map((college) => (
            <CollegeRow key={college.slug} college={college} showCompare />
          ))}
        </ul>
      )}
    />
  )
}
