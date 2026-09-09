import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import { props as tabsProps } from './props'
import { props as tabItemProps } from './tab-item-props'
import { props as tabProps } from './tab-props'
import Tab from './Tab.vue'
import TabItem from './TabItem.vue'
import { props as tabsItemsProps } from './tabs-items-props'
import _Tabs from './Tabs.vue'
import TabsItems from './TabsItems.vue'

const Tabs = withInstall(
  _Tabs,
  Object.assign(_Tabs, {
    Tab: Tab,
    TabItem: TabItem,
    TabsItems: TabsItems,
  }),
  { components: [_Tabs, Tab, TabItem, TabsItems] },
)

withPropsDefaultsSetter(Tabs, tabsProps)
withPropsDefaultsSetter(Tab, tabProps)
withPropsDefaultsSetter(TabItem, tabItemProps)
withPropsDefaultsSetter(TabsItems, tabsItemsProps)

export { tabsProps, tabProps, tabItemProps, tabsItemsProps, Tabs, Tab, TabItem, TabsItems }

export type TabsInstance = InstanceType<typeof _Tabs>
export type TabInstance = InstanceType<typeof Tab>
export type TabItemInstance = InstanceType<typeof TabItem>
export type TabsItemsInstance = InstanceType<typeof TabsItems>
export const _TabsComponent: typeof Tabs = Tabs
export const _TabComponent: typeof Tab = Tab
export const _TabItemComponent: typeof TabItem = TabItem
export const _TabsItemsComponent: typeof TabsItems = TabsItems

export default Tabs
export type TabsProps = import('vue').ExtractPublicPropTypes<typeof import('./props').props>
export type TabProps = import('vue').ExtractPublicPropTypes<typeof import('./tab-props').props>
export type TabItemProps = import('vue').ExtractPublicPropTypes<typeof import('./tab-item-props').props>
export type TabsItemsProps = import('vue').ExtractPublicPropTypes<typeof import('./tabs-items-props').props>
