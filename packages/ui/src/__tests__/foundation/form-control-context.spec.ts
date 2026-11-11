import { describe, expect, test } from 'vitest'
import { resolveFormControlState } from '../../utils/form-control-context'

describe('form control context contract', () => {
  test('uses local, item, form and fallback values in that order', () => {
    expect(resolveFormControlState(false, true, true, true)).toBe(false)
    expect(resolveFormControlState(undefined, false, true, true)).toBe(false)
    expect(resolveFormControlState(undefined, undefined, true, false)).toBe(true)
    expect(resolveFormControlState(undefined, undefined, undefined, 'md')).toBe('md')
  })
})
