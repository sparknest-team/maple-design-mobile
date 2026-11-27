import type { InjectionKey, Slots } from 'vue'
import type { ComponentSize } from '../utils/constants'
import type { RadioNavigation } from './use-radio-navigation'
import type { RadioVariant } from './variant'

export interface RadioGroupContext {
  navigation: RadioNavigation
  value: string | number | boolean | null
  size: ComponentSize
  variant: RadioVariant
  disabled: boolean
  readonly: boolean
  error: boolean
  formErrorId?: string
  name?: string
  slots: Slots
  handleChange(value: string | number | boolean, event?: Event): void
}
export const radioGroupKey: InjectionKey<RadioGroupContext> = Symbol('RadioGroup')
