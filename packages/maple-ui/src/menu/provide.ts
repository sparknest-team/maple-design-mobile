import { type ComputedRef } from 'vue'
import { useChildren } from '@maplejs/maple-use'
import { type MenuOptionProvider } from './option-provide'
import { type MenuSize } from './props'

export const MENU_BIND_MENU_OPTION_KEY = Symbol('MENU_BIND_MENU_OPTION_KEY')

export interface MenuProvider {
  size: ComputedRef<MenuSize>
  multiple: ComputedRef<boolean>
  computeLabel(): void
  onSelect(menuOptionProvider: MenuOptionProvider, ev?: Event): void
}

export function useMenuOptions() {
  const { length, childProviders, bindChildren } = useChildren<MenuProvider, MenuOptionProvider>(
    MENU_BIND_MENU_OPTION_KEY,
  )

  return {
    length,
    menuOptions: childProviders,
    bindMenuOptions: bindChildren,
  }
}
