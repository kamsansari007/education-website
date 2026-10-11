import { InstitutionRowsSkeleton } from '@/features/institutions/RowSkeletons'
import { UniversityRow } from '@/features/institutions/UniversityRow'
import { ListingPage } from '@/features/listing/ListingPage'
import { getUniversities } from '@/services'

const FACET_KEYS = ['state', 'type', 'mode', 'approval', 'stream', 'fee']

export function UniversitiesPage() {
  return (
    <ListingPage
      type="university"
      title="Universities"
      description="Compare universities by location, type, study mode, recognition and fees."
      metaDescription="Browse and filter universities by state, type, mode, approvals, streams and fees. Demo with fictional data."
      searchPlaceholder="University name, city or course"
      facetKeys={FACET_KEYS}
      load={getUniversities}
      skeleton={<InstitutionRowsSkeleton />}
      renderResults={(universities) => (
        <ul className="divide-y divide-rule border-y border-rule">
          {universities.map((university) => (
            <UniversityRow key={university.slug} university={university} showCompare />
          ))}
        </ul>
      )}
    />
  )
}
