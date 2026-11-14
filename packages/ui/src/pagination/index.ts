import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import PaginationSource from './Pagination.vue'
import { paginationProps } from './props'

const Pagination = withInstall(PaginationSource)
withPropsDefaultsSetter(Pagination, paginationProps)

export { paginationProps }
export type { PaginationProps } from './props'

export type PaginationInstance = InstanceType<typeof Pagination>
export const _PaginationComponent: typeof Pagination = Pagination

export default Pagination

export { Pagination }
export type { PaginationPageSizeProps } from './types'
