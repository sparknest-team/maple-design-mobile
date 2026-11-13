import { withPropsDefaultsSetter } from '../utils/components'
import Picker from './Picker.vue'
import { props } from './props'

const Component: typeof Picker & { setPropsDefaults: (defaults: Record<string, any>) => void } =
  withPropsDefaultsSetter(Picker, props)

export default Component
