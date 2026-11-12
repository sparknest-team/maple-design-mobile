import { expect, test } from 'vitest'
import Themes from '..'

test.each([
  ['alps', '#FF946F'],
  ['firefly', '#C5B8FF'],
] as const)('%s dark preserves its brand content color separately from action colors', (brand, brandColor) => {
  const theme = Themes[brand].dark
  expect(theme['--mp-sys-color-content-brand']).toBe(brandColor)
  expect(theme['--mp-checkbox-control-color-checked']).toBe('var(--mp-sys-color-action-primary)')
  expect(theme['--mp-date-calendar-selected-background']).toBe('var(--mp-sys-color-action-primary)')
})
