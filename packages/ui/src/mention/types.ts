import type { VNodeChild } from 'vue'
import type { SelectOptionInfo } from '../select/types'
import type { mentionEmits } from './emits'

export interface MeasureInfo {
  measuring: boolean
  location: number
  prefix: string
  text: string
}

export type MentionEmits = {
  [Event in keyof typeof mentionEmits]: Parameters<(typeof mentionEmits)[Event]>
} & {
  'update:open': [open: boolean]
  'open-change': [open: boolean]
}

export interface MentionSlots {
  option?(scope: { data: SelectOptionInfo }): VNodeChild
  read?(scope: { value: string | null; text: string }): VNodeChild
  /** Input presentation only. */
  prefix?(): VNodeChild
  /** Input presentation only. */
  suffix?(): VNodeChild
  'clear-icon'?(scope: { clear(event?: Event): void }): VNodeChild
}

export interface MentionExpose {
  focus(): void
  blur(): void
  /** Retry the current data query without opening the field editor. */
  refresh(): Promise<void>
}
