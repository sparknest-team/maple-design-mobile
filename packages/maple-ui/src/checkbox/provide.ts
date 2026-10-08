import { type ComputedRef } from 'vue'
import { useParent } from '@maplejs/maple-use'
import { CHECKBOX_GROUP_BIND_CHECKBOX_KEY, CheckboxGroupProvider } from './group-provide'

export interface CheckboxProvider {
  value: ComputedRef
  checked: ComputedRef<boolean>
  disabled: ComputedRef<boolean>
  readonly: ComputedRef<boolean>
}

export function useCheckboxGroup() {
  const { bindParent, parentProvider, index } = useParent<CheckboxGroupProvider, CheckboxProvider>(
    CHECKBOX_GROUP_BIND_CHECKBOX_KEY,
  )

  return {
    index,
    checkboxGroup: parentProvider,
    bindCheckboxGroup: bindParent,
  }
}
