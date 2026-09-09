import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import _Button from './Button.vue'
import ButtonGroup from './ButtonGroup.vue'
import { buttonGroupProps } from './group-props'
import { buttonProps } from './props'

const Button = withInstall(
  _Button,
  Object.assign(_Button, {
    Group: ButtonGroup,
  }),
  { components: [_Button, ButtonGroup] },
)

withPropsDefaultsSetter(Button, buttonProps)
withPropsDefaultsSetter(ButtonGroup, buttonGroupProps)

export { buttonProps, buttonGroupProps, Button, ButtonGroup }
export { componentSizes, semanticStatuses } from '../utils/constants'
export type { ComponentSize, SemanticStatus } from '../utils/constants'
export type { ButtonProps, ButtonVariant, ButtonLoadingMode, ButtonHandler } from './props'
export type { ButtonGroupProps } from './group-props'

export type ButtonInstance = InstanceType<typeof _Button>
export type ButtonGroupInstance = InstanceType<typeof ButtonGroup>
export const _ButtonComponent: typeof Button = Button
export const _ButtonGroupComponent: typeof ButtonGroup = ButtonGroup

export default Button
