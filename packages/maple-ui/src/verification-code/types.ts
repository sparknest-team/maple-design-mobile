import type { VNodeChild } from 'vue'

export interface VerificationCodeEmits {
  'update:modelValue': [value: string]
  input: [character: string, index: number, event: Event]
  change: [value: string]
  finish: [value: string]
  paste: [value: string, event: ClipboardEvent]
  click: [event: MouseEvent]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}
export interface VerificationCodeSlots {
  separator?: (scope: { index: number; character: string }) => VNodeChild
}
export interface VerificationCodeExpose {
  focus: (index?: number) => void
  blur: () => void
  reset: () => void
}
