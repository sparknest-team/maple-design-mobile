import { type PropType } from 'vue'

export const props = {
  modelValue: {
    type: [String, Number, Boolean, Object, Array] as PropType<any>,
    default: false,
  },
  value: {
    type: [String, Number, Boolean, Object, Array] as PropType<any>,
    default: true,
  },
  disabled: Boolean,
  readonly: Boolean,
  checkedColor: String,
  uncheckedColor: String,
  iconSize: [String, Number],
  ripple: {
    type: Boolean,
    default: true,
  },
}
