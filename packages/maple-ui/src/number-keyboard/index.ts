import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import NumberKeyboard from './NumberKeyboard.vue'
import { props as numberKeyboardProps } from './props'

withInstall(NumberKeyboard)
withPropsDefaultsSetter(NumberKeyboard, numberKeyboardProps)

export { numberKeyboardProps }
export type { NumberKeyboardTheme } from './props'

export type NumberKeyboardInstance = InstanceType<typeof NumberKeyboard>
export const _NumberKeyboardComponent = NumberKeyboard

export default NumberKeyboard
