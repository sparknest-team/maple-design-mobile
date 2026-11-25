import { withInstall } from '../utils/components'
import NumberKeyboardSource from './NumberKeyboard.vue'
import { props as numberKeyboardProps } from './props'

const NumberKeyboard = withInstall(NumberKeyboardSource)

export { numberKeyboardProps }
export type { NumberKeyboardTheme } from './props'

export type NumberKeyboardInstance = InstanceType<typeof NumberKeyboard>
export const _NumberKeyboardComponent: typeof NumberKeyboard = NumberKeyboard

export default NumberKeyboard
export type NumberKeyboardProps = import('../_utils/public-props').CompatiblePublicProps<typeof import('./props').props>
