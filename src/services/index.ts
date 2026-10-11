/**
 * Public data-access API for the UI.
 * Phase 1 re-exports the static implementation; Phase 2 swaps this for an API client
 * with the same signatures.
 */
export {
  getApprovals,
  getCatalogStats,
  getHomeHighlights,
  getPopularSearches,
  getStreams,
  getStudyModeGuides,
} from './static/catalog'
export { getColleges, getCourses, getUniversities } from './static/discovery'
export { getCollegeBySlug, getUniversityBySlug } from './static/detail'
export { submitEnquiry } from './static/enquiry'
