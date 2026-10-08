import { describe, expect, test } from 'vitest'
import { normalizeTheme, themeMap } from '../../../../maple-ui-playground/src/themes'

describe('Playground themes', () => {
  test.each(Object.keys(themeMap))('accepts current theme %s', (name) => {
    expect(normalizeTheme(name)).toBe(name)
    expect(themeMap[name]['--mp-color-scheme']).toBe(name.includes('Dark') ? 'dark' : 'light')
  })

  test.each([null, '', 'unknown', 'toString', '__proto__'])('resets invalid persisted theme %s', (name) => {
    expect(normalizeTheme(name)).toBe('defaultDarkTheme')
  })
})
