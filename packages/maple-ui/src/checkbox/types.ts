import type { VNodeChild } from 'vue'
import type { CheckboxModel, ChoiceValue } from './choice-value-props'

export type { ChoiceOption as CheckboxOption } from './choice-options'
export interface CheckboxSlots {
  default?: (state: { checked: boolean }) => VNodeChild
  checkbox?: (state: { checked: boolean; disabled: boolean; indeterminate: boolean }) => VNodeChild
  'checked-icon'?: () => VNodeChild
  'unchecked-icon'?: () => VNodeChild
  'indeterminate-icon'?: () => VNodeChild
  read?: (state: { value: CheckboxModel; text: string }) => VNodeChild
}
export interface CheckboxGroupSlots {
  default?: () => VNodeChild
  label?: (state: { data: import('./choice-options').ChoiceOption; checked: boolean }) => VNodeChild
  checkbox?: CheckboxSlots['checkbox']
  read?: (state: { value: ChoiceValue[] | null; text: string }) => VNodeChild
}
