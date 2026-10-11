/**
 * Stream "lines" (DESIGN-DIRECTION.md §4): every stream belongs to one coloured line, and
 * that colour is used consistently wherever the stream appears (route map, line index,
 * course cards). Colours are for lines, dots and markers only, never text, and always
 * appear next to the stream's name.
 */
export type LineId = 'saffron' | 'teal' | 'rose' | 'violet' | 'green'

export interface StreamLine {
  id: LineId
  /** CSS colour (a design token). */
  color: string
  /** Stream slugs on this line, in display order. */
  streams: string[]
}

export const STREAM_LINES: StreamLine[] = [
  { id: 'saffron', color: 'var(--color-line-saffron)', streams: ['management', 'commerce'] },
  {
    id: 'teal',
    color: 'var(--color-line-teal)',
    streams: ['engineering', 'computer-applications'],
  },
  { id: 'rose', color: 'var(--color-line-rose)', streams: ['health-sciences'] },
  {
    id: 'violet',
    color: 'var(--color-line-violet)',
    streams: ['arts-humanities', 'law', 'education'],
  },
  { id: 'green', color: 'var(--color-line-green)', streams: ['design', 'science'] },
]

const FALLBACK = 'var(--color-ink)'

export function lineForStream(streamSlug: string): StreamLine | undefined {
  return STREAM_LINES.find((line) => line.streams.includes(streamSlug))
}

export function streamColor(streamSlug: string): string {
  return lineForStream(streamSlug)?.color ?? FALLBACK
}
