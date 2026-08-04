import { assert } from '@maplejs/maple-shared'
import { useParent } from '@maplejs/maple-use'
import { MENU_BIND_MENU_OPTION_KEY, type MenuProvider } from '../menu/provide'
import { type OptionProvider } from '../option/provide'

export interface MenuOptionProvider extends OptionProvider {}

export function useMenu() {
  const { index, parentProvider, bindParent } = useParent<MenuProvider, MenuOptionProvider>(MENU_BIND_MENU_OPTION_KEY)

  assert(!!bindParent, 'MenuOption', '<mp-menu-option/> must in <mp-menu/>')

  return {
    index,
    menu: parentProvider,
    bindMenu: bindParent,
  }
}
