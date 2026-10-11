/**
 * Editorial choices for the homepage. References entities by ID only.
 * In Phase 3 this becomes admin-managed content.
 */
export const homeCuration = {
  courseIds: ['crs-mba', 'crs-bca', 'crs-btech-cse', 'crs-bcom', 'crs-bsc-nursing', 'crs-bdes'],
  universityIds: ['uni-deccan-lantern', 'uni-indus-meadow', 'uni-aravalli-crest'],
  collegeIds: ['col-lanternfield', 'col-kolong-riverlight', 'col-halcyon-grove'],
  comparePreviewUniversityIds: ['uni-chamundi-ridge', 'uni-indus-meadow'],
  featuredArticleId: 'art-modes',
  /** Illustrative undergraduate → postgraduate paths for the homepage route map. */
  routes: [
    ['crs-bba', 'crs-mba'],
    ['crs-bca', 'crs-mca'],
    ['crs-bsc-nursing', 'crs-msc-nursing'],
    ['crs-ba-english', 'crs-ma-english'],
    ['crs-bdes', 'crs-mdes'],
  ] as [string, string][],
  popularSearches: ['Online MBA', 'BCA', 'B.Com', 'Nursing', 'Law'],
}
