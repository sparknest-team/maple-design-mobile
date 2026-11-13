import { withPropsDefaultsSetter } from '../utils/components'
import Button from './Button.vue'
import { buttonProps } from './props'

const Component: typeof Button & { setPropsDefaults: (defaults: Record<string, any>) => void } =
  withPropsDefaultsSetter(Button, buttonProps)

export default Component
