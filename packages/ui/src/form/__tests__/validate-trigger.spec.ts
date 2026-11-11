import { describe, expect, it } from 'vitest'
import { hasValidateTrigger, VALIDATE_TRIGGERS } from '../validate-trigger'

describe('FormItem validate triggers', () => {
  it('supports each trigger with the same meaning', () => {
    for (const trigger of VALIDATE_TRIGGERS) {
      expect(hasValidateTrigger(trigger, trigger)).toBe(true)
      expect(hasValidateTrigger(['input', trigger], trigger)).toBe(true)
    }
  })

  it('does not validate for another trigger or an omitted trigger', () => {
    expect(hasValidateTrigger('change', 'clear')).toBe(false)
    expect(hasValidateTrigger(['input', 'blur'], 'focus')).toBe(false)
    expect(hasValidateTrigger(undefined, 'change')).toBe(false)
  })
})
