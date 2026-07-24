import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import Breadcrumb from './Breadcrumb.vue'
import { props as breadcrumbProps } from './props'

withInstall(Breadcrumb)
withPropsDefaultsSetter(Breadcrumb, breadcrumbProps)

export { breadcrumbProps }
export type { BreadcrumbProps, BreadcrumbRoute } from './props'

export const _BreadcrumbComponent = Breadcrumb

export default Breadcrumb
