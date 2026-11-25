import { withInstall } from '../utils/components'
import RateSource from './presentation'
import { rateProps } from './props'

const Rate = withInstall(RateSource)

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
