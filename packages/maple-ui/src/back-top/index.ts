import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import BackTop from './BackTop.vue'
import { props as backTopProps } from './props'

withInstall(BackTop)
withPropsDefaultsSetter(BackTop, backTopProps)

export { backTopProps }

export type BackTopInstance = InstanceType<typeof BackTop>
export const _BackTopComponent: typeof BackTop = BackTop

export default BackTop
export type BackTopProps = import('vue').ExtractPublicPropTypes<typeof import('./props').props>
