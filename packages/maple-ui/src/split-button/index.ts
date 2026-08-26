import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import { splitButtonProps } from './props'
import SplitButton from './SplitButton.vue'

withInstall(SplitButton)
withPropsDefaultsSetter(SplitButton, splitButtonProps)

export type SplitButtonInstance = InstanceType<typeof SplitButton>
export type { SplitButtonProps } from './props'
export { splitButtonProps }
export const _SplitButtonComponent = SplitButton
export default SplitButton
