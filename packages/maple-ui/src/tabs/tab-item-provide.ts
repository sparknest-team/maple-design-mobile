import { type ComputedRef } from 'vue'
import { assert } from '@maplejs/maple-shared'
import { useChildren, useParent } from '@maplejs/maple-use'
import { type InfiniteScrollProvider } from '../infinite-scroll/provide'
import { TABS_ITEMS_BIND_TAB_ITEM_KEY, type TabsItemsProvider } from './tabs-items-provide'

export interface TabItemProvider {
  index: ComputedRef<number>
  name: ComputedRef<string | number | undefined>
  current: ComputedRef<boolean>
  setCurrent: (value: boolean) => void
}

export const TAB_ITEM_BIND_INFINITE_SCROLL_KEY = Symbol('TAB_ITEM_BIND_INFINITE_SCROLL_KEY')

export function useTabsItems() {
  const { parentProvider, bindParent, index } = useParent<TabsItemsProvider, TabItemProvider>(
    TABS_ITEMS_BIND_TAB_ITEM_KEY,
  )

  assert(!!bindParent, 'TabItem', '<mp-tab-item/> must in <mp-tabs-items/>')

  return {
    index,
    tabsItems: parentProvider,
    bindTabsItems: bindParent,
  }
}

export function useInfiniteScrolls() {
  const { childProviders, bindChildren, length } = useChildren<TabItemProvider, InfiniteScrollProvider>(
    TAB_ITEM_BIND_INFINITE_SCROLL_KEY,
  )

  return {
    length,
    infiniteScrolls: childProviders,
    bindInfiniteScrolls: bindChildren,
  }
}
