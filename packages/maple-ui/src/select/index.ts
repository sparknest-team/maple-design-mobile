import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import { props as optionProps } from './option-props'
import Option from './Option.vue'
import { props as selectProps } from './props'
import _Select from './Select.vue'

const Select = withInstall(
  _Select,
  Object.assign(_Select, {
    Option: Option,
  }),
  { components: [_Select, Option] },
)

withPropsDefaultsSetter(Select, selectProps)
withPropsDefaultsSetter(Option, optionProps)

export { selectProps, optionProps, Select, Option }
export type {
  SelectProps,
  SelectOption,
  SelectPresentation,
  SelectTextAlign,
  SelectOptionLabel,
  SelectOptionLabelRender,
} from './props'

export type SelectInstance = InstanceType<typeof _Select>
export type OptionInstance = InstanceType<typeof Option>
export const _SelectComponent = Select
export const _OptionComponent = Option

export default Select
