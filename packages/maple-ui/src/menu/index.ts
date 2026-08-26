import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import Menu from './Menu.vue'
import { props as menuProps } from './props'

withInstall(Menu)
withPropsDefaultsSetter(Menu, menuProps)

export { menuProps }
export type { MenuProps } from './props'

export type MenuInstance = InstanceType<typeof Menu>
export const _MenuComponent = Menu

export default Menu
