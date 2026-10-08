import { reactive } from 'vue'
import { describe, expect, test } from 'vitest'
import { createSelectionKey } from '../selection-key'

describe('selection identity', () => {
  test('distinguishes primitive types and ambiguous path separators', () => {
    const key = createSelectionKey()
    expect(key(1)).not.toBe(key('1'))
    expect(key(['a/b', 'c'])).not.toBe(key(['a', 'b/c']))
    expect(key(['a', 'b'])).toBe(key(['a', 'b']))
  })
  test('keeps object identity stable across reactive proxies', () => {
    const key = createSelectionKey()
    const original = { label: 'same' }
    expect(key(original)).toBe(key(reactive(original)))
    expect(key(original)).not.toBe(key({ label: 'same' }))
  })
})
