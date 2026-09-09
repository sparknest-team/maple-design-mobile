import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import AutoComplete from './AutoComplete.vue'
import { props as autoCompleteProps } from './props'

withInstall(AutoComplete)
withPropsDefaultsSetter(AutoComplete, autoCompleteProps)

export type AutoCompleteInstance = InstanceType<typeof AutoComplete>
export { autoCompleteProps }
export type {
  AutoCompleteProps,
  AutoCompleteOption,
  AutoCompleteOptionLabel,
  AutoCompleteOptionLabelRender,
} from './props'
export const _AutoCompleteComponent: typeof AutoComplete = AutoComplete

export default AutoComplete
