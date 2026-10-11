import { formatFeeRange, formatPlace } from '@/lib/format'
import { UNIVERSITY_TYPE_LABEL, listModes } from '@/lib/labels'
import type { UniversitySummary } from '@/types/dto'

export interface ComparisonAttribute<T> {
  group: string
  label: string
  value: (item: T) => string
}

const NOT_AVAILABLE = 'Not available'

/** Attributes compared for universities (PRD §12). */
export const UNIVERSITY_ATTRIBUTES: ComparisonAttribute<UniversitySummary>[] = [
  { group: 'Basics', label: 'Location', value: (u) => formatPlace(u.city, u.state) },
  { group: 'Basics', label: 'Type', value: (u) => UNIVERSITY_TYPE_LABEL[u.type] },
  { group: 'Basics', label: 'Established', value: (u) => String(u.established) },
  { group: 'Study options', label: 'Modes', value: (u) => listModes(u.modes) || NOT_AVAILABLE },
  { group: 'Study options', label: 'Courses offered', value: (u) => String(u.courseCount) },
  {
    group: 'Fees',
    label: 'Fees per year',
    value: (u) => (u.annualFeeRange ? formatFeeRange(u.annualFeeRange) : NOT_AVAILABLE),
  },
  {
    group: 'Recognition',
    label: 'Approvals',
    value: (u) => u.approvals.map((a) => a.label).join(', ') || 'None listed',
  },
]
