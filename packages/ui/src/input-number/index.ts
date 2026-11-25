import { withInstall } from '../utils/components'
import InputNumberSource from './presentation'
import { inputNumberProps } from './props'

const InputNumber = withInstall(InputNumberSource)

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
