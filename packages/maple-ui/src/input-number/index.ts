import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import InputNumber from './InputNumber.vue'
import { props as inputNumberProps } from './props'

withInstall(InputNumber)
withPropsDefaultsSetter(InputNumber, inputNumberProps)

export type InputNumberInstance = InstanceType<typeof InputNumber>
export type { InputNumberMode, InputNumberModelEvent, InputNumberProps, InputNumberSize } from './props'
export { inputNumberProps }

export const _InputNumberComponent = InputNumber

export default InputNumber
