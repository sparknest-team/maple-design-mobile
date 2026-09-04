import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import PageHeader from './PageHeader.vue'
import { pageHeaderProps } from './props'

withInstall(PageHeader)
withPropsDefaultsSetter(PageHeader, pageHeaderProps)

export { pageHeaderProps }
export type { PageHeaderProps, PageHeaderSlots } from './props'

export type PageHeaderInstance = InstanceType<typeof PageHeader>
export const _PageHeaderComponent = PageHeader

export default PageHeader
