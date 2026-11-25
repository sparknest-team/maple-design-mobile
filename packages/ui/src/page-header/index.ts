import { withInstall } from '../utils/components'
import PageHeaderSource from './PageHeader.vue'
import { pageHeaderProps } from './props'

const PageHeader = withInstall(PageHeaderSource)

export { pageHeaderProps }
export type { PageHeaderProps, PageHeaderSlots } from './props'

export type PageHeaderInstance = InstanceType<typeof PageHeader>
export const _PageHeaderComponent: typeof PageHeader = PageHeader

export default PageHeader
