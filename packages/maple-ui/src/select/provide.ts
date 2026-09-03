import { type ComputedRef } from 'vue'
import { useChildren } from '@maplejs/maple-use'
import { type OptionProvider } from './option-provide'

export const SELECT_BIND_OPTION_KEY = Symbol('SELECT_BIND_OPTION_KEY')

export interface SelectProvider {
  multiple: ComputedRef<boolean>
  focusColor: ComputedRef<string | undefined>
  computeLabel(): void
  onSelect(optionProvider: OptionProvider): void
}

export function useOptions() {
  const { length, childProviders, bindChildren } = useChildren<SelectProvider, OptionProvider>(SELECT_BIND_OPTION_KEY)

  return {
    length,
    options: childProviders,
    bindOptions: bindChildren,
  }
}
