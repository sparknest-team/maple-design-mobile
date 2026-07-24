import { type ComputedRef } from 'vue'
import { useChildren } from '@maplejs/maple-use'
import { CheckboxProvider } from '../checkbox/provide'

export interface CheckboxGroupProvider {
  checkedCount: ComputedRef<number>
  errorMessage: ComputedRef<boolean>
  max: ComputedRef<number | string | undefined>
  onChecked(value: any): void
  onUnchecked(value: any): void
}

export const CHECKBOX_GROUP_BIND_CHECKBOX_KEY = Symbol('CHECKBOX_GROUP_BIND_CHECKBOX_KEY')

export function useCheckboxes() {
  const { bindChildren, childProviders, length } = useChildren<CheckboxGroupProvider, CheckboxProvider>(
    CHECKBOX_GROUP_BIND_CHECKBOX_KEY,
  )

  return {
    length,
    checkboxes: childProviders,
    bindCheckboxes: bindChildren,
  }
}
