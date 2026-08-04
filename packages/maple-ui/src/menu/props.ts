import { VNode, VNodeChild, type PropType } from 'vue'
import { popoverProps } from '../popover'
import { defineListenerProp, pickProps } from '../utils/components'

export type MenuSize = 'normal' | 'mini' | 'small' | 'large'
export type MenuPosition = 'top' | 'tl' | 'tr' | 'bottom' | 'bl' | 'br'

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
  labelKey: {
    type: String,
    default: 'label',
  },
  valueKey: {
    type: String,
    default: 'value',
  },
  childrenKey: {
    type: String,
    default: 'children',
  },
  size: {
    type: String as PropType<MenuSize>,
    default: 'normal',
  },
  multiple: Boolean,
  scrollable: Boolean,
  closeOnSelect: {
    type: Boolean,
    default: true,
  },
  popupVisible: {
    type: Boolean,
    default: undefined,
  },
  defaultPopupVisible: Boolean,
  position: String as PropType<MenuPosition>,
  popupContainer: {
    type: [String, Object, Boolean] as PropType<import('vue').TeleportProps['to'] | false>,
    default: undefined,
  },
  hideOnSelect: {
    type: Boolean,
    default: undefined,
  },
  'onUpdate:modelValue': defineListenerProp<(value: any) => void>(),
  'onUpdate:popupVisible': defineListenerProp<(visible: boolean) => void>(),
  onPopupVisibleChange: defineListenerProp<(visible: boolean) => void>(),
  onSelect: defineListenerProp<(value: any, option: MenuOption) => void>(),
  ...pickProps(popoverProps, [
    'show',
    'disabled',
    'trigger',
    'reference',
    'placement',
    'strategy',
    'offsetX',
    'offsetY',
    'teleport',
    'sameWidth',
    'elevation',
    'popoverClass',
    'closeOnClickReference',
    'onOpen',
    'onOpened',
    'onClose',
    'onClosed',
    'onClickOutside',
    'onUpdate:show',
  ]),

  // internal start
  onKeyEscape: defineListenerProp<() => void>(),
  // internal end
}
