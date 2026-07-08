import { type ComputedRef } from 'vue'
import { useParent } from '@maplejs/maple-use'
import { assert } from '@maplejs/maple-shared'
import { SELECT_BIND_OPTION_KEY, type SelectProvider } from '../select/provide'

export interface OptionProvider {
  label: ComputedRef<any>
  value: ComputedRef<any>
  disabled: ComputedRef<boolean>
  ripple: ComputedRef<boolean>
  selected: ComputedRef<boolean>
  indeterminate?: ComputedRef<boolean>
  sync(checked: boolean, indeterminate?: boolean): void
}

export function useSelect() {
  const { index, parentProvider, bindParent } = useParent<SelectProvider, OptionProvider>(SELECT_BIND_OPTION_KEY)

  assert(!!bindParent, 'Option', '<mp-option/> must in <mp-select/>')

  return {
    index,
    select: parentProvider,
    bindSelect: bindParent,
  }
}
