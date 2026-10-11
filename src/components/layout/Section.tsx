import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { PageContainer } from './PageContainer'

export type SectionTone = 'plain' | 'surface' | 'tint' | 'night'

/** Surfaces (DESIGN-DIRECTION.md §4.2). `on-ink` switches focus rings to signal yellow. */
const TONE: Record<SectionTone, string> = {
  plain: '',
  surface: 'bg-surface',
  tint: 'bg-ink-50',
  night: 'on-ink bg-ink-900 text-white',
}

const SPACING = {
  compact: 'py-12 md:py-14 lg:py-16',
  default: 'py-12 md:py-16 lg:py-20',
  feature: 'py-20 md:py-24 lg:py-28',
} as const

interface SectionProps {
  /** id of the heading that names this section. */
  labelledBy: string
  tone?: SectionTone
  spacing?: keyof typeof SPACING
  /** Continues the previous block: no top padding. */
  joined?: boolean
  className?: string
  children: ReactNode
}

/** Major page section: surface tone plus vertical rhythm by weight. */
export function Section({
  labelledBy,
  tone = 'plain',
  spacing = 'default',
  joined,
  className,
  children,
}: SectionProps) {
  return (
    <section
      aria-labelledby={labelledBy}
      className={cn(joined ? 'pb-12 md:pb-16 lg:pb-20' : SPACING[spacing], TONE[tone], className)}
    >
      <PageContainer>{children}</PageContainer>
    </section>
  )
}
