import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import { props as tabBarItemProps } from './item-props'
import { props as tabBarProps } from './props'
import _TabBar from './TabBar.vue'
import TabBarItem from './TabBarItem.vue'

const TabBar = withInstall(
  _TabBar,
  Object.assign(_TabBar, {
    Item: TabBarItem,
  }),
  { components: [_TabBar, TabBarItem] },
)

withPropsDefaultsSetter(TabBar, tabBarProps)
withPropsDefaultsSetter(TabBarItem, tabBarItemProps)

export { tabBarProps, tabBarItemProps, TabBar, TabBarItem }

export type TabBarInstance = InstanceType<typeof _TabBar>
export type TabBarItemInstance = InstanceType<typeof TabBarItem>
export const _TabBarComponent: typeof TabBar = TabBar
export const _TabBarItemComponent: typeof TabBarItem = TabBarItem

export default TabBar
export type TabBarProps = import('vue').ExtractPublicPropTypes<typeof import('./props').props>
export type TabBarItemProps = import('vue').ExtractPublicPropTypes<typeof import('./item-props').props>
export type { TabBarVariant } from './props'
