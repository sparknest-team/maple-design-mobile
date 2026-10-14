import { describe, expect, it } from 'vitest'
import { dateFieldPanelOptions } from '../field-panel-options'
import type { DateFieldProps } from '../field-state'

describe('date field nested presentation', () => {
  it('never takes the presentation selector from nested field options', () => {
    for (const range of [false, true]) {
      const nested = { presentation: 'calendar', dayStartOfWeek: 1 }
      const options = (range
        ? { dateRangePickerProps: nested }
        : { datePickerProps: nested }) as unknown as DateFieldProps
      const result = dateFieldPanelOptions(options, range)
      expect(result.presentation).toBeUndefined()
      expect(result.dayStartOfWeek).toBe(1)
      expect(
        dateFieldPanelOptions({ ...options, presentation: 'picker' } as unknown as DateFieldProps, range).presentation,
      ).toBe('picker')
    }
  })
  it('does not erase nested appearance with empty field defaults', () => {
    const result = dateFieldPanelOptions(
      {
        dateRangePickerProps: { datePickerProps: { hint: '设备', color: 'red' } },
        datePickerProps: {},
        pickerProps: {},
        timePickerProps: {},
        modelValue: ['2025-01-01', '2025-01-02'],
      } as unknown as DateFieldProps,
      true,
    )
    expect(result.datePickerProps).toEqual({ hint: '设备', color: 'red' })
    expect(result.modelValue).toEqual(['2025-01-01', '2025-01-02'])
  })
  it('explicit field appearance overrides nested defaults without taking ownership', () => {
    const result = dateFieldPanelOptions(
      {
        dateRangePickerProps: { datePickerProps: { hint: '设备', color: 'red' } },
        datePickerProps: { color: 'blue', modelValue: '2020-01-01', 'onUpdate:modelValue': () => undefined },
      } as unknown as DateFieldProps,
      true,
    )
    expect(result.datePickerProps).toEqual({ hint: '设备', color: 'blue' })
  })
})
