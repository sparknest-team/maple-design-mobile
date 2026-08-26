import type { PropType } from 'vue'
import { defineListenerProp } from '../utils/components'

export type SwitchVariant = 'standard' | 'md3'

export const props = {
  modelValue: {
    default: false,
  },
  checkedValue: {
    default: true,
  },
  uncheckedValue: {
    default: false,
  },
  lazyChange: Boolean,
  disabled: Boolean,
  readonly: Boolean,
  loading: Boolean,
  checkedColor: String,
  loadingColor: String,
  uncheckedColor: String,
  size: [String, Number],
  variant: {
    type: String as PropType<SwitchVariant>,
    default: 'standard',
  },
  ripple: {
    type: Boolean,
    default: true,
  },
  handleElevation: {
    type: [Boolean, String, Number],
    default: true,
  },
  beforeChange: defineListenerProp<(value: any, change: (value: any) => void) => void>(),
}
