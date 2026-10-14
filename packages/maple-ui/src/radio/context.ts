import type { InjectionKey, Slots } from 'vue'
import type { ChoiceValue, RadioModel } from '../checkbox/choice-value-props'
import type { ComponentSize } from '../utils/constants'
import type { RadioNavigation } from './use-radio-navigation'
import type { RadioVariant } from './variant'

export interface RadioGroupContext {
  navigation: RadioNavigation
  value: RadioModel
  size: ComponentSize
  variant: RadioVariant
  disabled: boolean
  readonly: boolean
  error: boolean
  name?: string
  slots: Slots
  handleChange(value: ChoiceValue, event?: Event): void
}
export const radioGroupKey: InjectionKey<RadioGroupContext> = Symbol('RadioGroup')
