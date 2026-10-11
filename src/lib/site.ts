const env = import.meta.env

export const SITE_NAME: string = env.VITE_SITE_NAME?.trim() || 'Your brand'

/** Public origin for canonical and Open Graph URLs. Falls back to the current origin. */
export function siteOrigin(): string {
  const configured = env.VITE_SITE_URL?.trim().replace(/\/$/, '')
  return configured || window.location.origin
}

const WHATSAPP_NUMBER: string = (env.VITE_WHATSAPP_NUMBER ?? '').replace(/\D/g, '')

/**
 * WhatsApp deep link with a pre-filled message.
 * Without a configured number, wa.me opens WhatsApp's share screen rather than
 * messaging an arbitrary placeholder number.
 */
export function whatsappHref(message: string): string {
  const text = encodeURIComponent(message)
  return WHATSAPP_NUMBER
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`
    : `https://wa.me/?text=${text}`
}
