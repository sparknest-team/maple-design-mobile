import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import { rateProps } from './props'
import Rate from './rate-core'

withInstall(Rate)
withPropsDefaultsSetter(Rate, rateProps)

export { rateProps }
export type { RateColor, RateIcon, RateProps } from './props'

export type RateInstance = InstanceType<typeof Rate>
export const _RateComponent: typeof Rate = Rate

export default Rate
