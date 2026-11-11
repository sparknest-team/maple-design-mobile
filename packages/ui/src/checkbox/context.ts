import type { InjectionKey, Slots } from 'vue'
import type { ChoiceValue } from './choice-value-props'
import type { RegisterChoice } from './use-checkbox-group-methods'

export interface CheckboxGroupContext {
  registerChoice: RegisterChoice
  computedValue: ChoiceValue[]
  disabled: boolean
  readonly: boolean
  error: boolean
  formErrorId?: string
  isMaxed: boolean
  name?: string
  slots: Slots
  handleChange(value: ChoiceValue[], event?: Event): void
}
export const checkboxGroupKey: InjectionKey<CheckboxGroupContext> = Symbol('CheckboxGroup')
