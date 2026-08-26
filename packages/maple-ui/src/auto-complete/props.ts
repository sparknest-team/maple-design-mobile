import { type PropType, type VNode, type VNodeChild } from 'vue'
import { inputProps } from '../input'
import { pickProps } from '../utils/components'
import { type FieldNames } from '../utils/options'

export type AutoCompleteOptionLabelRender = (option: AutoCompleteOption, checked: boolean) => VNodeChild

export type AutoCompleteOptionLabel = string | VNode | AutoCompleteOptionLabelRender

export interface AutoCompleteOption {
  label?: AutoCompleteOptionLabel
  value?: any
  disabled?: boolean

  [key: PropertyKey]: any
}

export const props = {
  modelValue: String,
  options: {
    type: Array as PropType<Array<AutoCompleteOption>>,
    default: () => [],
  },
  fieldNames: {
    type: Object as PropType<FieldNames>,
    default: undefined,
  },
  maxLength: [String, Number],
  readonly: Boolean,
  disabled: Boolean,
  getShow: Function as PropType<(v: string) => boolean>,
  ...pickProps(inputProps, [
    'size',
    'variant',
    'placeholder',
    'enterkeyhint',
    'line',
    'hint',
    'textColor',
    'focusColor',
    'blurColor',
    'clearable',
  ]),
}
