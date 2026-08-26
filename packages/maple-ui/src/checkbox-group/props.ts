import { VNode, VNodeChild, type PropType } from 'vue'
import { type FieldNames } from '../utils/options'

export type CheckboxGroupOptionLabelRender = (option: CheckboxGroupOption, checked: boolean) => VNodeChild

export interface CheckboxGroupOption {
  label?: string | VNode | CheckboxGroupOptionLabelRender
  value?: any
  disabled?: boolean

  [key: PropertyKey]: any
}

export const props = {
  modelValue: {
    type: Array as PropType<Array<any>>,
    default: () => [],
  },
  max: [String, Number],
  options: {
    type: Array as PropType<CheckboxGroupOption[]>,
    default: () => [],
  },
  fieldNames: {
    type: Object as PropType<FieldNames>,
    default: undefined,
  },
  direction: {
    type: String as PropType<'horizontal' | 'vertical'>,
    default: 'horizontal',
  },
}
