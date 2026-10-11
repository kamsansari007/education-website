import { motion, useReducedMotion } from 'motion/react'
import { Link } from 'react-router-dom'
import { streamColor } from '@/lib/streamLines'
import type { CourseRoute } from '@/types/dto'

const W = 600
const H = 440
const ORIGIN = { x: 44, y: 220 }
const UG_X = 300
const PG_X = 548
const EASE = [0.22, 1, 0.36, 1] as const

const pct = (value: number, total: number) => `${(value / total) * 100}%`
const rowY = (index: number, count: number) => 62 + (index * (H - 124)) / Math.max(1, count - 1)

/**
 * Hero route map (DESIGN-DIRECTION.md §8.1): illustrative paths from "After Class 12" through
 * an undergraduate course to a related postgraduate one, one coloured line per stream. The
 * stations are real links. Lines draw once; under reduced motion they render complete.
 */
export function RouteMap({ routes }: { routes: CourseRoute[] }) {
  const reduced = useReducedMotion()
  const rows = routes.map((route, index) => ({
    route,
    y: rowY(index, routes.length),
    color: streamColor(route.from.streamSlug),
  }))

  return (
    <div className="relative aspect-[600/440] w-full">
      <svg
        aria-hidden="true"
        viewBox={`0 0 ${W} ${H}`}
        className="absolute inset-0 size-full overflow-visible"
      >
        {rows.map(({ route, y, color }, index) => (
          <motion.path
            key={route.from.slug}
            d={`M${ORIGIN.x} ${ORIGIN.y} C ${ORIGIN.x + 120} ${ORIGIN.y}, ${UG_X - 140} ${y}, ${UG_X} ${y} L ${PG_X} ${y}`}
            fill="none"
            stroke={color}
            strokeWidth={8}
            strokeLinecap="round"
            initial={reduced ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.1, delay: 0.3 + index * 0.08, ease: EASE }}
          />
        ))}
        {rows.flatMap(({ route, y, color }, index) =>
          [UG_X, PG_X].map((x, stop) => (
            <motion.circle
              key={`${route.from.slug}-${stop}`}
              cx={x}
              cy={y}
              r={10}
              fill="#fff"
              stroke={color}
              strokeWidth={5}
              initial={reduced ? false : { scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: 'spring',
                stiffness: 380,
                damping: 22,
                delay: 0.9 + index * 0.08 + stop * 0.2,
              }}
              style={{ transformOrigin: `${x}px ${y}px` }}
            />
          )),
        )}
        <circle
          cx={ORIGIN.x}
          cy={ORIGIN.y}
          r={18}
          className="fill-highlight stroke-ink-900"
          strokeWidth={5}
        />
      </svg>

      <p
        className="absolute text-sm font-semibold text-highlight"
        style={{
          left: pct(ORIGIN.x, W),
          top: pct(ORIGIN.y + 30, H),
          transform: 'translateX(-30%)',
        }}
      >
        After Class 12
      </p>
      <p
        aria-hidden="true"
        className="absolute text-sm font-semibold text-on-ink-muted"
        style={{ left: pct(UG_X, W), top: 0, transform: 'translate(-50%, -150%)' }}
      >
        Undergraduate
      </p>
      <p
        aria-hidden="true"
        className="absolute text-sm font-semibold text-on-ink-muted"
        style={{ left: pct(PG_X, W), top: 0, transform: 'translate(-70%, -150%)' }}
      >
        Postgraduate
      </p>

      <ul aria-label="Example paths by stream">
        {rows.map(({ route, y }, index) => (
          <motion.li
            key={route.from.slug}
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35, delay: 1 + index * 0.08 }}
          >
            <span className="sr-only">{route.from.streamName}: </span>
            {[route.from, route.to].map((course, stop) => (
              <Link
                key={course.slug}
                to={`/courses/${course.slug}`}
                className="absolute inline-flex min-h-8 items-center rounded-full bg-surface px-3 text-sm font-semibold whitespace-nowrap text-body shadow-sm transition-transform duration-150 hover:-translate-y-0.5"
                style={{
                  left: pct(stop === 0 ? UG_X : PG_X, W),
                  top: pct(y, H),
                  transform: `translate(${stop === 0 ? '-50%' : '-82%'}, -150%)`,
                }}
              >
                {course.shortName}
                {stop === 0 && <span className="sr-only">, then</span>}
              </Link>
            ))}
          </motion.li>
        ))}
      </ul>
    </div>
  )
}

/** Below 768px: the same paths as simple coloured rows. */
export function RouteList({ routes }: { routes: CourseRoute[] }) {
  const reduced = useReducedMotion()
  return (
    <div>
      <p
        aria-hidden="true"
        className="mb-3 flex justify-between text-sm font-semibold text-on-ink-muted"
      >
        <span>After Class 12</span>
        <span>Then</span>
      </p>
      <ul aria-label="Example paths by stream" className="space-y-3">
        {routes.map((route, index) => {
          const color = streamColor(route.from.streamSlug)
          return (
            <li key={route.from.slug} className="flex flex-wrap items-center gap-2">
              <span className="sr-only">{route.from.streamName}: </span>
              <span aria-hidden="true" className="size-3.5 shrink-0 rounded-full bg-highlight" />
              <motion.span
                aria-hidden="true"
                className="h-1.5 w-5 origin-left rounded-full"
                style={{ background: color }}
                initial={reduced ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.08 }}
              />
              <Link
                to={`/courses/${route.from.slug}`}
                className="inline-flex min-h-11 items-center rounded-full bg-surface px-3 text-sm font-semibold text-body"
              >
                {route.from.shortName}
                <span className="sr-only">, then</span>
              </Link>
              <span
                aria-hidden="true"
                className="h-1.5 min-w-4 flex-1 rounded-full"
                style={{ background: color }}
              />
              <Link
                to={`/courses/${route.to.slug}`}
                className="inline-flex min-h-11 items-center rounded-full bg-surface px-3 text-sm font-semibold text-body"
              >
                {route.to.shortName}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
