import { withPropsDefaultsSetter } from '../utils/components'
import Input from './Input.vue'
import { inputProps } from './props'

const Component: typeof Input & { setPropsDefaults: (defaults: Record<string, any>) => void } = withPropsDefaultsSetter(
  Input,
  inputProps,
)

export default Component
