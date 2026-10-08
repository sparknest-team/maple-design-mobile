import { describe, expect, it } from 'vitest'
import { formatNumericText, normalizeTextInputValue } from '../../utils/text-input-value'

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
})
