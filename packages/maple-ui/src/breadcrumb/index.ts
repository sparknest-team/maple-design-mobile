import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import _Breadcrumb from './Breadcrumb.vue'
import BreadcrumbItem from './BreadcrumbItem.vue'
import { props as breadcrumbItemProps } from './item-props'
import { props as breadcrumbProps } from './props'

const Breadcrumb = withInstall(
  _Breadcrumb,
  Object.assign(_Breadcrumb, {
    Item: BreadcrumbItem,
  }),
  { components: [_Breadcrumb, BreadcrumbItem] },
)

withPropsDefaultsSetter(Breadcrumb, breadcrumbProps)
withPropsDefaultsSetter(BreadcrumbItem, breadcrumbItemProps)

export { breadcrumbProps, breadcrumbItemProps, Breadcrumb, BreadcrumbItem }
export type { BreadcrumbProps, BreadcrumbRoute, BreadcrumbMoreIconSlotData } from './props'
export type { BreadcrumbItemProps } from './item-props'

export type BreadcrumbInstance = InstanceType<typeof _Breadcrumb>
export type BreadcrumbItemInstance = InstanceType<typeof BreadcrumbItem>
export const _BreadcrumbComponent = Breadcrumb
export const _BreadcrumbItemComponent = BreadcrumbItem

export default Breadcrumb
