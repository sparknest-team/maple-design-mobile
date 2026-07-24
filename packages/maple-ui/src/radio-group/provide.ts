import { type ComputedRef } from 'vue'
import { useChildren } from '@maplejs/maple-use'
import { RadioProvider } from '../radio/provide'

export interface RadioGroupProvider {
  errorMessage: ComputedRef<boolean>
  hasChecked: ComputedRef<boolean>
  onToggle(value: any): void
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
