import { withInstall } from '../utils/components'
import Ellipsis from './Ellipsis.vue'
import { ellipsisProps } from './props'

withInstall(Ellipsis)
export { ellipsisProps }
export type { EllipsisProps, EllipsisExpandTrigger } from './props'
export type EllipsisInstance = InstanceType<typeof Ellipsis>
export const _EllipsisComponent = Ellipsis
export default Ellipsis
