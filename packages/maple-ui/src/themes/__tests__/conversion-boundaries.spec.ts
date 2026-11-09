import { describe, expect, it } from 'vitest'
import Themes from '..'

describe('theme unit conversion', () => {
  it('converts signed and leading decimal dimensions in composite values', () => {
    const theme = { '--mp-example': 'calc(.5px + -0.5px + 16px)' }
    expect(Themes.toRem(theme)['--mp-example']).toBe('calc(0.03125rem + -0.03125rem + 1rem)')
    expect(Themes.toViewport(theme, { viewportWidth: 100, viewportUnit: 'vw' })['--mp-example']).toBe(
      'calc(0.5vw + -0.5vw + 16vw)',
    )
    const values: string[] = []
    Themes.convert(theme, (value) => {
      values.push(value)
      return `${value}px`
    })
    expect(values).toEqual(['.5', '-0.5', '16'])
    expect(Themes.toRem({ '--mp-example': '1e2px' })['--mp-example']).toBe('6.25rem')
    expect(theme['--mp-example']).toBe('calc(.5px + -0.5px + 16px)')
  })

  it('rejects invalid conversion settings', () => {
    for (const value of [0, -1, Infinity, NaN]) {
      expect(() => Themes.toRem({}, { rootFontSize: value })).toThrow(RangeError)
      expect(() => Themes.toViewport({}, { viewportWidth: value })).toThrow(RangeError)
    }
    for (const value of [-1, 101, 1.5, NaN]) {
      expect(() => Themes.toRem({}, { unitPrecision: value })).toThrow(RangeError)
      expect(() => Themes.toViewport({}, { unitPrecision: value })).toThrow(RangeError)
    }
    expect(() => Themes.toViewport({}, { viewportUnit: 'px; color:red' })).toThrow(RangeError)
    expect(Themes.toViewport({ '--mp-example': '1px' }, { viewportUnit: 'dvw' })['--mp-example']).toBe('0.266667dvw')
  })
})
