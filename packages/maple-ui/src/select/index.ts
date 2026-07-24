import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import { props as selectProps } from './props'
import Select from './Select.vue'

withInstall(Select)
withPropsDefaultsSetter(Select, selectProps)

export type SelectInstance = InstanceType<typeof Select>
export type {
  SelectProps,
  SelectOption,
  SelectPresentation,
  SelectTextAlign,
  SelectOptionLabel,
  SelectOptionLabelRender,
} from './props'
export { selectProps }

export const _SelectComponent = Select

export default Select
