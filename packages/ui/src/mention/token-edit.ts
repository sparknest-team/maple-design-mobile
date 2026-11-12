import type { MentionPart, MentionTokenValue } from './token-codec'

export interface MentionSpan {
  part: MentionPart
  start: number
  end: number
  text: string
}

/** Offsets use the same UTF-16 units as native input selectionStart. */
export function projectMentionParts(
  parts: readonly MentionPart[],
  label: (value: MentionTokenValue) => string,
): MentionSpan[] {
  let offset = 0
  return parts.map((part) => {
    const text = part.type === 'text' ? part.text : `${part.prefix ?? '@'}${label(part.value)}`
    const span = { part, start: offset, end: offset + text.length, text }
    offset = span.end
    return span
  })
}

/** Expands a range touching an entity so no partial entity can survive an edit. */
export function replaceMentionRange(
  spans: readonly MentionSpan[],
  start: number,
  end: number,
  replacement: readonly MentionPart[],
): { parts: MentionPart[]; start: number } {
  let first = start
  let last = end
  for (const span of spans) {
    if (span.part.type !== 'mention') {
      continue
    }
    const overlaps = first < span.end && last > span.start
    const inside = first === last && first > span.start && first < span.end
    if (overlaps || inside) {
      first = Math.min(first, span.start)
      last = Math.max(last, span.end)
    }
  }
  const before: MentionPart[] = []
  const after: MentionPart[] = []
  for (const span of spans) {
    if (span.end <= first) {
      before.push(span.part)
    } else if (span.start >= last) {
      after.push(span.part)
    } else if (span.part.type === 'text') {
      const left = span.text.slice(0, Math.max(0, first - span.start))
      const right = span.text.slice(Math.max(0, last - span.start))
      if (left) {
        before.push({ type: 'text', text: left })
      }
      if (right) {
        after.push({ type: 'text', text: right })
      }
    }
  }
  return { parts: [...before, ...replacement, ...after], start: first }
}

/** Find the single contiguous change reported by a native input event. */
export function diffMentionText(previous: string, next: string) {
  let start = 0
  while (start < previous.length && start < next.length && previous[start] === next[start]) {
    start++
  }
  let oldEnd = previous.length
  let newEnd = next.length
  while (oldEnd > start && newEnd > start && previous[oldEnd - 1] === next[newEnd - 1]) {
    oldEnd--
    newEnd--
  }
  return { start, end: oldEnd, text: next.slice(start, newEnd) }
}

/** Copies an intersected mention as a whole, preserving its identity. */
export function sliceMentionRange(spans: readonly MentionSpan[], start: number, end: number): MentionPart[] {
  const result: MentionPart[] = []
  for (const span of spans) {
    if (span.end <= start || span.start >= end) {
      continue
    }
    if (span.part.type === 'mention') {
      result.push(span.part)
    } else {
      const text = span.text.slice(Math.max(0, start - span.start), Math.min(span.text.length, end - span.start))
      if (text) {
        result.push({ type: 'text', text })
      }
    }
  }
  return result
}

/** Map a native selection across label-only changes to the same logical position. */
export function remapMentionOffset(
  previous: readonly MentionSpan[],
  next: readonly MentionSpan[],
  offset: number,
): number {
  for (let i = 0; i < previous.length; i++) {
    const before = previous[i],
      after = next[i]
    if (!after) {
      break
    }
    if (offset <= before.end) {
      if (offset === before.end) {
        return after.end
      }
      return after.start + Math.min(Math.max(0, offset - before.start), after.end - after.start)
    }
  }
  return next.length ? next[next.length - 1].end : 0
}
