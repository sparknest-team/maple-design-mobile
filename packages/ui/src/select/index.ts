import type { CompatiblePublicProps } from '../_utils/public-props'
import { withInstall } from '../utils/components'
import { optgroupProps } from './optgroup-props'
import OptgroupComponent from './Optgroup.vue'
import OptionComponent from './Option.vue'
import { optionProps, selectProps } from './props'
import SelectComponent from './select'

const Select: import('../utils/components').ComponentWithInstall<
  typeof SelectComponent & { Option: typeof OptionComponent; OptGroup: typeof OptgroupComponent }
> = withInstall(
  SelectComponent,
  Object.assign(SelectComponent, { Option: OptionComponent, OptGroup: OptgroupComponent }),
  { components: [SelectComponent, OptionComponent, OptgroupComponent] },
)
const Option: import('../utils/components').ComponentWithInstall<typeof OptionComponent> = withInstall(OptionComponent)
const Optgroup: import('../utils/components').ComponentWithInstall<typeof OptgroupComponent> =
  withInstall(OptgroupComponent)
export { Select, Option, Optgroup, selectProps, optionProps }

export { optgroupProps }
export type OptgroupInstance = InstanceType<typeof OptgroupComponent>
export type OptgroupProps = CompatiblePublicProps<typeof optgroupProps>
export type { SelectProps, SelectEditMode } from './props'
export type {
  OptionSearchField,
  SelectOptionsLoader,
  SelectValue,
  SelectEmptyValue,
  SelectOption,
  SelectOptionData,
  SelectOptionTagProps,
  SelectOptionGroup,
  SelectFieldNames,
  FilterOption,
} from './types'
export type SelectInstance = InstanceType<typeof SelectComponent> & import('./types').SelectExpose
export type OptionInstance = InstanceType<typeof OptionComponent>
export type OptionProps = CompatiblePublicProps<typeof optionProps>
export const _SelectComponent: typeof Select = Select
export const _OptionComponent: typeof Option = Option
export const _OptgroupComponent: typeof Optgroup = Optgroup
export default Select

export type { SelectEmits, SelectSlots, SelectExpose } from './types'

export type { SelectTriggerOptions } from './trigger-options'
