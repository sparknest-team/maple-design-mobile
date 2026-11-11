import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import RadioGroup from './group-presentation'
import _Radio from './presentation'
import { radioGroupProps, radioProps } from './props'

const Radio: typeof _Radio & { Group: typeof RadioGroup; install?: (app: import('vue').App) => void } = withInstall(
  _Radio,
  Object.assign(_Radio, {
    Group: RadioGroup,
  }),
  { components: [_Radio, RadioGroup] },
)

withPropsDefaultsSetter(Radio, radioProps)
withPropsDefaultsSetter(RadioGroup, radioGroupProps)

export { radioProps, radioGroupProps, Radio, RadioGroup }

export type RadioInstance = InstanceType<typeof _Radio> & import('./props').RadioMethods
export type RadioGroupInstance = InstanceType<typeof RadioGroup>
export const _RadioComponent: typeof Radio = Radio
export const _RadioGroupComponent: typeof RadioGroup = RadioGroup

export default Radio
export type RadioProps = import('vue').ExtractPublicPropTypes<typeof import('./props').radioProps>
export type RadioGroupProps = import('vue').ExtractPublicPropTypes<typeof import('./props').radioGroupProps>

export type { RadioMethods, RadioModel } from './props'

export type { RadioOption } from './types'

export type { RadioVariant } from './variant'

export type { RadioEmits, RadioGroupEmits, RadioSlots, RadioGroupSlots } from './props'
export type { RadioValue } from './props'
