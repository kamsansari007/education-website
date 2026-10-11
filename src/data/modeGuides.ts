import type { StudyModeGuide } from '@/types/domain'

/** General editorial guidance. Pending factual review before production. */
export const modeGuides: StudyModeGuide[] = [
  {
    mode: 'regular',
    howYouStudy: 'Classes in person on campus, with labs and libraries on site.',
    schedule: 'Fixed timetable, usually full-time.',
    oftenSuits: 'Students who can study full-time and want in-person teaching and campus life.',
    exams: 'Held on campus.',
    checkBeforeApplying:
      'That the university is recognised by UGC and, for technical courses, that the programme is AICTE-approved.',
  },
  {
    mode: 'online',
    howYouStudy: 'Live and recorded classes on a learning platform. Study from anywhere.',
    schedule: 'Flexible, often with weekend live sessions.',
    oftenSuits: 'Working professionals and learners who cannot relocate.',
    exams: 'Usually online and proctored. The format varies by university.',
    checkBeforeApplying:
      'That the university is entitled to offer this programme online. Look it up on deb.ugc.ac.in.',
  },
  {
    mode: 'distance',
    howYouStudy: 'Self-study with printed or digital material, plus occasional contact classes.',
    schedule: 'Self-paced within each term.',
    oftenSuits: 'Learners who need the most flexibility and the lowest fees.',
    exams: 'Usually at designated exam centres.',
    checkBeforeApplying: 'That the programme is recognised for distance learning on deb.ugc.ac.in.',
  },
]
