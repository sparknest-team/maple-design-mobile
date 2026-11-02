import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import { navMenuItemProps } from './item-props'
import _NavMenu from './NavMenu'
import _NavMenuItem from './NavMenuItem'
import { navMenuProps } from './props'

const NavMenuItem = withInstall(_NavMenuItem)
const NavMenu = withInstall(_NavMenu, Object.assign(_NavMenu, { Item: NavMenuItem }), {
  components: [_NavMenu, _NavMenuItem],
})
withPropsDefaultsSetter(NavMenu, navMenuProps)
withPropsDefaultsSetter(NavMenuItem, navMenuItemProps)
export { NavMenu, NavMenuItem, navMenuProps, navMenuItemProps }
export type { NavMenuItemProps, NavMenuItemSlotContext, NavMenuItemExposed } from './item-props'
export type {
  NavMenuProps,
  NavMenuKey,
  NavMenuOption,
  NavMenuFieldNames,
  NavMenuContent,
  NavMenuRenderContext,
  NavMenuMode,
  NavMenuPopupLayout,
  NavMenuExposed,
} from './types'
export type NavMenuInstance = InstanceType<typeof _NavMenu> & import('./types').NavMenuExposed
export type NavMenuItemInstance = InstanceType<typeof _NavMenuItem> & import('./item-props').NavMenuItemExposed
export const _NavMenuComponent = NavMenu
export const _NavMenuItemComponent = NavMenuItem
export default NavMenu
