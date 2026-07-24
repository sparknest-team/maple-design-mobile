import { type ComputedRef } from 'vue'
import { useParent } from '@maplejs/maple-use'
import { CHECKBOX_GROUP_BIND_CHECKBOX_KEY, CheckboxGroupProvider } from '../checkbox-group/provide'

export interface CheckboxProvider {
  checkedValue: ComputedRef
  checked: ComputedRef<boolean>
  sync(values: Array<any>): void
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
