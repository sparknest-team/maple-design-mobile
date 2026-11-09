import { expect, test } from 'vitest'
import { backTopProps } from '../props'
import { ease } from '../use-back-top'

test('duration and named easing use finite values and their actual preset names', () => {
  expect(backTopProps.duration.validator(Infinity)).toBe(false)
  expect(backTopProps.duration.validator(NaN)).toBe(false)
  expect(backTopProps.duration.validator(0)).toBe(true)
  expect(backTopProps.easing.validator('unknown')).toBe(false)
  expect(backTopProps.easing.validator('quartOut')).toBe(true)
})
test('custom easing stays finite within progress bounds and preserves thrown errors', () => {
  expect(ease(0.5, () => 2)).toBe(1)
  expect(ease(0.5, () => -1)).toBe(0)
  expect(ease(0.5, () => NaN)).toBe(0.5)
  expect(ease(0.5, () => Infinity)).toBe(0.5)
  const failure = new Error('business easing')
  expect(() =>
    ease(0.5, () => {
      throw failure
    }),
  ).toThrow(failure)
})
