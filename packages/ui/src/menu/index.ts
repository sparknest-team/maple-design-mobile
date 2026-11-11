import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import _Menu from './Menu.vue'
import _MenuOption from './MenuOption.vue'
import { props as menuOptionProps } from './option-props'
import { props as menuProps } from './props'

const Menu: typeof _Menu & {
  Option: typeof _MenuOption
  install?: (app: import('vue').App) => void
} = withInstall(
  _Menu,
  Object.assign(_Menu, {
    Option: _MenuOption,
  }),
  { components: [_Menu, _MenuOption] },
)

withPropsDefaultsSetter(Menu, menuProps)
withPropsDefaultsSetter(_MenuOption, menuOptionProps)

export { menuProps, menuOptionProps, Menu, _MenuOption as MenuOption }

export type {
  MenuProps,
  MenuPlacement,
  MenuValue,
  MenuOptionData,
  MenuFieldNames,
  MenuContent,
  MenuRenderContext,
  MenuOptionLabel,
  MenuOptionLabelRender,
} from './types'
export type { MenuSize } from './props'
export type { MenuOptionProps } from './option-props'

export type MenuInstance = InstanceType<typeof _Menu>
export type MenuOptionInstance = InstanceType<typeof _MenuOption>

export const _MenuComponent: typeof Menu = Menu
export const _MenuOptionComponent: typeof _MenuOption = _MenuOption

export default Menu

export type { MenuStrategy, MenuSubmenuTrigger, MenuReference } from './types'

export type { MenuSlots, MenuOptionSlots } from './types'
