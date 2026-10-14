import type { VNodeChild } from 'vue'
import type { SearchResult } from './result'

export interface SearchEmits {
  'update:modelValue': [value: string]
  'update:modelField': [field: string]
  'update:model': [model: Record<string, unknown>]
  input: [value: string, event: Event]
  change: [value: string, event: Event]
  clear: [event: Event]
  search: [result: SearchResult, event: Event]
  cancel: [event: Event]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}
export interface SearchSlots {
  prefix?(): VNodeChild
  suffix?(): VNodeChild
  label?(): VNodeChild
  action?(): VNodeChild
  'button-default'?(): VNodeChild
  'button-icon'?(): VNodeChild
  'clear-icon'?(scope: { clear(event?: Event): void }): VNodeChild
}
export interface SearchExpose {
  focus(): void
  blur(): void
}
