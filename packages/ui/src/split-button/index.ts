import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import { splitButtonProps } from './props'
import SplitButton from './SplitButton.vue'

withInstall(SplitButton)
withPropsDefaultsSetter(SplitButton, splitButtonProps)

export type SplitButtonInstance = InstanceType<typeof SplitButton>
export type { SplitButtonButtonProps, SplitButtonProps } from './props'
export { splitButtonProps, SplitButton }
export const _SplitButtonComponent: typeof SplitButton = SplitButton
export default SplitButton
