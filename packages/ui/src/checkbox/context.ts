import type { InjectionKey, Slots } from 'vue'
import type { RegisterChoice } from './use-checkbox-group-methods'

export interface CheckboxGroupContext {
  registerChoice: RegisterChoice
  computedValue: (string | number | boolean)[]
  disabled: boolean
  readonly: boolean
  error: boolean
  formErrorId?: string
  isMaxed: boolean
  name?: string
  slots: Slots
  handleChange(value: (string | number | boolean)[], event?: Event): void
}
export const checkboxGroupKey: InjectionKey<CheckboxGroupContext> = Symbol('CheckboxGroup')
