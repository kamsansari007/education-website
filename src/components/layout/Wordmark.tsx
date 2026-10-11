import { Link } from 'react-router-dom'
import { SITE_NAME } from '@/lib/site'

/** Placeholder wordmark until the brand is confirmed (BRD §13). */
export function Wordmark() {
  return (
    <Link
      to="/"
      className="min-w-0 truncate py-2.5 text-xl leading-6 font-bold tracking-tight whitespace-nowrap text-white [font-stretch:112.5%]"
    >
      {SITE_NAME}
      <span className="sr-only">, home</span>
    </Link>
  )
}
