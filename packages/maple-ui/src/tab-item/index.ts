import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import { props as tabItemProps } from './props'
import TabItem from './TabItem.vue'

withInstall(TabItem)
withPropsDefaultsSetter(TabItem, tabItemProps)

export { tabItemProps }

export type TabItemInstance = InstanceType<typeof TabItem>
export const _TabItemComponent = TabItem

export default TabItem
