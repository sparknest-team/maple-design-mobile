import { withInstall } from '../utils/components'
import _AutoComplete from './presentation'
import { autoCompleteProps } from './props'

const AutoComplete = withInstall(_AutoComplete, Object.assign(_AutoComplete, {}), {
  components: [_AutoComplete],
})

export * from './props'

export type AutoCompleteInstance = InstanceType<typeof _AutoComplete> & { focus: () => void; blur: () => void }

export { AutoComplete, autoCompleteProps }

export const _AutoCompleteComponent = AutoComplete

export default AutoComplete

export type { AutoCompleteEmits, AutoCompleteSlots, AutoCompleteExpose } from './types'

export type { AutoCompleteTriggerOptions } from './trigger-options'
