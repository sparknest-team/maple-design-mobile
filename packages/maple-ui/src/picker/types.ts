import type { VNodeChild } from 'vue'
import type { PickerColumnOption } from './props'

export type PickerSelection = [values: (string | number)[], indexes: number[], options: PickerColumnOption[]]
export interface PickerEmits {
  confirm: PickerSelection
  cancel: PickerSelection
  change: PickerSelection
  'update:modelValue': [value: (string | number)[]]
  'update:open': [open: boolean]
  open: []
  opened: []
  close: []
  closed: []
  'click-overlay': [event: MouseEvent]
  'key-escape': [event: KeyboardEvent]
}
export interface PickerSlots {
  title?: () => VNodeChild
  cancel?: () => VNodeChild
  confirm?: () => VNodeChild
}
