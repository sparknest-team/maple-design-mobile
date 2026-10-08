import { type ComputedRef } from 'vue'
import { useChildren } from '@maplejs/maple-use'
import type { ChoiceValue, RadioModel } from '../checkbox/choice-value-props'
import { RadioProvider } from './provide'
import type { RadioNavigation } from './use-radio-navigation'
import type { RadioVariant } from './variant'

export interface RadioGroupProvider {
  modelValue: ComputedRef<RadioModel>
  disabled: ComputedRef<boolean>
  readonly: ComputedRef<boolean>
  navigation: RadioNavigation
  variant: ComputedRef<RadioVariant>
  errorMessage: ComputedRef<boolean>
  onToggle(value: ChoiceValue, event?: Event): void
}

export const RADIO_GROUP_BIND_RADIO_KEY = Symbol('RADIO_GROUP_BIND_RADIO_KEY')

export function useRadios() {
  const { bindChildren, childProviders, length } = useChildren<RadioGroupProvider, RadioProvider>(
    RADIO_GROUP_BIND_RADIO_KEY,
  )

  return {
    length,
    radios: childProviders,
    bindRadios: bindChildren,
  }
}
