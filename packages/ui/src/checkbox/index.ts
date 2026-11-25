import { withInstall } from '../utils/components'
import _Checkbox from './base'
import CheckboxGroup from './group-presentation'
import { checkboxGroupProps, checkboxProps } from './props'

const Checkbox: typeof _Checkbox & { Group: typeof CheckboxGroup; install: (app: import('vue').App) => void } =
  withInstall(
    _Checkbox,
    Object.assign(_Checkbox, {
      Group: CheckboxGroup,
    }),
    { components: [_Checkbox, CheckboxGroup] },
  ) as typeof _Checkbox & { Group: typeof CheckboxGroup; install: (app: import('vue').App) => void }

export { checkboxProps, checkboxGroupProps, Checkbox, CheckboxGroup }

export type CheckboxInstance = InstanceType<typeof _Checkbox> & import('./props').CheckboxMethods
export type CheckboxGroupInstance = InstanceType<typeof CheckboxGroup> &
  import('./use-checkbox-group-methods').CheckboxGroupMethods
export const _CheckboxComponent: typeof Checkbox = Checkbox
export const _CheckboxGroupComponent: typeof CheckboxGroup = CheckboxGroup

export default Checkbox
export type { CheckboxProps, CheckboxGroupProps, CheckboxValue } from './props'

export type { CheckboxMethods, CheckboxModel } from './props'

export type { CheckboxOption } from './types'
export type { ChoiceFieldNames } from './choice-options'

export type { CheckboxGroupMethods } from './use-checkbox-group-methods'

export type { CheckboxSlots, CheckboxGroupSlots } from './types'
