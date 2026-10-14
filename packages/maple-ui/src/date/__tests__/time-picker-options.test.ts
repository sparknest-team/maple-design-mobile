import { describe, expect, it } from 'vitest'
import { dateTimePickerOptions } from '../time-picker-options'

describe('date nested time appearance', () => {
  it('retains supported view options but never value, rules, format, layout or notifications', () => {
    const step = { hour: 2, minute: 15 }
    const result = dateTimePickerOptions({
      use12Hours: true,
      hideDisabledOptions: true,
      step,
      class: 'time-view',
      style: { width: '300px' },
      format: 'hh:mm A',
      modelValue: '12:00:00',
      min: '09:00:00',
      disabled: false,
      readonly: false,
      disabledHours: () => [],
      disableConfirm: false,
      presentation: 'picker',
      'onUpdate:modelValue': () => undefined,
      onSelect: () => undefined,
      open: true,
    })
    expect(result).toEqual({
      use12Hours: true,
      hideDisabledOptions: true,
      step,
      class: 'time-view',
      style: { width: '300px' },
    })
    expect(dateTimePickerOptions()).toEqual({})
  })
  it('does not mutate the input or manufacture model defaults', () => {
    const options = Object.freeze({ use12Hours: false, step: Object.freeze({ second: 10 }) })
    expect(dateTimePickerOptions(options)).toEqual(options)
    expect(dateTimePickerOptions(options)).not.toBe(options)
  })
})
