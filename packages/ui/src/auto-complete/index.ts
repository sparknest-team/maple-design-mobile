import { withInstall } from '../utils/components'
import _AutoComplete from './presentation'
import { autoCompleteProps } from './props'

const AutoComplete: import('../utils/components').ComponentWithInstall<typeof _AutoComplete> = withInstall(
  _AutoComplete,
  Object.assign(_AutoComplete, {}),
  {
    components: [_AutoComplete],
  },
)

export * from './props'

export type AutoCompleteInstance = InstanceType<typeof _AutoComplete> & import('./types').AutoCompleteExpose

export { AutoComplete, autoCompleteProps }

export const _AutoCompleteComponent: typeof AutoComplete = AutoComplete

export default AutoComplete

export type { AutoCompleteEmits, AutoCompleteSlots, AutoCompleteExpose } from './types'

export type { AutoCompleteTriggerOptions } from './trigger-options'
