import type { PropType } from 'vue'

export const props = {
  modelValue: {
    type: [String, Number, Boolean, Object, Array] as PropType<any>,
    default: false,
  },
  value: {
    type: [String, Number, Boolean, Object, Array] as PropType<any>,
    default: true,
  },
  checkedColor: String,
  uncheckedColor: String,
  disabled: Boolean,
  readonly: Boolean,
  indeterminate: Boolean,
  iconSize: [String, Number],
  ripple: {
    type: Boolean,
    default: true,
  },
}
