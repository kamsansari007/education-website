import type { Approval } from '@/types/domain'

/**
 * General descriptions of real Indian regulatory and accreditation bodies.
 * Pending factual review (DESIGN-DIRECTION.md §19.3). Holdings assigned to
 * institutions in this demo are fictional.
 */
export const approvals: Approval[] = [
  {
    id: 'apr-ugc',
    code: 'UGC',
    name: 'University Grants Commission',
    summary:
      'The statutory body that recognises universities in India. A degree is only valid if the university that awards it is recognised.',
    howToCheck:
      'Find the university in the lists published on ugc.gov.in. For online and distance programmes, also check deb.ugc.ac.in.',
  },
  {
    id: 'apr-aicte',
    code: 'AICTE',
    name: 'All India Council for Technical Education',
    summary:
      'Approves institutions and programmes in technical education, such as engineering, technology and management.',
    howToCheck: 'Search for the institution and programme in the approved list on aicte-india.org.',
  },
  {
    id: 'apr-naac',
    code: 'NAAC',
    name: 'National Assessment and Accreditation Council',
    summary:
      'Assesses and accredits higher education institutions on teaching, research, infrastructure and governance.',
    howToCheck:
      'Look up the institution on naac.gov.in. Accreditation is valid for a fixed period, so check that it is current.',
  },
]
