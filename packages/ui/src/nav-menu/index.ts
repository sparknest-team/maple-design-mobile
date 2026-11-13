import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import { navMenuItemProps } from './item-props'
import _NavMenu from './NavMenu'
import _NavMenuItem from './NavMenuItem'
import { navMenuProps } from './props'

const NavMenuItem: import('../utils/components').ComponentWithInstall<typeof _NavMenuItem> = withInstall(_NavMenuItem)
const NavMenu: import('../utils/components').ComponentWithInstall<typeof _NavMenu & { Item: typeof NavMenuItem }> =
  withInstall(_NavMenu, Object.assign(_NavMenu, { Item: NavMenuItem }), {
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
export const _NavMenuComponent: typeof NavMenu = NavMenu
export const _NavMenuItemComponent: typeof NavMenuItem = NavMenuItem
export default NavMenu
