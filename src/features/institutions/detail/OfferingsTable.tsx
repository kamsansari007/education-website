import { MessageCircleQuestion } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEnquiry } from '@/features/enquiry/enquiryContext'
import { formatINR, formatYears } from '@/lib/format'
import { LEVEL_LABEL, MODE_LABEL } from '@/lib/labels'
import type { EnquiryContext, OfferingRow } from '@/types/dto'

function AskButton({
  row,
  institution,
  source,
}: {
  row: OfferingRow
  institution: string
  source: EnquiryContext['source']
}) {
  const enquiry = useEnquiry()
  const interest = `${row.course.shortName} (${MODE_LABEL[row.mode]}) at ${institution}`
  return (
    <button
      type="button"
      aria-haspopup="dialog"
      onClick={() => enquiry.open({ interest, source })}
      className="inline-flex min-h-11 items-center gap-1.5 font-semibold whitespace-nowrap text-ink underline decoration-transparent hover:decoration-current"
    >
      <MessageCircleQuestion aria-hidden="true" className="size-4" strokeWidth={1.75} />
      Ask<span className="sr-only"> about {interest}</span>
    </button>
  )
}

/**
 * Courses and fees from this institution's offerings. A real table from 768px (it scrolls
 * inside its own container if it must); stacked rows on phones.
 */
export function OfferingsTable({
  rows,
  institution,
  source,
}: {
  rows: OfferingRow[]
  institution: string
  source: EnquiryContext['source']
}) {
  return (
    <>
      <div
        className="hidden overflow-x-auto md:block"
        tabIndex={0}
        role="region"
        aria-label="Courses and fees table"
      >
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">
            Courses at {institution}, with study mode, duration and fees
          </caption>
          <thead>
            <tr className="border-b-2 border-body">
              <th scope="col" className="type-meta py-2 pr-4 font-semibold">
                Course
              </th>
              <th scope="col" className="type-meta py-2 pr-4 font-semibold">
                Mode
              </th>
              <th scope="col" className="type-meta py-2 pr-4 font-semibold">
                Duration
              </th>
              <th scope="col" className="type-meta py-2 pr-4 text-right font-semibold">
                Fee per year
              </th>
              <th scope="col" className="type-meta py-2 pr-4 text-right font-semibold">
                Total fee
              </th>
              <th scope="col" className="py-2">
                <span className="sr-only">Enquire</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={`${row.course.slug}-${row.mode}`} className="border-b border-rule align-top">
                <th scope="row" className="py-3 pr-4 font-normal">
                  <Link
                    to={`/courses/${row.course.slug}`}
                    className="font-semibold text-body hover:text-ink hover:underline"
                  >
                    {row.course.shortName}
                  </Link>
                  <span className="type-small block text-muted">
                    {LEVEL_LABEL[row.course.level]} · {row.course.streamName}
                  </span>
                </th>
                <td className="py-3 pr-4">{MODE_LABEL[row.mode]}</td>
                <td className="py-3 pr-4 tabular-nums">{formatYears(row.durationYears)}</td>
                <td className="py-3 pr-4 text-right font-semibold tabular-nums">
                  {formatINR(row.annualFee)}
                </td>
                <td className="py-3 pr-4 text-right tabular-nums">{formatINR(row.totalFee)}</td>
                <td className="py-1.5 text-right">
                  <AskButton row={row} institution={institution} source={source} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="divide-y divide-rule border-y border-rule md:hidden">
        {rows.map((row) => (
          <li key={`${row.course.slug}-${row.mode}`} className="py-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="font-semibold">
                  <Link
                    to={`/courses/${row.course.slug}`}
                    className="text-body hover:text-ink hover:underline"
                  >
                    {row.course.shortName}
                  </Link>
                </h3>
                <p className="type-small text-muted">
                  {LEVEL_LABEL[row.course.level]} · {MODE_LABEL[row.mode]} ·{' '}
                  {formatYears(row.durationYears)}
                </p>
              </div>
              <AskButton row={row} institution={institution} source={source} />
            </div>
            <dl className="mt-2 flex flex-wrap gap-x-6 gap-y-1">
              <div className="flex gap-2">
                <dt className="type-meta">Per year</dt>
                <dd className="type-small font-semibold tabular-nums">
                  {formatINR(row.annualFee)}
                </dd>
              </div>
              <div className="flex gap-2">
                <dt className="type-meta">Total</dt>
                <dd className="type-small font-medium tabular-nums">{formatINR(row.totalFee)}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>
    </>
  )
}
