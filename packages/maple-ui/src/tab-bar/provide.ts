import { type ComputedRef } from 'vue'
import { useChildren } from '@maplejs/maple-use'
import { type TabBarItemProvider } from './item-provide'

export interface TabBarProvider {
  active: ComputedRef<number | string | undefined>
  activeColor: ComputedRef<string | undefined>
  inactiveColor: ComputedRef<string | undefined>
  variant: ComputedRef<boolean | undefined>
  isActive(index: number): boolean
  onToggle(value: number | string): void
}

export const TAB_BAR_BIND_TAB_BAR_ITEM_KEY = Symbol('TAB_BAR_BIND_TAB_BAR_ITEM_KEY')

export function useTabBarItems() {
  const { childProviders, length, bindChildren } = useChildren<TabBarProvider, TabBarItemProvider>(
    TAB_BAR_BIND_TAB_BAR_ITEM_KEY,
  )

  return {
    length,
    tabBarItems: childProviders,
    bindTabBarItem: bindChildren,
  }
}
