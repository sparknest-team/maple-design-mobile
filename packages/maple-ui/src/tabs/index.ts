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
export const _TabsComponent = Tabs
export const _TabComponent = Tab
export const _TabItemComponent = TabItem
export const _TabsItemsComponent = TabsItems

export default Tabs
