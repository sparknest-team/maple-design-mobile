import type { PropType } from 'vue'
import {
  componentSizes,
  menuDefaults,
  rootPlatformProps,
  triggerPropDefaults,
  type ComponentSize,
  type MenuPosition,
  type MenuReference,
} from './platform'
import type { MenuFieldNames } from './selection'
import type { MenuOptionData, MenuValue } from './types'

export type { MenuOptionData as MenuOption, MenuOptionLabel, MenuOptionLabelRender } from './types'
export type MenuSize = ComponentSize
export const menuProps = {
  options: { type: Array as PropType<MenuOptionData[]>, default: () => [] },
  fieldNames: Object as PropType<MenuFieldNames>,
  modelValue: { type: [String, Number, Boolean, Object, Array] as PropType<MenuValue>, default: undefined },
  multiple: Boolean,
  size: {
    type: String as PropType<ComponentSize>,
    default: 'md',
    validator: (value: unknown) => componentSizes.includes(value as ComponentSize),
  },
  open: { type: Boolean, default: undefined },
  defaultOpen: Boolean,
  unmountOnClose: { type: Boolean, default: menuDefaults.unmountOnClose },
  trigger: {
    type: [String, Array] as PropType<
      'click' | 'hover' | 'focus' | 'contextMenu' | ('click' | 'hover' | 'focus' | 'contextMenu')[]
    >,
    default: 'click',
  },
  placement: { type: String as PropType<MenuPosition>, default: 'bottom' },
  reference: { type: [String, Object] as PropType<MenuReference>, default: undefined },
  ...rootPlatformProps,
  popupContainer: triggerPropDefaults.popupContainer,
  popupClass: [String, Array, Object],
  offsetX: { type: [String, Number], default: 0 },
  offsetY: { type: [String, Number], default: 0 },
  mouseEnterDelay: { type: Number, default: 0 },
  mouseLeaveDelay: { type: Number, default: 0 },
  closeOnClickReference: { type: Boolean, default: menuDefaults.closeOnClickReference },
  cover: Boolean,
  popupMaxHeight: { type: [Boolean, Number], default: true },
  hideOnSelect: { type: Boolean, default: true },
  autoFitPopupWidth: Boolean,
  disabled: Boolean,
  alignPoint: Boolean,
  elevation: { type: [Boolean, Number], default: true },
}
export const props = menuProps
export type MenuProps = import('vue').ExtractPublicPropTypes<typeof menuProps>
