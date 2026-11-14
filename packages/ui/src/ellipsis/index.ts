import { withInstall } from '../utils/components'
import EllipsisSource from './Ellipsis.vue'
import { ellipsisProps } from './props'

const Ellipsis = withInstall(EllipsisSource)
export { Ellipsis, ellipsisProps }
export type { EllipsisProps, EllipsisExpandTrigger } from './props'
export type EllipsisInstance = InstanceType<typeof Ellipsis>
export const _EllipsisComponent: typeof Ellipsis = Ellipsis
export default Ellipsis
