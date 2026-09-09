import { type ExtractPropTypes, type PropType } from 'vue'
import { fieldDecoratorProps } from '../field-decorator'
import { pickerProps as pickerPropsSource } from '../picker'
import { popupProps } from '../popup'
import { pickProps } from '../utils/components'
import { popupContainerProp } from '../utils/popup-container'
import { props as timePickerPropsSource, type DisabledTime, type Format } from './picker-props'

export type TimePresentation = 'clock' | 'picker'

export const props = {
  popupContainer: popupContainerProp,
  modelValue: {
    type: String,
    default: undefined,
  },
  open: {
    type: Boolean,
    default: undefined,
  },
  presentation: {
    type: String as PropType<TimePresentation>,
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

export type TimeProps = import('vue').ExtractPublicPropTypes<typeof props>
