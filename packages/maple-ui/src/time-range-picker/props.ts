import { type ExtractPropTypes, type PropType } from 'vue'
import { pickerProps as pickerPropsSource } from '../picker'
import { timePickerProps as timePickerPropsSource } from '../time-picker'
import { type AllowedTime, type Format } from '../time-picker/props'
import { defineListenerProp } from '../utils/components'

export type TimeRangePickerPresentation = 'clock' | 'picker'

export const props = {
  modelValue: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  presentation: {
    type: String as PropType<TimeRangePickerPresentation>,
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
    type: [Boolean, Number, String],
    default: false,
  },
  onChange: defineListenerProp<(value: string[]) => void>(),
  'onUpdate:modelValue': defineListenerProp<(value: string[]) => void>(),
}

export type TimeRangePickerProps = ExtractPropTypes<typeof props>
