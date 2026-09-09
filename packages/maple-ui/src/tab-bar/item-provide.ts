import { type ComputedRef } from 'vue'
import { assert } from '@maplejs/maple-shared'
import { useParent } from '@maplejs/maple-use'
import { TAB_BAR_BIND_TAB_BAR_ITEM_KEY, type TabBarProvider } from './provide'

export interface TabBarItemProvider {
  name: ComputedRef<number | string | undefined>
  index: ComputedRef<number>
}

export function useTabBar() {
  const { parentProvider, index, bindParent } = useParent<TabBarProvider, TabBarItemProvider>(
    TAB_BAR_BIND_TAB_BAR_ITEM_KEY,
  )

  assert(!!bindParent, 'TabBarItem', '<mp-tab-bar-item/> must in <mp-tab-bar/>')

  return {
    index,
    tabBar: parentProvider,
    bindTabBar: bindParent,
  }
}
