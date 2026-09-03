import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import { props as menuGroupProps } from './group-props'
import _Menu from './Menu.vue'
import MenuGroup from './MenuGroup.vue'
import MenuOption from './MenuOption.vue'
import { props as menuOptionProps } from './option-props'
import { props as menuProps } from './props'

const Menu = withInstall(
  _Menu,
  Object.assign(_Menu, {
    Option: MenuOption,
    Group: MenuGroup,
  }),
  { components: [_Menu, MenuOption, MenuGroup] },
)

withPropsDefaultsSetter(Menu, menuProps)
withPropsDefaultsSetter(MenuOption, menuOptionProps)
withPropsDefaultsSetter(MenuGroup, menuGroupProps)

export { menuProps, menuOptionProps, menuGroupProps, Menu, MenuOption, MenuGroup }
export type { MenuProps } from './props'
export type { MenuOptionProps } from './option-props'
export type { MenuGroupProps } from './group-props'

export type MenuInstance = InstanceType<typeof _Menu>
export type MenuOptionInstance = InstanceType<typeof MenuOption>
export type MenuGroupInstance = InstanceType<typeof MenuGroup>
export const _MenuComponent = Menu
export const _MenuOptionComponent = MenuOption
export const _MenuGroupComponent = MenuGroup

export default Menu
