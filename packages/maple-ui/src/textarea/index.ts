import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import { textareaProps } from './props'
import Textarea from './Textarea.vue'

withInstall(Textarea)
withPropsDefaultsSetter(Textarea, textareaProps)

export type TextareaInstance = InstanceType<typeof Textarea>
export type { TextareaProps } from './props'
export { textareaProps }
export const _TextareaComponent: typeof Textarea = Textarea
export default Textarea
