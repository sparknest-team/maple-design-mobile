import { withPropsDefaultsSetter } from '../utils/components'
import Checkbox from './presentation'
import { checkboxProps } from './props'

const Component: typeof Checkbox & { setPropsDefaults: (defaults: Record<string, any>) => void } =
  withPropsDefaultsSetter(Checkbox, checkboxProps)

export default Component
