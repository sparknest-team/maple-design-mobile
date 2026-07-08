import { useParent } from '@maplejs/maple-use'
import { assert } from '@maplejs/maple-shared'
import { MENU_SELECT_BIND_MENU_OPTION_KEY, type MenuSelectProvider } from '../menu-select/provide'
import { type OptionProvider } from '../option/provide'

export interface MenuOptionProvider extends OptionProvider {}

export function useMenuSelect() {
  const { index, parentProvider, bindParent } = useParent<MenuSelectProvider, MenuOptionProvider>(
    MENU_SELECT_BIND_MENU_OPTION_KEY,
  )

  assert(!!bindParent, 'MenuOption', '<mp-menu-option/> must in <mp-menu-select/>')

  return {
    index,
    menuSelect: parentProvider,
    bindMenuSelect: bindParent,
  }
}
