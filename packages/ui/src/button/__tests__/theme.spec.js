import { expect, test } from 'vitest'
import Themes from '../../themes'

test('dark Button inherits its shared color roles', () => {
  for (const theme of [Themes.default.dark, Themes.maple.dark]) {
    expect(Object.keys(theme).filter((key) => /^--mp-button-.*color$/.test(key))).toEqual([])
  }
})

test('Maple light solid primary has a paired light foreground and dark state layer', () => {
  expect(Themes.maple.light['--mp-button-solid-text-color']).toBe('var(--mp-sys-color-content-on-dark)')
  expect(Themes.maple.light['--mp-button-primary-state-layer-color']).toBe('var(--mp-sys-color-content-on-bright)')
})

test('Firefly separates yellow primary, neutral secondary and violet tertiary roles', () => {
  const light = Themes.firefly.light
  const dark = Themes.firefly.dark
  expect(light['--mp-button-primary-foreground-color']).toBe('rgb(234, 255, 104)')
  expect(light['--mp-button-secondary-color']).toBe('rgba(23, 34, 75, 0.08)')
  expect(light['--mp-button-secondary-foreground-color']).toBe('rgba(23, 34, 75, 1)')
  expect(light['--mp-button-secondary-tonal-color']).toBe('rgba(23, 34, 75, 0.04)')
  expect(light['--mp-button-tertiary-color']).toBe('rgb(207, 199, 255)')
  expect(light['--mp-button-tertiary-foreground-color']).toBe('rgb(154, 137, 235)')
  expect(light['--mp-button-tertiary-text-color']).toBe('rgba(23, 34, 75, 1)')
  expect(dark['--mp-button-primary-foreground-color']).toBe(dark['--mp-sys-color-action-primary'])
  expect(dark['--mp-button-secondary-color']).toBe(dark['--mp-sys-color-content-secondary'])
  expect(dark['--mp-button-secondary-foreground-color']).toBe(dark['--mp-sys-color-content-primary'])
  expect(dark['--mp-button-tertiary-color']).toBe('#CFC7FF')
  expect(dark['--mp-button-tertiary-foreground-color']).toBe('#C5B8FF')
  expect(dark['--mp-button-tertiary-foreground-color']).not.toBe(dark['--mp-sys-color-action-primary'])
  for (const theme of [light, dark]) {
    expect(theme['--mp-button-tertiary-color']).not.toBe(theme['--mp-button-secondary-color'])
    expect(Number(theme['--mp-button-state-opacity-active'] ?? 0.12)).toBeLessThanOrEqual(0.12)
  }
})
