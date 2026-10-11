import { ClipboardList, DraftingCompass, University, type LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Section } from '@/components/layout/Section'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { LoadError, LoadingStatus, SkeletonRows } from '@/components/ui/QueryStates'
import { useServiceQuery } from '@/lib/useServiceQuery'
import { getApprovals } from '@/services'

/** What each body looks at, phrased as the question a family should ask. */
const BODY: Record<string, { question: string; glyph: LucideIcon }> = {
  UGC: { question: 'Is the university recognised?', glyph: University },
  AICTE: { question: 'Is the technical programme approved?', glyph: DraftingCompass },
  NAAC: { question: 'How has the institution been assessed?', glyph: ClipboardList },
}

/**
 * Q: "Can I trust the information?" Three checkpoints on a line. It explains what each body
 * does and where to confirm it; it never claims this platform verified anything. The line is
 * decorative and all meaning is in text.
 */
export function TrustSection() {
  const approvals = useServiceQuery('approvals', getApprovals)

  return (
    <Section labelledBy="trust-title" spacing="feature">
      <SectionHeading
        id="trust-title"
        size="section"
        title="Three checkpoints before you apply"
        description="What UGC, AICTE and NAAC each look at, and where you can confirm it yourself."
      />
      {approvals.status === 'loading' && (
        <>
          <LoadingStatus label="Loading approvals" />
          <SkeletonRows count={3} />
        </>
      )}
      {approvals.status === 'error' && (
        <LoadError message="Approvals couldn’t be loaded." onRetry={approvals.retry} />
      )}
      {approvals.status === 'success' && (
        <div className="relative">
          <span
            aria-hidden="true"
            className="absolute top-7 bottom-7 left-[1.625rem] w-1.5 rounded-full bg-ink-900 md:top-[1.5625rem] md:right-[16.66%] md:bottom-auto md:left-[16.66%] md:h-1.5 md:w-auto"
          />
          <ol className="relative grid gap-6 md:grid-cols-[repeat(3,minmax(0,1fr))]">
            {approvals.data.map((approval) => {
              const body = BODY[approval.code]
              const Glyph = body?.glyph ?? University
              return (
                <li key={approval.code} className="flex min-w-0 gap-4 md:flex-col md:items-center">
                  <span className="grid size-14 shrink-0 place-items-center rounded-full border-[5px] border-ink-900 bg-surface text-body">
                    <Glyph aria-hidden="true" className="size-6" strokeWidth={2} />
                  </span>
                  <div className="min-w-0 flex-1 rounded-card bg-paper-mint p-6 [overflow-wrap:anywhere] md:w-full">
                    <p className="type-small font-semibold">{body?.question}</p>
                    <h3 className="mt-1 text-4xl leading-none font-bold [font-stretch:112.5%]">
                      {approval.code}
                    </h3>
                    <p className="type-small mt-1 text-muted">{approval.name}</p>
                    <p className="mt-3">{approval.summary}</p>
                    <p className="type-small mt-3">
                      <span className="font-bold">Where to check: </span>
                      {approval.howToCheck}
                    </p>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      )}
      <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between lg:mt-12">
        <p className="max-w-measure">
          <span className="font-bold">This demo doesn’t verify any institution.</span> Every
          institution, fee and approval in it is fictional. In the live service, facts will show
          where they came from and when they were last checked.
        </p>
        <Link
          to="/articles/what-ugc-aicte-and-naac-mean"
          className="inline-flex min-h-11 shrink-0 items-center font-semibold text-ink underline"
        >
          Read the guide to approvals
        </Link>
      </div>
    </Section>
  )
}
