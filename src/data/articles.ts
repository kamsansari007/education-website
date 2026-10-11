import type { Article, ArticleCategory } from '@/types/domain'

export const articleCategories: ArticleCategory[] = [
  { id: 'cat-choosing', slug: 'choosing-a-course', name: 'Choosing a course' },
  { id: 'cat-admissions', slug: 'admissions', name: 'Admissions' },
  { id: 'cat-online', slug: 'online-learning', name: 'Online learning' },
]

/** Sample articles. Author and dates are demo values. */
export const articles: Article[] = [
  {
    id: 'art-modes',
    slug: 'regular-online-or-distance-how-to-choose',
    title: 'Regular, online or distance: how to choose',
    excerpt:
      'The same degree can be studied in three very different ways. Here is what changes, and the questions that help you decide.',
    categoryId: 'cat-choosing',
    authorName: 'Sample editorial team',
    publishedOn: '2026-09-24',
    readingMinutes: 7,
    relatedCourseIds: ['crs-mba', 'crs-bca', 'crs-bcom'],
    body: [
      {
        type: 'paragraph',
        text: 'Mode decides how you learn, how much time you need each week and, often, how much you pay.',
      },
      { type: 'heading', text: 'Start with your week, not the brochure' },
      {
        type: 'paragraph',
        text: 'Count the hours you can give to study. Full-time campus study and a full-time job rarely fit together.',
      },
    ],
  },
  {
    id: 'art-approvals',
    slug: 'what-ugc-aicte-and-naac-mean',
    title: 'What UGC, AICTE and NAAC mean when you shortlist',
    excerpt:
      'Three bodies, three different jobs. A plain-language guide to recognition, approval and accreditation, and how to check each yourself.',
    categoryId: 'cat-admissions',
    authorName: 'Sample editorial team',
    publishedOn: '2026-09-15',
    readingMinutes: 6,
    relatedCourseIds: ['crs-btech-cse', 'crs-mba'],
    body: [
      {
        type: 'paragraph',
        text: 'Recognition, approval and accreditation answer different questions. It helps to know which is which.',
      },
    ],
  },
  {
    id: 'art-bca-bsc',
    slug: 'bca-or-bsc-data-science',
    title: 'BCA or B.Sc Data Science: how they differ',
    excerpt:
      'Both lead into technology careers, but they teach different things. Compare the subjects, eligibility and what comes after.',
    categoryId: 'cat-choosing',
    authorName: 'Sample editorial team',
    publishedOn: '2026-09-02',
    readingMinutes: 5,
    relatedCourseIds: ['crs-bca', 'crs-bsc-data-science'],
    body: [
      {
        type: 'paragraph',
        text: 'BCA leans towards building software. Data science leans towards statistics.',
      },
    ],
  },
  {
    id: 'art-before-you-pay',
    slug: 'questions-to-ask-before-you-pay',
    title: 'Questions to ask before you pay an admission fee',
    excerpt:
      'Refund rules, what the fee includes and how payments are spread. A short checklist for students and parents.',
    categoryId: 'cat-admissions',
    authorName: 'Sample editorial team',
    publishedOn: '2026-08-20',
    readingMinutes: 4,
    relatedCourseIds: [],
    body: [
      {
        type: 'list',
        ordered: false,
        items: [
          'What does the fee include?',
          'What is the refund policy?',
          'Are there other charges?',
        ],
      },
    ],
  },
  {
    id: 'art-online-mba',
    slug: 'planning-an-online-mba-while-working',
    title: 'Planning an online MBA while you work',
    excerpt:
      'How much time it really takes each week, how exams usually work, and how to talk to your employer about it.',
    categoryId: 'cat-online',
    authorName: 'Sample editorial team',
    publishedOn: '2026-08-06',
    readingMinutes: 6,
    relatedCourseIds: ['crs-mba'],
    body: [
      {
        type: 'paragraph',
        text: 'Most online MBA learners study in the evenings and at weekends.',
      },
    ],
  },
]
