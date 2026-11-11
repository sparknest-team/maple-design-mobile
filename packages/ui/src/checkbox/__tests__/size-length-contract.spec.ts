import { expect, test } from 'vitest'
import { positiveLength } from '../../utils/size-length'

test('positive CSS lengths preserve leading decimals, exponent dimensions, absolute and modern relative units', () => {
  for (const value of ['.5rem', '1e1px', '+.5em', '1cm', '1lh', '1dvh', '1cqi']) {
    expect(positiveLength(value, 'fallback')).toBe(value)
  }
  expect(positiveLength('.5', 'fallback')).toBe('0.5px')
  expect(positiveLength('1e1', 'fallback')).toBe('10px')
})
test('nonpositive, nonfinite and incompatible dimensions retain fallback', () => {
  for (const value of ['0rem', '-.5rem', '0e1px', '1e999px', '1deg', '1foo', 'auto', 'initial', 0, -1, Infinity, NaN]) {
    expect(positiveLength(value, 'fallback')).toBe('fallback')
  }
})
