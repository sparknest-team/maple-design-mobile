import { type ExtractPublicPropTypes, type PropType, type VNode, type VNodeChild } from 'vue'
import { inputProps } from '../input'
import { pickProps } from '../utils/components'
import { type FieldNames } from '../utils/options'
import { popupContainerProp } from '../utils/popup-container'

export type AutoCompleteOptionLabelRender = (option: AutoCompleteOption, checked: boolean) => VNodeChild

export type AutoCompleteOptionLabel = string | VNode | AutoCompleteOptionLabelRender

export interface AutoCompleteOption {
  label?: AutoCompleteOptionLabel
  value?: any
  disabled?: boolean

  [key: PropertyKey]: any
}

export const props = {
  popupContainer: popupContainerProp,
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
  shouldOpen: {
    type: Function as PropType<(inputValue: string) => boolean>,
    default: (inputValue: string) => inputValue.length > 0,
  },
  filterOption: {
    type: [Boolean, Function] as PropType<boolean | ((inputValue: string, option: AutoCompleteOption) => boolean)>,
    default: true,
  },
  strict: Boolean,
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

export type AutoCompleteProps = ExtractPublicPropTypes<typeof props>
