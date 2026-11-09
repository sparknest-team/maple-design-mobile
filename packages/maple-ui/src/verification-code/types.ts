import type { VNodeChild } from 'vue'

export interface VerificationCodeEmits {
  'update:open': [open: boolean]
  'open-change': [open: boolean]
  'update:modelValue': [value: string | null]
  input: [character: string, index: number, event: Event]
  change: [value: string | null]
  finish: [value: string]
  paste: [value: string, event: ClipboardEvent]
  click: [event: MouseEvent]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}
export interface VerificationCodeSlots {
  read?: (scope: { value: string | null; text: string }) => VNodeChild
  separator?: (scope: { index: number; character: string }) => VNodeChild
}
export interface VerificationCodeExpose {
  focus: (index?: number) => void
  blur: () => void
  reset: () => void
}
