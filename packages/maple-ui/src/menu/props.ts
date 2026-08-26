import { VNode, VNodeChild, type ExtractPropTypes, type PropType } from 'vue'
import { triggerProps, type TriggerPlacement } from '../trigger'
import { pickProps } from '../utils/components'
import { type FieldNames } from '../utils/options'

export type MenuSize = 'normal' | 'mini' | 'small' | 'large'

export type MenuOptionLabelRender = (option: MenuOption, checked: boolean) => VNodeChild

export type MenuOptionLabel = string | VNode | MenuOptionLabelRender

export interface MenuOption {
  label?: MenuOptionLabel
  value?: any
  children?: MenuOption[]
  disabled?: boolean
  ripple?: boolean
  [key: PropertyKey]: any

  _parent?: MenuOption
  _children?: MenuOption[]
  _rawOption?: MenuOption
}

export const props = {
  modelValue: {
    type: [String, Number, Boolean, Array] as PropType<any>,
    default: undefined,
  },
  options: {
    type: Array as PropType<MenuOption[]>,
    default: () => [],
  },
  fieldNames: {
    type: Object as PropType<FieldNames>,
    default: undefined,
  },
  size: {
    type: String as PropType<MenuSize>,
    default: 'normal',
  },
  multiple: Boolean,
  popupMaxHeight: {
    type: [Boolean, Number] as PropType<boolean | number>,
    default: true,
  },
  hideOnSelect: {
    type: Boolean,
    default: true,
  },
  autoFitPopupWidth: Boolean,
  open: {
    type: Boolean,
    default: undefined,
  },
  defaultOpen: Boolean,
  elevation: {
    type: [Boolean, String, Number],
    default: true,
  },
  ...pickProps(triggerProps, [
    'disabled',
    'trigger',
    'reference',
    'strategy',
    'offsetX',
    'offsetY',
    'popupContainer',
    'popupClass',
    'closeOnClickReference',
    'alignPoint',
  ]),
  placement: {
    type: String as PropType<TriggerPlacement>,
    default: 'bottom',
  },

  // internal start
  // internal end
}

export type MenuProps = ExtractPropTypes<typeof props>
