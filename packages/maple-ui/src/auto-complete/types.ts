import type { VNodeChild } from 'vue'
import type { autoCompleteEmits } from './emits'
import type { AutoCompleteOptionInfo } from './props'

/** Event argument tuples derived from the runtime validators. */
export type AutoCompleteEmits = {
  [Event in keyof typeof autoCompleteEmits]: Parameters<(typeof autoCompleteEmits)[Event]>
}
export interface AutoCompleteSlots {
  default?(): VNodeChild
  option?(scope: { data: AutoCompleteOptionInfo }): VNodeChild
  empty?(): VNodeChild
  footer?(): VNodeChild
  prefix?(): VNodeChild
  suffix?(): VNodeChild
  'clear-icon'?(scope: { clear(event?: Event): void }): VNodeChild
  read?(scope: { value: string; text: string }): VNodeChild
}
export interface AutoCompleteExpose {
  refresh(): Promise<void>
  focus(): void
  blur(): void
}
