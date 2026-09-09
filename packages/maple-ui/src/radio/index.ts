import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import { props as radioGroupProps } from './group-props'
import { props as radioProps } from './props'
import _Radio from './Radio.vue'
import RadioGroup from './RadioGroup.vue'

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

export type RadioInstance = InstanceType<typeof _Radio>
export type RadioGroupInstance = InstanceType<typeof RadioGroup>
export const _RadioComponent: typeof Radio = Radio
export const _RadioGroupComponent: typeof RadioGroup = RadioGroup

export default Radio
export type RadioProps = import('vue').ExtractPublicPropTypes<typeof import('./props').props>
export type RadioGroupProps = import('vue').ExtractPublicPropTypes<typeof import('./group-props').props>
