/** Internal representation: labels are deliberately excluded from persisted data. */
export type MentionTokenValue = string | number | boolean
export type MentionPart =
  { type: 'text'; text: string } | { type: 'mention'; value: MentionTokenValue; prefix?: string }

function encodeValue(value: MentionTokenValue): string {
  if (typeof value === 'number') {
    return `!n:${Object.is(value, -0) ? '-0' : String(value)}`
  }
  if (typeof value === 'boolean') {
    return `!b:${value ? '1' : '0'}`
  }
  return encodeURIComponent(value)
}

/** Encode literal text separately so a literal `@[...]` cannot become an entity. */
export function serializeMentionParts(parts: readonly MentionPart[]): string {
  return parts
    .map((part) =>
      part.type === 'text'
        ? part.text.replace(/\\/g, '\\\\').replace(/@\[/g, '\\@[')
        : `@[${part.prefix && part.prefix !== '@' ? `${encodeURIComponent(part.prefix)}|` : ''}${encodeValue(part.value)}]`,
    )
    .join('')
}

/** Invalid or incomplete markup is treated as literal text, never silently discarded. */
export function parseMentionParts(value: string): MentionPart[] {
  const parts: MentionPart[] = []
  let text = ''
  const flush = () => {
    if (text) {
      parts.push({ type: 'text', text })
    }
    text = ''
  }
  for (let i = 0; i < value.length;) {
    if (value[i] === '\\' && value[i + 1] === '\\') {
      text += '\\'
      i += 2
    } else if (value[i] === '\\' && value.slice(i + 1, i + 3) === '@[') {
      text += '@['
      i += 3
    } else if (value.slice(i, i + 2) === '@[') {
      const end = value.indexOf(']', i + 2)
      if (end < 0) {
        text += value.slice(i)
        break
      }
      try {
        const payload = value.slice(i + 2, end)
        const separator = payload.indexOf('|')
        const prefix = separator < 0 ? undefined : decodeURIComponent(payload.slice(0, separator))
        const raw = separator < 0 ? payload : payload.slice(separator + 1)
        let id: MentionTokenValue
        if (raw.startsWith('!n:')) {
          id = Number(raw.slice(3))
          if (!Number.isFinite(id) || raw.slice(3).trim() === '') {
            throw new Error('Invalid numeric mention')
          }
        } else if (raw === '!b:1' || raw === '!b:0') {
          id = raw === '!b:1'
        } else {
          id = decodeURIComponent(raw)
        }
        flush()
        parts.push(prefix ? { type: 'mention', value: id, prefix } : { type: 'mention', value: id })
      } catch {
        text += value.slice(i, end + 1)
      }
      i = end + 1
    } else {
      text += value[i]
      i++
    }
  }
  flush()
  return parts
}
