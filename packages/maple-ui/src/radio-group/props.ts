import { VNode, VNodeChild, type PropType } from 'vue'
import { type FieldNames } from '../utils/options'

export type RadioGroupOptionLabelRender = (option: RadioGroupOption, checked: boolean) => VNodeChild

export interface RadioGroupOption {
  label?: string | VNode | RadioGroupOptionLabelRender
  value?: any
  disabled?: boolean

  [key: PropertyKey]: any
}

export type RadioGroupDirection = 'horizontal' | 'vertical'

export const props = {
  modelValue: {
    type: [String, Number, Boolean, Object, Array] as PropType<any>,
    default: undefined,
  },
  direction: {
    type: String as PropType<RadioGroupDirection>,
    default: 'horizontal',
  },
  options: {
    type: Array as PropType<RadioGroupOption[]>,
    default: () => [],
  },
  ariaLabel: {
    type: String,
    default: '',
  },
  fieldNames: {
    type: Object as PropType<FieldNames>,
    default: undefined,
  },
}
