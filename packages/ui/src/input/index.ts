import { withInstall } from '../utils/components'
import _Input from './base'
import _InputGroup from './InputGroup.vue'
import _InputGroupLabel from './InputGroupLabel.vue'
import _InputPassword from './InputPassword.vue'
import { inputGroupProps, inputPasswordProps, inputProps } from './props'

const Input: import('../utils/components').ComponentWithInstall<
  typeof _Input & { Password: typeof _InputPassword; Group: typeof _InputGroup; GroupLabel: typeof _InputGroupLabel }
> = withInstall(
  _Input,
  Object.assign(_Input, {
    Password: _InputPassword,
    Group: _InputGroup,
    GroupLabel: _InputGroupLabel,
  }),
  { components: [_Input, _InputPassword, _InputGroup, _InputGroupLabel] },
)

export { inputProps }
export type InputInstance = InstanceType<typeof Input>
export { inputPasswordProps, inputGroupProps }
export type {
  InputMaxLength,
  InputGroupProps,
  InputPasswordProps,
  InputProps,
  InputType,
  InputVariant,
  WordLength,
  WordSlice,
} from './props'
export type InputPasswordInstance = InstanceType<typeof _InputPassword>
export type InputGroupInstance = InstanceType<typeof _InputGroup>
export type InputGroupLabelInstance = InstanceType<typeof _InputGroupLabel>

export const _InputComponent: typeof Input = Input
export const _InputPasswordComponent: typeof _InputPassword = _InputPassword
export const _InputGroupComponent: typeof _InputGroup = _InputGroup
export const _InputGroupLabelComponent: typeof _InputGroupLabel = _InputGroupLabel

export { Input, _InputPassword as InputPassword, _InputGroup as InputGroup, _InputGroupLabel as InputGroupLabel }

export default Input

export type {
  InputEmits,
  InputSlots,
  InputExpose,
  InputGroupSlots,
  InputPasswordEmits,
  InputPasswordSlots,
  InputPasswordExpose,
} from './types'
