import type { CourseLevel, Ownership, StudyMode, UniversityType } from '@/types/domain'

export const MODE_LABEL: Record<StudyMode, string> = {
  regular: 'Regular',
  online: 'Online',
  distance: 'Distance',
}

export const LEVEL_LABEL: Record<CourseLevel, string> = {
  ug: 'Undergraduate',
  pg: 'Postgraduate',
  diploma: 'Diploma',
  certificate: 'Certificate',
  doctorate: 'Doctorate',
}

export const LEVEL_SHORT_LABEL: Record<CourseLevel, string> = {
  ug: 'UG',
  pg: 'PG',
  diploma: 'Diploma',
  certificate: 'Certificate',
  doctorate: 'Doctorate',
}

export const UNIVERSITY_TYPE_LABEL: Record<UniversityType, string> = {
  central: 'Central university',
  state: 'State university',
  private: 'Private university',
  deemed: 'Deemed university',
}

export const OWNERSHIP_LABEL: Record<Ownership, string> = {
  government: 'Government college',
  private: 'Private college',
}

export function listModes(modes: StudyMode[]): string {
  return modes.map((mode) => MODE_LABEL[mode]).join(', ')
}
