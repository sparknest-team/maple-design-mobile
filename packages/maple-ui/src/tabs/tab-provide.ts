import type { ComputedRef } from 'vue'
import { assert } from '@maplejs/maple-shared'
import { useParent } from '@maplejs/maple-use'
import { TABS_BIND_TAB_KEY, type TabsProvider } from './provide'

export interface TabProvider {
  name: ComputedRef<number | string | undefined>
  index: ComputedRef<number>
  disabled: ComputedRef<boolean>
  element: ComputedRef<HTMLElement | null>
}

export function useTabs() {
  const { parentProvider, bindParent, index } = useParent<TabsProvider, TabProvider>(TABS_BIND_TAB_KEY)

  assert(!!bindParent, 'Tab', '<mp-tab/> must in <mp-tabs/>')

  return {
    index,
    tabs: parentProvider,
    bindTabs: bindParent,
  }
}
