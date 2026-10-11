import { Building2, MonitorPlay, Package, type LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Section } from '@/components/layout/Section'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { LoadError, LoadingStatus, SkeletonRows } from '@/components/ui/QueryStates'
import { MODE_LABEL } from '@/lib/labels'
import { useServiceQuery } from '@/lib/useServiceQuery'
import { getStudyModeGuides } from '@/services'
import type { StudyModeGuide } from '@/types/dto'

const ROWS: { key: keyof Omit<StudyModeGuide, 'mode' | 'checkBeforeApplying'>; label: string }[] = [
  { key: 'howYouStudy', label: 'How you study' },
  { key: 'schedule', label: 'Schedule' },
  { key: 'oftenSuits', label: 'Often suits' },
  { key: 'exams', label: 'Exams' },
]

const GLYPH: Record<StudyModeGuide['mode'], LucideIcon> = {
  regular: Building2,
  online: MonitorPlay,
  distance: Package,
}

/**
 * Q: "What options are available?" Three panels; the same labelled rows line up across them
 * (CSS subgrid), so they still compare like a table.
 */
export function StudyModesSection() {
  const guides = useServiceQuery('mode-guides', getStudyModeGuides)

  return (
    <Section labelledBy="modes-title" spacing="feature">
      <SectionHeading
        id="modes-title"
        size="section"
        title="Three ways to travel"
        description="The same degree can often be studied on campus, online or by distance. Here is what changes."
      />
      {guides.status === 'loading' && (
        <>
          <LoadingStatus label="Loading study modes" />
          <SkeletonRows count={3} />
        </>
      )}
      {guides.status === 'error' && (
        <LoadError message="Study modes couldn’t be loaded." onRetry={guides.retry} />
      )}
      {guides.status === 'success' && (
        <>
          <ul className="grid gap-5 md:grid-cols-3 md:grid-rows-[repeat(7,auto)] md:gap-y-0">
            {guides.data.map((guide) => {
              const Glyph = GLYPH[guide.mode]
              return (
                <li
                  key={guide.mode}
                  className="grid min-w-0 rounded-card bg-paper-peri p-6 md:row-span-7 md:grid-rows-subgrid lg:p-8"
                >
                  <div className="flex flex-wrap-reverse items-start justify-between gap-3 pb-5">
                    <h3 className="text-3xl leading-none font-bold tracking-tight [font-stretch:112.5%]">
                      {MODE_LABEL[guide.mode]}
                    </h3>
                    <span className="grid size-14 place-items-center rounded-full bg-surface text-body">
                      <Glyph aria-hidden="true" className="size-7" strokeWidth={1.75} />
                    </span>
                  </div>
                  <dl className="contents">
                    {ROWS.map((row) => (
                      <div key={row.key} className="border-t border-body/15 py-3">
                        <dt className="type-meta">{row.label}</dt>
                        <dd className="mt-0.5">{guide[row.key]}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className="type-small mt-3 rounded-2xl bg-paper-mint p-4">
                    <span className="font-bold">Check before you apply: </span>
                    {guide.checkBeforeApplying}
                  </p>
                  <Link
                    to={`/courses?mode=${guide.mode}`}
                    className="mt-4 inline-flex min-h-11 items-center self-end font-semibold text-ink underline"
                  >
                    See {MODE_LABEL[guide.mode].toLowerCase()} courses
                  </Link>
                </li>
              )
            })}
          </ul>
          <p className="type-caption mt-5">
            General guidance. Rules differ by university and programme, so always confirm with
            official sources.
          </p>
        </>
      )}
    </Section>
  )
}
