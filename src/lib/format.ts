import type { FeeRange } from '@/types/dto'

const LAKH = 100_000
const CRORE = 10_000_000

const fullINR = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

const decimal = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 1 })

/** "₹45,000", "₹1.2 lakh", "₹1.5 crore" */
export function formatINR(amount: number): string {
  if (amount >= CRORE) return `₹${decimal.format(amount / CRORE)} crore`
  if (amount >= LAKH) return `₹${decimal.format(amount / LAKH)} lakh`
  return fullINR.format(amount)
}

/** "₹1.8–11.8 lakh" when both ends are in lakh, otherwise "₹45,000 – ₹1.2 lakh". */
export function formatFeeRange(range: FeeRange): string {
  if (range.min === range.max) return formatINR(range.min)
  if (range.min >= LAKH && range.max < CRORE) {
    return `₹${decimal.format(range.min / LAKH)}–${decimal.format(range.max / LAKH)} lakh`
  }
  return `${formatINR(range.min)} – ${formatINR(range.max)}`
}

export function formatYears(years: number): string {
  return `${decimal.format(years)} ${years === 1 ? 'year' : 'years'}`
}

const dateFormat = new Intl.DateTimeFormat('en-IN', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
})

/** ISO date (YYYY-MM-DD) → "24 Sept 2026" */
export function formatDate(isoDate: string): string {
  return dateFormat.format(new Date(`${isoDate}T00:00:00`))
}

const MONOGRAM_SKIP = new Set([
  'of',
  'and',
  'the',
  'for',
  'in',
  'university',
  'college',
  'institute',
])

/** Two-letter monogram from an institution name: "Deccan Lantern University" → "DL". */
export function monogram(name: string): string {
  const words = name.split(/\s+/).filter((word) => !MONOGRAM_SKIP.has(word.toLowerCase()))
  return words
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join('')
}

export function pluralise(count: number, singular: string, plural = `${singular}s`): string {
  return `${count} ${count === 1 ? singular : plural}`
}

/** "Pune, Maharashtra"; just "Chandigarh" when city and state/UT share a name. */
export function formatPlace(city: string, state: string): string {
  return city === state ? city : `${city}, ${state}`
}
