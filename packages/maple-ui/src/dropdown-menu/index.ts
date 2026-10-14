import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import _DropdownMenu from './DropdownMenu.vue'
import _MenuOption from './MenuOption.vue'
import { props as menuOptionProps } from './option-props'
import { props as dropdownMenuProps } from './props'

const DropdownMenu: typeof _DropdownMenu & {
  Option: typeof _MenuOption
  install?: (app: import('vue').App) => void
} = withInstall(
  _DropdownMenu,
  Object.assign(_DropdownMenu, {
    Option: _MenuOption,
  }),
  { components: [_DropdownMenu, _MenuOption] },
)

withPropsDefaultsSetter(DropdownMenu, dropdownMenuProps)
withPropsDefaultsSetter(_MenuOption, menuOptionProps)

export { dropdownMenuProps, menuOptionProps, DropdownMenu, _MenuOption as MenuOption }

export type {
  DropdownMenuProps,
  DropdownMenuPosition,
  MenuValue,
  DropdownMenuOption,
  DropdownMenuFieldNames,
  DropdownMenuContent,
  DropdownMenuRenderContext,
  MenuOptionLabel,
  MenuOptionLabelRender,
} from './types'
export type { DropdownMenuSize } from './props'
export type { MenuOptionProps } from './option-props'

export type DropdownMenuInstance = InstanceType<typeof _DropdownMenu>
export type MenuOptionInstance = InstanceType<typeof _MenuOption>

export const _DropdownMenuComponent: typeof DropdownMenu = DropdownMenu
export const _MenuOptionComponent: typeof _MenuOption = _MenuOption

export default DropdownMenu

export type { DropdownMenuStrategy, DropdownMenuSubmenuTrigger, DropdownMenuReference } from './types'
