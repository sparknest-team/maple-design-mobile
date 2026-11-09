import type { VNodeChild } from 'vue'
import type { RadioModel } from '../checkbox/choice-value-props'

export type { ChoiceOption as RadioOption } from '../checkbox/choice-options'
export type RadioEmits = {
  'update:modelValue': [value: RadioModel]
  change: [value: RadioModel, event?: Event]
  click: [event: MouseEvent]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  'update:open': [open: boolean]
  'open-change': [open: boolean]
}
export type RadioGroupEmits = {
  'update:modelValue': [value: RadioModel]
  change: [value: RadioModel, event?: Event]
  'load-error': [error: unknown]
  'update:open': [open: boolean]
  'open-change': [open: boolean]
}
export interface RadioSlots {
  default?: (state: { checked: boolean; disabled: boolean }) => VNodeChild
  radio?: (state: { checked: boolean; disabled: boolean }) => VNodeChild
  'checked-icon'?: () => VNodeChild
  'unchecked-icon'?: () => VNodeChild
  read?: (state: { value: RadioModel; text: string }) => VNodeChild
}
export interface RadioGroupSlots {
  default?: () => VNodeChild
  label?: (state: { data: import('../checkbox/choice-options').ChoiceOption; checked: boolean }) => VNodeChild
  radio?: RadioSlots['radio']
  read?: (state: { value: RadioModel; text: string }) => VNodeChild
}
