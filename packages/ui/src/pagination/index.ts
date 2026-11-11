import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import Pagination from './Pagination.vue'
import { paginationProps } from './props'

withInstall(Pagination)
withPropsDefaultsSetter(Pagination, paginationProps)

export { paginationProps }
export type { PaginationProps } from './props'

export type PaginationInstance = InstanceType<typeof Pagination>
export const _PaginationComponent: typeof Pagination = Pagination

export default Pagination

export { Pagination }
export type { PaginationPageSizeProps } from './types'
