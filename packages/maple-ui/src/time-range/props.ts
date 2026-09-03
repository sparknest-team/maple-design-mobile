import { type ExtractPropTypes, type PropType } from 'vue'
import { fieldDecoratorProps } from '../field-decorator'
import { pickerProps as pickerPropsSource } from '../picker'
import { popupProps } from '../popup'
import { props as timePickerPropsSource, type DisabledTime, type Format } from '../time/picker-props'
import { pickProps } from '../utils/components'
import { props as timeRangePickerPropsSource } from './picker-props'

export type TimeRangePresentation = 'clock' | 'picker'

export const props = {
  modelValue: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  open: {
    type: Boolean,
    default: undefined,
  },
  presentation: {
    type: String as PropType<TimeRangePresentation>,
    default: 'picker',
  },
  format: {
    type: String as PropType<Format>,
    default: 'ampm',
  },
  useSeconds: Boolean,
  min: String,
  max: String,
  disabledTime: Object as PropType<DisabledTime>,
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

export type TimeRangeProps = ExtractPropTypes<typeof props>
