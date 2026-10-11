/**
 * Simple token matching (PRD §8). Case-insensitive, ignores punctuation so "B.Tech",
 * "btech" and "b tech" match each other. Every query token must match.
 */

export function normalise(text: string): string {
  return text
    .toLowerCase()
    .replace(/[.'’]/g, '')
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim()
}

export function tokenise(query: string): string[] {
  return normalise(query).split(' ').filter(Boolean)
}

export interface SearchableText {
  /** Primary name(s): weighted highest. */
  name: string
  /** Everything else that should be findable: place, stream, related courses. */
  other: string
}

/** 0 when any token fails to match; higher is more relevant. */
export function score(tokens: string[], text: SearchableText): number {
  if (tokens.length === 0) return 1
  const name = normalise(text.name)
  const compactName = name.replace(/ /g, '')
  const other = normalise(text.other)
  const nameWords = name.split(' ')
  let total = 0
  for (const token of tokens) {
    if (nameWords.some((word) => word.startsWith(token))) total += 3
    else if (name.includes(token) || compactName.includes(token)) total += 2
    else if (other.includes(token) || other.replace(/ /g, '').includes(token)) total += 1
    else return 0
  }
  return total
}
