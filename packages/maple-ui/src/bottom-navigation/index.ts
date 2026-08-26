import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import BottomNavigation from './BottomNavigation.vue'
import { props as bottomNavigationProps } from './props'

withInstall(BottomNavigation)
withPropsDefaultsSetter(BottomNavigation, bottomNavigationProps)

export { bottomNavigationProps }

export type BottomNavigationInstance = InstanceType<typeof BottomNavigation>
export const _BottomNavigationComponent = BottomNavigation

export default BottomNavigation
