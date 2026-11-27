import type { VNodeChild } from 'vue'

export type { ChoiceOption as CheckboxOption } from './choice-options'
export interface CheckboxSlots {
  default?: (state: { checked: boolean }) => VNodeChild
  checkbox?: (state: { checked: boolean; disabled: boolean; indeterminate: boolean }) => VNodeChild
  'checked-icon'?: () => VNodeChild
  'unchecked-icon'?: () => VNodeChild
  'indeterminate-icon'?: () => VNodeChild
  read?: (state: { value: boolean | (string | number | boolean)[] | null; text: string }) => VNodeChild
}
export interface CheckboxGroupSlots {
  default?: () => VNodeChild
  label?: (state: { data: import('./choice-options').ChoiceOption; checked: boolean }) => VNodeChild
  checkbox?: CheckboxSlots['checkbox']
  read?: (state: { value: (string | number | boolean)[] | null; text: string }) => VNodeChild
}
