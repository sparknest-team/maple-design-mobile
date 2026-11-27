import type { WithNativeAttributes } from '../_utils/native-listener-types'
import { withPropsDefaultsSetter } from '../utils/components'
import Button from './Button.vue'
import { buttonProps } from './props'

const Component: WithNativeAttributes<
  typeof Button,
  'aria-label' | 'aria-haspopup' | 'aria-expanded' | 'aria-pressed' | 'title'
> & { setPropsDefaults: (defaults: Record<string, any>) => void } = withPropsDefaultsSetter(Button, buttonProps)

export default Component
