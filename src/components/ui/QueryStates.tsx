import { Button } from './Button'

/** Row-shaped placeholders that match the final layout to avoid layout shift. */
export function SkeletonRows({
  count = 3,
  rowClassName = 'h-24',
}: {
  count?: number
  rowClassName?: string
}) {
  return (
    <div aria-hidden="true" className="divide-y divide-rule">
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="py-5">
          <div className={`animate-pulse rounded-control bg-ink-50 ${rowClassName}`} />
        </div>
      ))}
    </div>
  )
}

export function LoadingStatus({ label }: { label: string }) {
  return (
    <p role="status" className="sr-only">
      {label}
    </p>
  )
}

export function LoadError({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div role="alert" className="flex flex-wrap items-center gap-4 py-6">
      <p>{message}</p>
      <Button variant="secondary" size="sm" onClick={onRetry}>
        Try again
      </Button>
    </div>
  )
}
