import type { ApprovalDetail } from '@/types/dto'

/** Each approval with what it means and how to check it yourself. */
export function ApprovalsList({ approvals }: { approvals: ApprovalDetail[] }) {
  return (
    <ul className="divide-y divide-rule border-y border-rule">
      {approvals.map((approval) => (
        <li key={approval.code} className="gap-6 py-4 md:grid md:grid-cols-[12rem_minmax(0,1fr)]">
          <div>
            <p className="type-fact">{approval.label}</p>
            <p className="type-small text-muted">{approval.name}</p>
          </div>
          <div className="mt-2 md:mt-0">
            <p>{approval.summary}</p>
            <p className="type-small mt-2 text-muted">
              <span className="font-semibold text-body">How to check: </span>
              {approval.howToCheck}
            </p>
          </div>
        </li>
      ))}
    </ul>
  )
}
