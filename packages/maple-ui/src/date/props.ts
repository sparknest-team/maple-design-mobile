import { type ExtractPropTypes, type PropType } from 'vue'
import { fieldDecoratorProps } from '../field-decorator'
import { popupProps } from '../popup'
import type { DisabledTime } from '../time/picker-props'
import { pickProps } from '../utils/components'
import { props as datePickerPropsSource } from './picker-props'

export type DateType = 'year' | 'month' | 'date'

export const props = {
  modelValue: {
    type: [String, Array] as PropType<string | string[]>,
    default: undefined,
  },
  open: {
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
    default: 'picker',
  },
  min: String,
  max: String,
  disabledDate: Function as PropType<(val: string) => boolean>,
  disabledTime: Object as PropType<DisabledTime>,
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
  ]),
}

export type DateProps = ExtractPropTypes<typeof props>
