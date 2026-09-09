import { type ExtractPropTypes, type PropType } from 'vue'
import { pickerProps as pickerPropsSource } from '../picker'
import { props as timePickerPropsSource, type DisabledTime, type Format } from '../time/picker-props'

export type TimeRangePickerPresentation = 'clock' | 'picker'

export const props = {
  modelValue: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  presentation: {
    type: String as PropType<TimeRangePickerPresentation>,
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
  timePickerProps: {
    type: Object as PropType<Partial<ExtractPropTypes<typeof timePickerPropsSource>>>,
    default: () => ({}),
  },
  pickerProps: {
    type: Object as PropType<Partial<ExtractPropTypes<typeof pickerPropsSource>>>,
    default: () => ({}),
  },
  showNextDay: Boolean,
  readonly: Boolean,
  elevation: {
    type: [Boolean, Number],
    default: false,
  },
}

export type TimeRangePickerProps = import('vue').ExtractPublicPropTypes<typeof props>
