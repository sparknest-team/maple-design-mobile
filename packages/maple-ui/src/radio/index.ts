import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import { props as radioProps } from './props'
import Radio from './Radio.vue'

withInstall(Radio)
withPropsDefaultsSetter(Radio, radioProps)

export { radioProps }

export type RadioInstance = InstanceType<typeof Radio>
export const _RadioComponent = Radio

export default Radio
