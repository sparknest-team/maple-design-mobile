import { type ExtractPropTypes, type PropType } from 'vue'
import { datePickerProps as datePickerPropsSource } from '../date-picker'
import { pickerProps as pickerPropsSource } from '../picker'
import { timePickerProps as timePickerPropsSource } from '../time-picker'
import { type AllowedTime } from '../time-picker/props'
import { defineListenerProp } from '../utils/components'

export type DateRangePickerType = 'year' | 'month' | 'date'
export type DateRangePickerPresentation = 'calendar' | 'picker' | 'calendarClock' | 'calendarPicker'

export const props = {
  modelValue: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  presentation: {
    type: String as PropType<DateRangePickerPresentation>,
    default: 'calendar',
  },
  type: {
    type: String as PropType<DateRangePickerType>,
    default: 'date',
  },
  showTime: Boolean,
  useSeconds: Boolean,
  min: String,
  max: String,
  allowedDates: Function as PropType<(val: string) => boolean>,
  allowedTime: Object as PropType<AllowedTime>,
  datePickerProps: {
    type: Object as PropType<Partial<ExtractPropTypes<typeof datePickerPropsSource>>>,
    default: () => ({}),
  },
  pickerProps: {
    type: Object as PropType<Partial<ExtractPropTypes<typeof pickerPropsSource>>>,
    default: () => ({}),
  },
  timePickerProps: {
    type: Object as PropType<Partial<ExtractPropTypes<typeof timePickerPropsSource>>>,
    default: () => ({}),
  },
  readonly: Boolean,
  elevation: {
    type: [Boolean, Number, String],
    default: false,
  },
  onChange: defineListenerProp<(value: string[]) => void>(),
  'onUpdate:modelValue': defineListenerProp<(value: string[]) => void>(),
}

export type DateRangePickerProps = ExtractPropTypes<typeof props>
