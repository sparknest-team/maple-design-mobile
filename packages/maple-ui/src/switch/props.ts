import { defineListenerProp } from '../utils/components'

export const props = {
  modelValue: {
    default: false,
  },
  activeValue: {
    default: true,
  },
  inactiveValue: {
    default: false,
  },
  lazyChange: Boolean,
  disabled: Boolean,
  readonly: Boolean,
  loading: Boolean,
  color: String,
  loadingColor: String,
  closeColor: String,
  size: [String, Number],
  variant: Boolean,
  ripple: {
    type: Boolean,
    default: true,
  },
  buttonElevation: {
    type: [Boolean, String, Number],
    default: true,
  },
  onClick: defineListenerProp<(event: Event) => void>(),
  onBeforeChange: defineListenerProp<(value: any, change: (value: any) => void) => void>(),
  onChange: defineListenerProp<(value: any) => void>(),
  'onUpdate:modelValue': defineListenerProp<(value: any) => void>(),
}
