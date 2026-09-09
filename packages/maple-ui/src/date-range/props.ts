import { type ExtractPropTypes, type PropType } from 'vue'
import { props as datePickerPropsSource } from '../date/picker-props'
import { fieldDecoratorProps } from '../field-decorator'
import { pickerProps as pickerPropsSource } from '../picker'
import { popupProps } from '../popup'
import { props as timePickerPropsSource } from '../time/picker-props'
import type { DisabledTime } from '../time/picker-props'
import { pickProps } from '../utils/components'
import { popupContainerProp } from '../utils/popup-container'
import { props as dateRangePickerPropsSource } from './picker-props'
import type { DateRangePickerPresentation, DateRangePickerType } from './picker-props'

export type DateRangeType = DateRangePickerType
export type DateRangePresentation = DateRangePickerPresentation

export const props = {
  popupContainer: popupContainerProp,
  modelValue: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  open: {
    type: Boolean,
    default: undefined,
  },
  presentation: {
    type: String as PropType<DateRangePresentation>,
    default: 'picker',
  },
  type: {
    type: String as PropType<DateRangeType>,
    default: 'date',
  },
  showTime: Boolean,
  useSeconds: Boolean,
  min: String,
  max: String,
  disabledDate: Function as PropType<(val: string) => boolean>,
  disabledTime: Object as PropType<DisabledTime>,
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

export type DateRangeProps = import('vue').ExtractPublicPropTypes<typeof props>
