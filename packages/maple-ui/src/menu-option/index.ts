import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import MenuOption from './MenuOption.vue'
import { props as menuOptionProps } from './props'

withInstall(MenuOption)
withPropsDefaultsSetter(MenuOption, menuOptionProps)

export { menuOptionProps }
export type { MenuOptionProps } from './props'

export type MenuOptionInstance = InstanceType<typeof MenuOption>
export const _MenuOptionComponent = MenuOption

export default MenuOption
