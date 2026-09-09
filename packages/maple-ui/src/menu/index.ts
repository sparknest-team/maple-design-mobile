import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import { props as menuGroupProps } from './group-props'
import _Menu from './Menu.vue'
import MenuSubmenu from './MenuChildren.vue'
import MenuGroup from './MenuGroup.vue'
import MenuOption from './MenuOption.vue'
import { props as menuOptionProps } from './option-props'
import { props as menuProps } from './props'
import { menuSubmenuProps } from './submenu-props'

const Menu: typeof _Menu & {
  Option: typeof MenuOption
  Group: typeof MenuGroup
  Submenu: typeof MenuSubmenu
  install?: (app: import('vue').App) => void
} = withInstall(
  _Menu,
  Object.assign(_Menu, {
    Option: MenuOption,
    Group: MenuGroup,
    Submenu: MenuSubmenu,
  }),
  { components: [_Menu, MenuOption, MenuGroup, MenuSubmenu] },
)

withPropsDefaultsSetter(Menu, menuProps)
withPropsDefaultsSetter(MenuOption, menuOptionProps)
withPropsDefaultsSetter(MenuGroup, menuGroupProps)

export { menuProps, menuOptionProps, menuGroupProps, Menu, MenuOption, MenuGroup }
export type { MenuProps, MenuOption as MenuOptionData } from './props'
export type { MenuFieldNames } from './selection'
export type { MenuOptionProps } from './option-props'
export type { MenuGroupProps } from './group-props'

export type MenuInstance = InstanceType<typeof _Menu>
export type MenuOptionInstance = InstanceType<typeof MenuOption>
export type MenuGroupInstance = InstanceType<typeof MenuGroup>
export const _MenuComponent: typeof Menu = Menu
export const _MenuOptionComponent: typeof MenuOption = MenuOption
export const _MenuGroupComponent: typeof MenuGroup = MenuGroup

export default Menu

withPropsDefaultsSetter(MenuSubmenu, menuSubmenuProps)
export { MenuSubmenu, menuSubmenuProps }
export type MenuSubmenuInstance = InstanceType<typeof MenuSubmenu>
export type { MenuSubmenuProps } from './submenu-props'
export const _MenuSubmenuComponent = MenuSubmenu
