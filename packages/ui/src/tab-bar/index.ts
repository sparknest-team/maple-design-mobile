import { withInstall } from '../utils/components'
import { props as tabBarItemProps } from './item-props'
import { props as tabBarProps } from './props'
import _TabBar from './TabBar.vue'
import TabBarItem from './TabBarItem.vue'

const TabBar: import('../utils/components').ComponentWithInstall<typeof _TabBar & { Item: typeof TabBarItem }> =
  withInstall(
    _TabBar,
    Object.assign(_TabBar, {
      Item: TabBarItem,
    }),
    { components: [_TabBar, TabBarItem] },
  )

export { tabBarProps, tabBarItemProps, TabBar, TabBarItem }

export type TabBarInstance = InstanceType<typeof _TabBar>
export type TabBarItemInstance = InstanceType<typeof TabBarItem>
export const _TabBarComponent: typeof TabBar = TabBar
export const _TabBarItemComponent: typeof TabBarItem = TabBarItem

export default TabBar
export type TabBarProps = import('../_utils/public-props').CompatiblePublicProps<typeof import('./props').props>
export type TabBarItemProps = import('../_utils/public-props').CompatiblePublicProps<
  typeof import('./item-props').props
>
export type { TabBarVariant, TabBarBeforeChange } from './props'
