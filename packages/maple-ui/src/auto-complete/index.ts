import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import AutoComplete from './AutoComplete.vue'
import { props as autoCompleteProps } from './props'

withInstall(AutoComplete)
withPropsDefaultsSetter(AutoComplete, autoCompleteProps)

export type AutoCompleteInstance = InstanceType<typeof AutoComplete>
export { autoCompleteProps }
export const _AutoCompleteComponent = AutoComplete

export default AutoComplete
