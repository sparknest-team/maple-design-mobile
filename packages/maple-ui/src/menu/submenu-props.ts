import type { PropType } from 'vue'
import { submenuTrigger } from './platform'
import { menuProps } from './props'
import type { MenuOptionData } from './types'

export const menuSubmenuProps = {
  selectable: Boolean,
  disabled: Boolean,
  trigger: { ...menuProps.trigger, default: submenuTrigger },
  placement: { ...menuProps.placement, default: 'right-start' },
  open: menuProps.open,
  defaultOpen: Boolean,
  unmountOnClose: menuProps.unmountOnClose,
  optionProps: Object,
  parentShow: { type: Boolean, default: undefined },
  option: Object as PropType<MenuOptionData>,
  options: menuProps.options,
  fieldNames: menuProps.fieldNames,
  highlightOptions: menuProps.options,
}
export type MenuSubmenuProps = import('vue').ExtractPublicPropTypes<typeof menuSubmenuProps>
