import { type ComputedRef } from 'vue'
import { useParent } from '@maplejs/maple-use'
import { RADIO_GROUP_BIND_RADIO_KEY, RadioGroupProvider } from './group-provide'

export interface RadioProvider {
  isFocusing: ComputedRef<boolean>
  checked: ComputedRef<boolean>
  disabled: ComputedRef<boolean>
}

export function useRadioGroup() {
  const { bindParent, parentProvider, index } = useParent<RadioGroupProvider, RadioProvider>(RADIO_GROUP_BIND_RADIO_KEY)

  return {
    index,
    radioGroup: parentProvider,
    bindRadioGroup: bindParent,
  }
}
