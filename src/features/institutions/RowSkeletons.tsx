/** Placeholders shaped like the final rows, so content doesn't shift when data arrives. */

function Bar({ className }: { className: string }) {
  return <div className={`animate-pulse rounded-control bg-ink-50 ${className}`} />
}

export function InstitutionRowsSkeleton({
  count = 5,
  dense = false,
}: {
  count?: number
  dense?: boolean
}) {
  return (
    <ul aria-hidden="true" className="divide-y divide-rule border-y border-rule">
      {Array.from({ length: count }, (_, index) => (
        <li key={index} className={`flex gap-4 ${dense ? 'py-4' : 'py-5 lg:gap-6 lg:py-6'}`}>
          <Bar className={dense ? 'size-12 shrink-0' : 'size-14 shrink-0'} />
          <div className="flex-1 space-y-2.5">
            <Bar className="h-5 w-2/3 max-w-sm" />
            <Bar className="h-4 w-1/2 max-w-xs" />
            <div className="flex gap-6 pt-1">
              <Bar className="h-9 w-24" />
              <Bar className="h-9 w-28" />
              {!dense && <Bar className="h-9 w-32" />}
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

export function LedgerRowsSkeleton({ count = 8 }: { count?: number }) {
  return (
    <ul aria-hidden="true" className="divide-y divide-rule border-y border-rule">
      {Array.from({ length: count }, (_, index) => (
        <li key={index} className="space-y-2.5 py-4 lg:py-5">
          <Bar className="h-5 w-40" />
          <Bar className="h-4 w-full max-w-2xl" />
        </li>
      ))}
    </ul>
  )
}
