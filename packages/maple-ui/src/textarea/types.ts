import type { InputEmits, InputSlots } from '../input/types'

export type TextareaEmits = Omit<InputEmits, 'press-enter' | 'click'>
export type TextareaSlots = InputSlots
export interface TextareaExpose {
  textareaRef?: HTMLTextAreaElement
  focus(options?: FocusOptions): void
  blur(): void
  select(): void
}
