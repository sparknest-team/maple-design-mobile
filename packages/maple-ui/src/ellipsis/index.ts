import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import Ellipsis from './Ellipsis.vue'
import { props as ellipsisProps } from './props'

withInstall(Ellipsis)
withPropsDefaultsSetter(Ellipsis, ellipsisProps)

export { ellipsisProps }

export type EllipsisInstance = InstanceType<typeof Ellipsis>
export const _EllipsisComponent: typeof Ellipsis = Ellipsis

export default Ellipsis
export type EllipsisProps = import('vue').ExtractPublicPropTypes<typeof import('./props').props>
