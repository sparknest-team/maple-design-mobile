import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import Rate from './presentation'
import { rateProps } from './props'

withInstall(Rate)
withPropsDefaultsSetter(Rate, rateProps)

export { rateProps }
export type {
  RateColor,
  RateIcon,
  RateProps,
  RateExpose,
  RateEmits,
  RateCharacterSlotProps,
  RateSlots,
  RateReadScope,
} from './props'

export type RateInstance = import('./props').RateExpose & InstanceType<typeof Rate>
export const _RateComponent: typeof Rate = Rate

export default Rate
