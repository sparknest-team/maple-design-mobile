import { type PropType } from 'vue'
import { props as datePickerPropsSource } from '../date/presentation-props'
import type { DisabledTime } from '../date/time-constraints'
import type { DateWheelOptions } from '../date/wheel-options'
import type { DateRangeCalendarOptions } from './calendar-options'

export type DateRangePickerType = 'year' | 'month' | 'date'
export type DateRangePickerPresentation = 'calendar' | 'picker' | 'calendarPicker'

export const props = {
  abbreviation: datePickerPropsSource.abbreviation,
  pickerValue: [String, Array] as PropType<string | string[]>,
  modelValue: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  presentation: {
    type: String as PropType<DateRangePickerPresentation>,
    default: 'picker',
  },
  type: {
    type: String as PropType<DateRangePickerType>,
    default: 'date',
  },
  dayStartOfWeek: datePickerPropsSource.dayStartOfWeek,
  showTime: Boolean,
  useSeconds: Boolean,
  min: String,
  max: String,
  disabledDate: Function as PropType<(val: string) => boolean>,
  disabledTime: Object as PropType<DisabledTime>,
  datePickerProps: {
    type: Object as PropType<DateRangeCalendarOptions>,
    default: () => ({}),
  },
  pickerProps: {
    type: Object as PropType<DateWheelOptions>,
    default: () => ({}),
  },
  readonly: Boolean,
  elevation: {
    type: [Boolean, Number],
    default: false,
  },
}

export type DateRangePickerProps = import('vue').ExtractPublicPropTypes<typeof props>
