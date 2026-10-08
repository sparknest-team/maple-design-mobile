import { expect, test } from 'vitest'
import Themes from '../../themes'

test('dark Button inherits its shared color roles', () => {
  for (const theme of [Themes.default.dark, Themes.maple.dark]) {
    expect(Object.keys(theme).filter((key) => /^--mp-button-.*color$/.test(key))).toEqual([])
  }
})

test('Maple light solid primary has a paired light foreground and dark state layer', () => {
  expect(Themes.maple.light['--mp-button-primary-text-color']).toBe('var(--mp-sys-color-content-on-dark)')
  expect(Themes.maple.light['--mp-button-primary-state-layer-color']).toBe('var(--mp-sys-color-content-on-bright)')
})
