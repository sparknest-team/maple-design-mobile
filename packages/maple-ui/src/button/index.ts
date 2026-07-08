import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import _Button from './Button.vue'
import { buttonProps } from './props'

withInstall(_Button)
withPropsDefaultsSetter(_Button, buttonProps)

export type ButtonInstance = InstanceType<typeof _Button>
export type { ButtonProps, ButtonStatus, ButtonVariant, ButtonSize, ButtonType } from './props'
export { buttonProps }

export const _ButtonComponent = _Button

export default _Button
