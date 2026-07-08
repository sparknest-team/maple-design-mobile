import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import BreadcrumbItem from './BreadcrumbItem.vue'
import { props as breadcrumbItemProps } from './props'

withInstall(BreadcrumbItem)
withPropsDefaultsSetter(BreadcrumbItem, breadcrumbItemProps)

export { breadcrumbItemProps }

export const _BreadcrumbItemComponent = BreadcrumbItem

export default BreadcrumbItem
