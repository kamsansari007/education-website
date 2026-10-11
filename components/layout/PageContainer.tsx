import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

/** Max 1240px content with responsive gutters: 16px, 24px (≥640), 32px (≥1024). */
export function PageContainer({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('mx-auto w-full max-w-page px-4 sm:px-6 lg:px-8', className)}>
      {children}
    </div>
  )
}
