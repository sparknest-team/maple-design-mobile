import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import { tabItemProps, tabNavProps, tabPaneProps, tabsItemsProps, tabsNavsProps, tabsProps } from './props'
import _TabItem from './TabItem.vue'
import _TabNav from './TabNav.vue'
import _TabPane from './TabPane.vue'
import _Tabs from './Tabs.vue'
import _TabsItems from './TabsItems.vue'
import _TabsNavs from './TabsNavs.vue'

const Tabs: import('../utils/components').ComponentWithInstall<
  typeof _Tabs & {
    TabPane: typeof _TabPane
    TabNav: typeof _TabNav
    TabsNavs: typeof _TabsNavs
    TabItem: typeof _TabItem
    TabsItems: typeof _TabsItems
  }
> = withInstall(
  _Tabs,
  Object.assign(_Tabs, {
    TabPane: _TabPane,
    TabNav: _TabNav,
    TabsNavs: _TabsNavs,
    TabItem: _TabItem,
    TabsItems: _TabsItems,
  }),
  { components: [_Tabs, _TabPane, _TabNav, _TabsNavs, _TabItem, _TabsItems] },
)
withPropsDefaultsSetter(_Tabs, tabsProps)
withPropsDefaultsSetter(_TabNav, tabNavProps)
withPropsDefaultsSetter(_TabsNavs, tabsNavsProps)
withPropsDefaultsSetter(_TabItem, tabItemProps)
withPropsDefaultsSetter(_TabPane, tabPaneProps)
withPropsDefaultsSetter(_TabsItems, tabsItemsProps)
export type TabsInstance = InstanceType<typeof _Tabs>
export type TabNavInstance = InstanceType<typeof _TabNav>
export type TabsNavsInstance = InstanceType<typeof _TabsNavs>
export type TabItemInstance = InstanceType<typeof _TabItem>
export type TabPaneInstance = InstanceType<typeof _TabPane>
export type TabsItemsInstance = InstanceType<typeof _TabsItems>
export const _TabsComponent: typeof Tabs = Tabs
export const _TabNavComponent: typeof _TabNav = _TabNav
export const _TabsNavsComponent: typeof _TabsNavs = _TabsNavs
export const _TabItemComponent: typeof _TabItem = _TabItem
export const _TabPaneComponent: typeof _TabPane = _TabPane
export const _TabsItemsComponent: typeof _TabsItems = _TabsItems
export {
  Tabs,
  _TabPane as TabPane,
  _TabNav as TabNav,
  _TabsNavs as TabsNavs,
  _TabItem as TabItem,
  _TabsItems as TabsItems,
}
export * from './props'
export type {
  TabsEmits,
  TabsSlots,
  TabNavSlots,
  TabPaneSlots,
  TabsNavsSlots,
  TabsItemsSlots,
  TabItemSlots,
  TabsNavsExpose,
} from './types'
export default Tabs
