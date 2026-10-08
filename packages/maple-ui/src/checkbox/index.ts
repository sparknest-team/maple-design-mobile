import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import _Checkbox from './Checkbox.vue'
import CheckboxGroup from './CheckboxGroup.vue'
import { props as checkboxGroupProps } from './group-props'
import { props as checkboxProps } from './props'

const Checkbox: typeof _Checkbox & { Group: typeof CheckboxGroup; install?: (app: import('vue').App) => void } =
  withInstall(
    _Checkbox,
    Object.assign(_Checkbox, {
      Group: CheckboxGroup,
    }),
    { components: [_Checkbox, CheckboxGroup] },
  )

withPropsDefaultsSetter(Checkbox, checkboxProps)
withPropsDefaultsSetter(CheckboxGroup, checkboxGroupProps)

export { checkboxProps, checkboxGroupProps, Checkbox, CheckboxGroup }

export type CheckboxInstance = InstanceType<typeof _Checkbox> & import('./props').CheckboxMethods
export type CheckboxGroupInstance = InstanceType<typeof CheckboxGroup> &
  import('./use-checkbox-group-methods').CheckboxGroupMethods
export const _CheckboxComponent: typeof Checkbox = Checkbox
export const _CheckboxGroupComponent: typeof CheckboxGroup = CheckboxGroup

export default Checkbox
export type CheckboxProps = import('vue').ExtractPublicPropTypes<typeof import('./props').props>
export type CheckboxGroupProps = import('vue').ExtractPublicPropTypes<typeof import('./group-props').props>

export type { CheckboxMethods, CheckboxModel } from './props'

export type { CheckboxOption } from './types'
export type { ChoiceFieldNames } from './choice-options'

export type { CheckboxGroupMethods } from './use-checkbox-group-methods'
