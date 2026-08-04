import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import Input from './Input.vue'
import { props as inputProps } from './props'

withInstall(Input)
withPropsDefaultsSetter(Input, inputProps)

export { inputProps }
export type InputInstance = InstanceType<typeof Input>
export type { InputProps, InputType } from './props'

export const _InputComponent = Input

export default Input
