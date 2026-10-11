import { useCallback, useEffect, useState } from 'react'

export type QueryState<T> =
  | { status: 'loading'; /** Last successful data, kept while a new request runs. */ previous?: T }
  | { status: 'error'; error: Error; retry: () => void }
  | { status: 'success'; data: T }

type Settled<T> = { key: string; attempt: number } & (
  { ok: true; data: T } | { ok: false; error: Error }
)

/**
 * Runs an async service call and exposes loading / error / success.
 * `key` identifies the request: the call re-runs when the key changes.
 * Pages render every state as though the data were remote (CLAUDE.md §5).
 */
export function useServiceQuery<T>(key: string, load: () => Promise<T>): QueryState<T> {
  const [attempt, setAttempt] = useState(0)
  const [settled, setSettled] = useState<Settled<T> | null>(null)

  useEffect(() => {
    let active = true
    load().then(
      (data) => {
        if (active) setSettled({ key, attempt, ok: true, data })
      },
      (error: unknown) => {
        if (active) {
          const normalised = error instanceof Error ? error : new Error('Request failed')
          setSettled({ key, attempt, ok: false, error: normalised })
        }
      },
    )
    return () => {
      active = false
    }
    // `key` identifies the request; `load` is usually an inline closure recreated each render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, attempt])

  const retry = useCallback(() => setAttempt((value) => value + 1), [])

  if (!settled || settled.key !== key || settled.attempt !== attempt) {
    return { status: 'loading', previous: settled?.ok ? settled.data : undefined }
  }
  if (!settled.ok) return { status: 'error', error: settled.error, retry }
  return { status: 'success', data: settled.data }
}
