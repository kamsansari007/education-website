import { motion, useReducedMotion } from 'motion/react'
import { Link } from 'react-router-dom'
import { Section } from '@/components/layout/Section'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { LoadError, LoadingStatus, SkeletonRows } from '@/components/ui/QueryStates'
import { STREAM_LINES } from '@/lib/streamLines'
import { useServiceQuery } from '@/lib/useServiceQuery'
import { getCourses, getStreams } from '@/services'

/**
 * Q: "What should I study?" The whole catalogue as parallel lines (DESIGN-DIRECTION.md §8.2):
 * each stream family is a coloured line, each course a stop. Stream names link to the course
 * listing filtered by stream; stops link to courses.
 */
export function LineIndexSection() {
  const reduced = useReducedMotion()
  const query = useServiceQuery('line-index', async () => {
    const [streams, courses] = await Promise.all([
      getStreams(),
      getCourses({ pageSize: 100, sort: 'name' }),
    ])
    return { streams, courses: courses.items }
  })

  return (
    <Section labelledBy="lines-title" tone="surface" spacing="feature">
      <SectionHeading
        id="lines-title"
        size="section"
        title="Not sure yet? Pick a line"
        description="Streams are grouped into lines. Every course is a stop: start from a field you like and see what’s on it."
      />
      {query.status === 'loading' && (
        <>
          <LoadingStatus label="Loading streams and courses" />
          <SkeletonRows count={3} />
        </>
      )}
      {query.status === 'error' && (
        <LoadError message="Streams couldn’t be loaded." onRetry={query.retry} />
      )}
      {query.status === 'success' && (
        <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
          {STREAM_LINES.map((line, lineIndex) => {
            const lineStreams = line.streams
              .map((slug) => query.data.streams.find((stream) => stream.slug === slug))
              .filter((stream) => stream !== undefined)
            const stops = query.data.courses.filter((course) =>
              line.streams.includes(course.streamSlug),
            )
            return (
              <li key={line.id} className="min-w-0">
                <div className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 size-5 shrink-0 rounded-full border-[5px] bg-surface"
                    style={{ borderColor: line.color }}
                  />
                  <h3 className="type-h3 [font-stretch:112.5%]">
                    {lineStreams.map((stream, index) => (
                      <span key={stream.slug}>
                        {index > 0 && (index === lineStreams.length - 1 ? ' and ' : ', ')}
                        <Link
                          to={`/courses?stream=${stream.slug}`}
                          className="hover:text-ink hover:underline"
                        >
                          {stream.name}
                        </Link>
                      </span>
                    ))}
                  </h3>
                </div>
                <div className="relative mt-4 pl-[0.5625rem]">
                  {/* The line draws down once when it scrolls into view. */}
                  <motion.span
                    aria-hidden="true"
                    className="absolute top-0 bottom-5 left-[0.4375rem] w-1.5 origin-top rounded-full"
                    style={{ background: line.color }}
                    initial={reduced ? false : { scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{
                      duration: 0.8,
                      delay: lineIndex * 0.06,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  />
                  <ul className="relative space-y-0.5">
                    {stops.map((course) => (
                      <li key={course.slug}>
                        <Link
                          to={`/courses/${course.slug}`}
                          className="group -ml-[0.5625rem] flex min-h-11 items-center gap-3 rounded-full py-1 pr-3 font-semibold hover:bg-paper"
                        >
                          <span
                            aria-hidden="true"
                            className="size-6 shrink-0 rounded-full border-[5px] bg-surface transition-transform duration-150 group-hover:scale-110"
                            style={{ borderColor: line.color }}
                          />
                          <span className="min-w-0 [overflow-wrap:anywhere]">
                            {course.shortName}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </Section>
  )
}
