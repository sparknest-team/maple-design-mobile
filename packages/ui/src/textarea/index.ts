import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import TextareaSource from './presentation'
import { textareaProps } from './props'

const Textarea = withInstall(TextareaSource)
withPropsDefaultsSetter(Textarea, textareaProps)

export type TextareaInstance = InstanceType<typeof Textarea>
export type {
  TextareaAutoSize,
  TextareaMaxLength,
  TextareaProps,
  TextareaVariant,
  WordLength,
  WordSlice,
} from './props'
export { Textarea, textareaProps }
export const _TextareaComponent: typeof Textarea = Textarea
export default Textarea

export type { TextareaEmits, TextareaSlots, TextareaExpose } from './types'
