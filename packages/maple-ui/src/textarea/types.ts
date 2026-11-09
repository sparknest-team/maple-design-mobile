import type { VNodeChild } from 'vue'
import type { InputEmits, InputSlots } from '../input/types'

export type TextareaEmits = Omit<InputEmits, 'press-enter' | 'click'> & { 'open-change': [open: boolean] }
export type TextareaSlots = Omit<InputSlots, 'read'> & {
  read?(scope: { value: string | null; text: string }): VNodeChild
}
export interface TextareaExpose {
  textareaRef?: HTMLTextAreaElement
  focus(options?: FocusOptions): void
  blur(): void
  select(): void
}
