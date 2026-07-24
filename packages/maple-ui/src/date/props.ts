import { type ExtractPropTypes, type PropType } from 'vue'
import { datePickerProps as datePickerPropsSource } from '../date-picker'
import { fieldDecoratorProps } from '../field-decorator'
import { popupProps } from '../popup'
import type { AllowedTime } from '../time-picker/props'
import { defineListenerProp, pickProps } from '../utils/components'

export type DateType = 'year' | 'month' | 'date'

export const props = {
  modelValue: {
    type: [String, Array] as PropType<string | string[]>,
    default: undefined,
  },
  show: {
    type: Boolean,
    default: undefined,
  },
  type: {
    type: String as PropType<DateType>,
    default: 'date',
  },
  showTime: Boolean,
  useSeconds: Boolean,
  multiple: Boolean,
  presentation: {
    type: String as PropType<'calendar' | 'picker' | 'calendarClock' | 'calendarPicker'>,
    default: 'calendar',
  },
  min: String,
  max: String,
  allowedDates: Function as PropType<(val: string) => boolean>,
  allowedTime: Object as PropType<AllowedTime>,
  separator: String,
  datePickerProps: {
    type: Object as PropType<Partial<ExtractPropTypes<typeof datePickerPropsSource>>>,
    default: () => ({}),
  },
  popupProps: {
    type: Object as PropType<Partial<ExtractPropTypes<typeof popupProps>>>,
    default: () => ({}),
  },
  readonly: Boolean,
  onFocus: defineListenerProp<() => void>(),
  onBlur: defineListenerProp<() => void>(),
  onClose: defineListenerProp<(value: string | string[] | undefined) => void>(),
  onChange: defineListenerProp<(value: string | string[] | undefined) => void>(),
  onClear: defineListenerProp<(value: string | string[] | undefined) => void>(),
  'onUpdate:modelValue': defineListenerProp<(value: string | string[] | undefined) => void>(),
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

export type DateProps = ExtractPropTypes<typeof props>
