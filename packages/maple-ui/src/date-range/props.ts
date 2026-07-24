import { type ExtractPropTypes, type PropType } from 'vue'
import { datePickerProps as datePickerPropsSource } from '../date-picker'
import { props as dateRangePickerPropsSource } from '../date-range-picker/props'
import type { DateRangePickerPresentation, DateRangePickerType } from '../date-range-picker/props'
import { fieldDecoratorProps } from '../field-decorator'
import { pickerProps as pickerPropsSource } from '../picker'
import { popupProps } from '../popup'
import { timePickerProps as timePickerPropsSource } from '../time-picker'
import type { AllowedTime } from '../time-picker/props'
import { defineListenerProp, pickProps } from '../utils/components'

export type DateRangeType = DateRangePickerType
export type DateRangePresentation = DateRangePickerPresentation

export const props = {
  modelValue: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  show: {
    type: Boolean,
    default: undefined,
  },
  presentation: {
    type: String as PropType<DateRangePresentation>,
    default: 'calendar',
  },
  type: {
    type: String as PropType<DateRangeType>,
    default: 'date',
  },
  showTime: Boolean,
  useSeconds: Boolean,
  min: String,
  max: String,
  allowedDates: Function as PropType<(val: string) => boolean>,
  allowedTime: Object as PropType<AllowedTime>,
  separator: {
    type: String,
    default: ' ~ ',
  },
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
  popupProps: {
    type: Object as PropType<Partial<ExtractPropTypes<typeof popupProps>>>,
    default: () => ({}),
  },
  dateRangePickerProps: {
    type: Object as PropType<Partial<ExtractPropTypes<typeof dateRangePickerPropsSource>>>,
    default: () => ({}),
  },
  readonly: Boolean,
  onFocus: defineListenerProp<() => void>(),
  onBlur: defineListenerProp<() => void>(),
  onClose: defineListenerProp<(value: string[]) => void>(),
  onChange: defineListenerProp<(value: string[]) => void>(),
  onClear: defineListenerProp<(value: string[]) => void>(),
  'onUpdate:modelValue': defineListenerProp<(value: string[]) => void>(),
  'onUpdate:show': defineListenerProp<(show: boolean) => void>(),
  ...pickProps(fieldDecoratorProps, [
    'size',
    'variant',
    'placeholder',
    'line',
    'hint',
    'textColor',
    'focusColor',
    'blurColor',
    'disabled',
    'clearable',
    'onClick',
  ]),
}

export type DateRangeProps = ExtractPropTypes<typeof props>
