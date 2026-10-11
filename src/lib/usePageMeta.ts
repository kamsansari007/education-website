import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { SITE_NAME, siteOrigin } from './site'

interface PageMeta {
  /** Page title without the site name. Omit for the homepage. */
  title?: string
  description: string
  type?: 'website' | 'article'
}

function upsertMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }
  element.content = content
}

function upsertCanonical(href: string) {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!element) {
    element = document.createElement('link')
    element.rel = 'canonical'
    document.head.appendChild(element)
  }
  element.href = href
}

/**
 * Per-route title, description, canonical and Open Graph tags.
 * Phase 1 is a client-rendered, noindex demo (robots meta in index.html); this only lays
 * the foundation for Phase 2 SEO.
 */
export function usePageMeta({ title, description, type = 'website' }: PageMeta) {
  const { pathname } = useLocation()

  useEffect(() => {
    const fullTitle = title
      ? `${title} — ${SITE_NAME}`
      : `${SITE_NAME}: find courses, colleges and universities`
    const url = `${siteOrigin()}${pathname}`
    document.title = fullTitle
    upsertMeta('name', 'description', description)
    upsertCanonical(url)
    upsertMeta('property', 'og:title', fullTitle)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:type', type)
    upsertMeta('property', 'og:site_name', SITE_NAME)
  }, [title, description, type, pathname])
}
