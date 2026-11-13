import type { VNodeChild } from 'vue'

export interface InputEmits {
  'update:open': [value: boolean]
  'update:modelValue': [value: string | null]
  input: [value: string, originalEvent: Event]
  change: [value: string | null, originalEvent?: Event]
  'press-enter': [originalEvent: KeyboardEvent]
  keydown: [originalEvent: KeyboardEvent]
  clear: [originalEvent: Event]
  focus: [originalEvent: FocusEvent]
  blur: [originalEvent: FocusEvent]
  click: [originalEvent: MouseEvent]
}
export interface InputSlots {
  read?(scope: { value: string | null }): VNodeChild
  prefix?(): VNodeChild
  suffix?(): VNodeChild
  'clear-icon'?(scope: { clear(event?: Event): void }): VNodeChild
}
export interface InputExpose {
  inputRef?: HTMLInputElement
  focus(options?: FocusOptions): void
  blur(): void
  select(): void
}
export interface InputGroupSlots {
  default?(): VNodeChild
}
export interface InputPasswordEmits extends InputEmits {
  'visibility-change': [visible: boolean]
  'update:visibility': [visible: boolean]
}
export type InputPasswordSlots = InputSlots
export interface InputPasswordExpose {
  inputRef?: InputExpose
  focus(options?: FocusOptions): void
  blur(): void
  select(): void
}
