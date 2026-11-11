import type { VNodeChild } from 'vue'
import type { StepMethod } from './number-arithmetic'

export interface InputNumberEmits {
  'update:modelValue': [value: number | null | undefined]
  'update:open': [open: boolean]
  'open-change': [open: boolean]
  input: [value: number | null | undefined, text: string, event: Event]
  change: [value: number | null | undefined, event?: Event]
  clear: [event: Event]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  keydown: [event: KeyboardEvent]
  step: [value: number, direction: StepMethod, event: Event]
  'commit-error': [error: unknown]
}
export interface InputNumberSlots {
  read?(scope: { value: number | null | undefined; text: string }): VNodeChild
  prefix?(): VNodeChild
  suffix?(): VNodeChild
  prepend?(): VNodeChild
  append?(): VNodeChild
  plus?(): VNodeChild
  minus?(): VNodeChild
  'clear-icon'?(scope: { clear(event?: Event): void }): VNodeChild
}
export interface InputNumberExpose {
  inputRef?: HTMLInputElement
  focus(options?: FocusOptions): void
  blur(): void
  select(): void
}
