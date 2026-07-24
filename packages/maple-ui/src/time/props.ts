import { type ExtractPropTypes, type PropType } from 'vue'
import { fieldDecoratorProps } from '../field-decorator'
import { popupProps } from '../popup'
import { timePickerProps as timePickerPropsSource } from '../time-picker'
import { type AllowedTime, type Format } from '../time-picker/props'
import { defineListenerProp, pickProps } from '../utils/components'

export const props = {
  modelValue: {
    type: String,
    default: undefined,
  },
  show: {
    type: Boolean,
    default: undefined,
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
  popupProps: {
    type: Object as PropType<Partial<ExtractPropTypes<typeof popupProps>>>,
    default: () => ({}),
  },
  readonly: Boolean,
  onFocus: defineListenerProp<() => void>(),
  onBlur: defineListenerProp<() => void>(),
  onClose: defineListenerProp<(value: string | undefined) => void>(),
  onChange: defineListenerProp<(value: string | undefined) => void>(),
  onClear: defineListenerProp<(value: string | undefined) => void>(),
  'onUpdate:modelValue': defineListenerProp<(value: string | undefined) => void>(),
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

export type TimeProps = ExtractPropTypes<typeof props>
