import { expect, test } from 'vitest'
import Themes from '../../themes'

test('dark themes inherit Alert color roles instead of replacing them with palette fills', () => {
  for (const theme of [Themes.default.dark, Themes.maple.dark]) {
    expect(Object.keys(theme).filter((key) => /^--mp-alert-(standard|tonal|outline)-/.test(key))).toEqual([])
    // Existing mobile dark density is independent of color semantics.
    expect(theme['--mp-alert-icon-size']).toBe('22px')
  }
})
