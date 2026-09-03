import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import _BottomNavigation from './BottomNavigation.vue'
import BottomNavigationItem from './BottomNavigationItem.vue'
import { props as bottomNavigationItemProps } from './item-props'
import { props as bottomNavigationProps } from './props'

const BottomNavigation = withInstall(
  _BottomNavigation,
  Object.assign(_BottomNavigation, {
    Item: BottomNavigationItem,
  }),
  { components: [_BottomNavigation, BottomNavigationItem] },
)

withPropsDefaultsSetter(BottomNavigation, bottomNavigationProps)
withPropsDefaultsSetter(BottomNavigationItem, bottomNavigationItemProps)

export { bottomNavigationProps, bottomNavigationItemProps, BottomNavigation, BottomNavigationItem }

export type BottomNavigationInstance = InstanceType<typeof _BottomNavigation>
export type BottomNavigationItemInstance = InstanceType<typeof BottomNavigationItem>
export const _BottomNavigationComponent = BottomNavigation
export const _BottomNavigationItemComponent = BottomNavigationItem

export default BottomNavigation
