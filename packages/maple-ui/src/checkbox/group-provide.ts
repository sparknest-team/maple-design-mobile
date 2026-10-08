import { type ComputedRef } from 'vue'
import { useChildren } from '@maplejs/maple-use'
import type { ChoiceValue } from './choice-value-props'
import { CheckboxProvider } from './provide'
import type { RegisterChoice } from './use-checkbox-group-methods'

export interface CheckboxGroupProvider {
  registerChoice: RegisterChoice
  modelValue: ComputedRef<ChoiceValue[]>
  disabled: ComputedRef<boolean>
  readonly: ComputedRef<boolean>
  checkedCount: ComputedRef<number>
  errorMessage: ComputedRef<boolean>
  max: ComputedRef<number | undefined>
  onChecked(value: ChoiceValue, event?: Event): void
  onUnchecked(value: ChoiceValue, event?: Event): void
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
