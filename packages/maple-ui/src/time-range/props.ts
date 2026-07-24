import { type ExtractPropTypes, type PropType } from 'vue'
import { fieldDecoratorProps } from '../field-decorator'
import { pickerProps as pickerPropsSource } from '../picker'
import { popupProps } from '../popup'
import { timePickerProps as timePickerPropsSource } from '../time-picker'
import { type AllowedTime, type Format } from '../time-picker/props'
import { props as timeRangePickerPropsSource } from '../time-range-picker/props'
import { defineListenerProp, pickProps } from '../utils/components'

export type TimeRangePresentation = 'clock' | 'picker'

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
    type: String as PropType<TimeRangePresentation>,
    default: 'clock',
  },
  format: {
    type: String as PropType<Format>,
    default: 'ampm',
  },
  useSeconds: Boolean,
  min: String,
  max: String,
  allowedTime: Object as PropType<AllowedTime>,
  separator: {
    type: String,
    default: ' ~ ',
  },
  showNextDay: Boolean,
  timePickerProps: {
    type: Object as PropType<Partial<ExtractPropTypes<typeof timePickerPropsSource>>>,
    default: () => ({}),
  },
  pickerProps: {
    type: Object as PropType<Partial<ExtractPropTypes<typeof pickerPropsSource>>>,
    default: () => ({}),
  },
  popupProps: {
    type: Object as PropType<Partial<ExtractPropTypes<typeof popupProps>>>,
    default: () => ({}),
  },
  timeRangePickerProps: {
    type: Object as PropType<Partial<ExtractPropTypes<typeof timeRangePickerPropsSource>>>,
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

export type TimeRangeProps = ExtractPropTypes<typeof props>
