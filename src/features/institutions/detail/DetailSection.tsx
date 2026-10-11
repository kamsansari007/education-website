import type { ReactNode } from 'react'
import { SectionHeading } from '@/components/layout/SectionHeading'

/** One titled section of a detail page; the id is its anchor in the section nav. */
export function DetailSection({
  id,
  title,
  description,
  meta,
  children,
}: {
  id: string
  title: string
  description?: ReactNode
  meta?: ReactNode
  children: ReactNode
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-rule pt-8 lg:pt-10">
      <SectionHeading
        id={`${id}-title`}
        title={title}
        description={description}
        meta={meta}
        className="mb-5 lg:mb-6"
      />
      {children}
    </section>
  )
}
