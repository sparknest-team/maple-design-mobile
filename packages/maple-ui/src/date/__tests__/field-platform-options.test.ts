import { describe, expect, it } from 'vitest'
import { props as dateRangeProps } from '../../date-range/props'
import { props as dateProps } from '../props'

describe('mobile date field presentation boundaries', () => {
  it('keeps real wheel and inner calendar view extensions', () => {
    expect(dateProps).toHaveProperty('pickerProps')
    expect(dateRangeProps).toHaveProperty('pickerProps')
    expect(dateRangeProps).toHaveProperty('datePickerProps')
    expect(dateProps).toHaveProperty('datePickerProps')
    expect(dateRangeProps).toHaveProperty('dateRangePickerProps')
    expect(dateProps).not.toHaveProperty('timePickerProps')
    expect(dateRangeProps).not.toHaveProperty('timePickerProps')
  })
})
