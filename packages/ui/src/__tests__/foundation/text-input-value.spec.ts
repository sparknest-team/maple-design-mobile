import { describe, expect, it } from 'vitest'
import {
  formatNumericText,
  isValidTextInputMaxLength,
  normalizeTextInputValue,
  resolveTextInputMaxLength,
} from '../../utils/text-input-value'

describe('text input value', () => {
  it('normalizes numeric text without changing a leading minus or first decimal point', () => {
    expect(formatNumericText('--12..3a')).toBe('-12.3')
    expect(formatNumericText('a-1.2.3')).toBe('1.23')
  })

  it('limits ordinary text and honors custom length and slice functions', () => {
    expect(normalizeTextInputValue('abcd', { maxLength: 2 })).toBe('ab')
    expect(normalizeTextInputValue('abcd', { maxLength: 2, errorOnly: true })).toBe('abcd')
    expect(normalizeTextInputValue('abcd', { maxLength: 4, wordLength: (value) => value.length * 2 })).toBe('ab')
    expect(normalizeTextInputValue('abcd', { maxLength: 2, wordSlice: () => 'custom' })).toBe('custom')
  })

  it('applies numeric normalization before the length limit', () => {
    expect(normalizeTextInputValue('1a2b3', { numeric: true, maxLength: 2 })).toBe('12')
  })

  it('never splits a surrogate pair at the default UTF-16 boundary', () => {
    expect(normalizeTextInputValue('123456789😀Z', { maxLength: 10 })).toBe('123456789')
    expect(normalizeTextInputValue('12345678😀Z', { maxLength: 10 })).toBe('12345678😀')
    expect(normalizeTextInputValue('😀Z', { maxLength: 1 })).toBe('')
    expect(normalizeTextInputValue('😀Z', { maxLength: 2 })).toBe('😀')
    expect(normalizeTextInputValue('😀Z', { maxLength: 1, errorOnly: true })).toBe('😀Z')
    expect(normalizeTextInputValue('😀Z', { maxLength: 1, wordSlice: () => 'custom' })).toBe('custom')
  })
})

it('validates number/object length policies and supplies one safe unlimited fallback', () => {
  for (const value of [
    -1,
    NaN,
    Infinity,
    -Infinity,
    null,
    undefined,
    {},
    [],
    { length: -1 },
    { length: NaN },
    { length: Infinity },
    { length: '2' },
    { length: 2, errorOnly: 'yes' },
  ]) {
    expect(isValidTextInputMaxLength(value)).toBe(false)
    expect(resolveTextInputMaxLength(value)).toEqual({ length: 0, errorOnly: false })
  }
  for (const value of [0, 2, 2.5, { length: 0 }, { length: 2, errorOnly: false }, { length: 2, errorOnly: true }]) {
    expect(isValidTextInputMaxLength(value)).toBe(true)
  }
  expect(resolveTextInputMaxLength({ length: 2, errorOnly: true })).toEqual({ length: 2, errorOnly: true })
  expect(resolveTextInputMaxLength(2)).toEqual({ length: 2, errorOnly: false })
  for (const maxLength of [-1, NaN, Infinity, -Infinity]) {
    expect(normalizeTextInputValue('1a2b3', { maxLength, numeric: true })).toBe('123')
  }
})
