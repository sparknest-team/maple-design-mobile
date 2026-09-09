import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import NumberKeyboard from './NumberKeyboard.vue'
import { props as numberKeyboardProps } from './props'

withInstall(NumberKeyboard)
withPropsDefaultsSetter(NumberKeyboard, numberKeyboardProps)

export { numberKeyboardProps }
export type { NumberKeyboardTheme } from './props'

export type NumberKeyboardInstance = InstanceType<typeof NumberKeyboard>
export const _NumberKeyboardComponent: typeof NumberKeyboard = NumberKeyboard

export default NumberKeyboard
export type NumberKeyboardProps = import('vue').ExtractPublicPropTypes<typeof import('./props').props>
