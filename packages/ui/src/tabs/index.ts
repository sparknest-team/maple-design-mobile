import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import { tabItemProps, tabNavProps, tabPaneProps, tabsItemsProps, tabsNavsProps, tabsProps } from './props'
import _TabItem from './TabItem.vue'
import _TabNav from './TabNav.vue'
import _TabPane from './TabPane.vue'
import _Tabs from './Tabs.vue'
import _TabsItems from './TabsItems.vue'
import _TabsNavs from './TabsNavs.vue'

const Tabs = withInstall(
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
export const _TabsComponent = Tabs
export const _TabNavComponent = _TabNav
export const _TabsNavsComponent = _TabsNavs
export const _TabItemComponent = _TabItem
export const _TabPaneComponent = _TabPane
export const _TabsItemsComponent = _TabsItems
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
