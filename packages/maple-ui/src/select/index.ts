import { withInstall } from '../utils/components'
import OptgroupComponent from './Optgroup.vue'
import OptionComponent from './Option.vue'
import { selectProps } from './props'
import SelectComponent from './select'

const Select = withInstall(
  SelectComponent,
  Object.assign(SelectComponent, { Option: OptionComponent, OptGroup: OptgroupComponent }),
  { components: [SelectComponent, OptionComponent, OptgroupComponent] },
)
const Option = withInstall(OptionComponent)
const Optgroup = withInstall(OptgroupComponent)
export { Select, Option, Optgroup, selectProps }
export const optionProps = OptionComponent.props
export const optgroupProps = OptgroupComponent.props
export type OptgroupInstance = InstanceType<typeof OptgroupComponent>
export type OptgroupProps = import('vue').ExtractPublicPropTypes<typeof OptgroupComponent.props>
export type { SelectProps, SelectEditMode } from './props'
export type {
  OptionSearchField,
  SelectOptionsLoader,
  SelectValue,
  SelectEmptyValue,
  SelectOption,
  SelectOptionData,
  SelectOptionGroup,
  SelectFieldNames,
  FilterOption,
} from './types'
export type SelectInstance = InstanceType<typeof SelectComponent>
export type OptionInstance = InstanceType<typeof OptionComponent>
export type OptionProps = import('vue').ExtractPublicPropTypes<typeof OptionComponent.props>
export const _SelectComponent = Select
export const _OptionComponent = Option
export const _OptgroupComponent = Optgroup
export default Select

export type { SelectEmits, SelectSlots, SelectExpose } from './types'

export type { SelectTriggerOptions } from './trigger-options'
