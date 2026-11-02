import { expect, expectTypeOf, it } from 'vitest'
import {
  dateFields,
  datePickerFieldsProp,
  pickerFieldIndexes,
  timeFields,
  timePickerFieldsProp,
} from '../../_components/picker-field/fields'
import type { DateRangeProps } from '../../date-range/props'
import type { TimeRangeProps } from '../../time-range/props'
import type { TimeProps } from '../../time/props'
import type { DatePickerProps } from '../picker-props'
import type { DateProps } from '../props'

it('validates date and time fields independently and uses defaults only when omitted', () => {
  expect(datePickerFieldsProp.validator(['day', 'month'])).toBe(true)
  expect(timePickerFieldsProp.validator(['minute', 'hour'])).toBe(true)
  expect(datePickerFieldsProp.validator([])).toBe(false)
  expect(timePickerFieldsProp.validator(['hour', 'hour'])).toBe(false)
  // @ts-expect-error Time units cannot be passed to date-fields.
  expect(datePickerFieldsProp.validator(['hour'])).toBe(false)
  // @ts-expect-error Date units cannot be passed to time-fields.
  expect(timePickerFieldsProp.validator(['month'])).toBe(false)
  expect(pickerFieldIndexes(undefined, dateFields, [0, 1, 2])).toEqual([0, 1, 2])
  expect(pickerFieldIndexes(['minute', 'hour'], timeFields, [0, 1, 2])).toEqual([1, 0])
  expect(pickerFieldIndexes(['month'], timeFields, [0, 1, 2])).toEqual([])
})

it('exports separate field types and removes the previous public props', () => {
  expectTypeOf<NonNullable<DateProps['dateFields']>>().toEqualTypeOf<readonly ('year' | 'month' | 'day')[]>()
  expectTypeOf<NonNullable<DateRangeProps['timeFields']>>().toEqualTypeOf<readonly ('hour' | 'minute' | 'second')[]>()
  expectTypeOf<NonNullable<TimeProps['timeFields']>>().toEqualTypeOf<NonNullable<TimeRangeProps['timeFields']>>()
  type OldProps = Extract<
    keyof DateProps | keyof DatePickerProps | keyof DateRangeProps | keyof TimeProps | keyof TimeRangeProps,
    'useSeconds' | 'pickerFields'
  >
  expectTypeOf<OldProps>().toEqualTypeOf<never>()
})
