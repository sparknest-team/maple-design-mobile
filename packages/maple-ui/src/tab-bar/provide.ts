import { type ComputedRef } from 'vue'
import { useChildren } from '@maple-design/use'
import { type TabBarItemProvider } from './item-provide'
import type { TabBarVariant } from './props'

export interface TabBarProvider {
  loading: ComputedRef<boolean>
  active: ComputedRef<number | string | undefined>
  activeColor: ComputedRef<string | undefined>
  inactiveColor: ComputedRef<string | undefined>
  variant: ComputedRef<TabBarVariant>
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
