import { describe, expect, test } from 'vitest'
import { parseMentionParts, serializeMentionParts } from '../token-codec'

describe('mention token codec', () => {
  test('round trips literal markup and arbitrary identifiers without persisting labels', () => {
    const parts = [
      { type: 'text' as const, text: 'literal @[not-a-mention] \\ ' },
      { type: 'mention' as const, value: 'shuai.meng/中文]' },
      { type: 'text' as const, text: ' and ' },
      { type: 'mention' as const, value: 'other' },
    ]
    const encoded = serializeMentionParts(parts)
    expect(parseMentionParts(encoded)).toEqual(parts)
    expect(encoded).not.toContain('孟帅')
  })

  test.each(['@[unclosed', '@[%ZZ]', 'ordinary \\ path'])('preserves malformed input: %s', (input) => {
    expect(parseMentionParts(input)).toEqual([{ type: 'text', text: input }])
  })

  test('preserves primitive identity and custom prefixes', () => {
    const parts = [
      { type: 'mention' as const, value: 0, prefix: '##' },
      { type: 'mention' as const, value: '0' },
      { type: 'mention' as const, value: false },
      { type: 'mention' as const, value: '!n:0' },
    ]
    expect(parseMentionParts(serializeMentionParts(parts))).toEqual(parts)
  })
})
