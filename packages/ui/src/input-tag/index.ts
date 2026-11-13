import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import _InputTag from './presentation'
import { inputTagProps } from './props'

withPropsDefaultsSetter(_InputTag, inputTagProps)
const InputTag: import('../utils/components').ComponentWithInstall<typeof _InputTag> = withInstall(
  _InputTag,
  Object.assign(_InputTag, {}),
  { components: [_InputTag] },
)

export type InputTagInstance = InstanceType<typeof _InputTag> & import('./types').InputTagExpose
export type { InputTagProps } from './props'
export type { TagData, InputTagFieldNames } from './types'
export { InputTag, inputTagProps }
export const _InputTagComponent: typeof InputTag = InputTag

export default InputTag

export type { InputTagValue, InputTagEmits, InputTagSlots, InputTagExpose } from './types'
