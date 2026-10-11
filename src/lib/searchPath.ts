import type { To } from 'react-router-dom'

/**
 * Builds the search route for a query. The pathname is fixed and the query is encoded,
 * so user input can never become a navigation target (mitigates the react-router 6.x
 * open-redirect advisory GHSA-wrjc-x8rr-h8h6).
 */
export function searchPath(query: string): To {
  return { pathname: '/search', search: `?${new URLSearchParams({ q: query.trim() }).toString()}` }
}
