import { withInstall } from '../utils/components'
import BackTopSource from './BackTop.vue'
import { backTopProps } from './props'

const BackTop = withInstall(BackTopSource)
export { BackTop, backTopProps }
export type { BackTopProps, BackTopTarget, BackTopEasing } from './props'
export type BackTopInstance = InstanceType<typeof BackTop>
export const _BackTopComponent: typeof BackTop = BackTop
export default BackTop
