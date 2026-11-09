import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import InputNumber from './presentation'
import { inputNumberProps } from './props'

withInstall(InputNumber)
withPropsDefaultsSetter(InputNumber, inputNumberProps)

export type InputNumberInstance = InstanceType<typeof InputNumber>
export type {
  InputNumberMode,
  InputNumberModelEvent,
  InputNumberProps,
  InputNumberSize,
  InputNumberVariant,
  InputNumberFormatter,
  InputNumberParser,
} from './props'
export { InputNumber, inputNumberProps }

export const _InputNumberComponent: typeof InputNumber = InputNumber

export default InputNumber

export type { InputNumberEmits, InputNumberSlots, InputNumberExpose } from './types'
