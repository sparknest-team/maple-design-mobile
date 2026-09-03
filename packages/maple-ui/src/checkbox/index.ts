import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import _Checkbox from './Checkbox.vue'
import CheckboxGroup from './CheckboxGroup.vue'
import { props as checkboxGroupProps } from './group-props'
import { props as checkboxProps } from './props'

const Checkbox = withInstall(
  _Checkbox,
  Object.assign(_Checkbox, {
    Group: CheckboxGroup,
  }),
  { components: [_Checkbox, CheckboxGroup] },
)

withPropsDefaultsSetter(Checkbox, checkboxProps)
withPropsDefaultsSetter(CheckboxGroup, checkboxGroupProps)

export { checkboxProps, checkboxGroupProps, Checkbox, CheckboxGroup }

export type CheckboxInstance = InstanceType<typeof _Checkbox>
export type CheckboxGroupInstance = InstanceType<typeof CheckboxGroup>
export const _CheckboxComponent = Checkbox
export const _CheckboxGroupComponent = CheckboxGroup

export default Checkbox
