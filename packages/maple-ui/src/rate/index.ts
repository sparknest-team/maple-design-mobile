import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import { props as rateProps } from './props'
import Rate from './Rate.vue'

withInstall(Rate)
withPropsDefaultsSetter(Rate, rateProps)

export { rateProps }

export type RateInstance = InstanceType<typeof Rate>
export const _RateComponent: typeof Rate = Rate

export default Rate
export type RateProps = import('vue').ExtractPublicPropTypes<typeof import('./props').props>
