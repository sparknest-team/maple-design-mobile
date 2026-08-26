import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import MenuGroup from './MenuGroup.vue'
import { props as menuGroupProps } from './props'

withInstall(MenuGroup)
withPropsDefaultsSetter(MenuGroup, menuGroupProps)

export { menuGroupProps }
export type { MenuGroupProps } from './props'

export type MenuGroupInstance = InstanceType<typeof MenuGroup>
export const _MenuGroupComponent = MenuGroup

export default MenuGroup
