import { useParent } from '@maplejs/maple-use'
import { TAB_ITEM_BIND_INFINITE_SCROLL_KEY, type TabItemProvider } from '../tabs/tab-item-provide'

export interface InfiniteScrollProvider {}

export function useTabItem() {
  const { parentProvider, bindParent, index } = useParent<TabItemProvider, InfiniteScrollProvider>(
    TAB_ITEM_BIND_INFINITE_SCROLL_KEY,
  )

  return {
    index,
    tabItem: parentProvider,
    bindTabItem: bindParent,
  }
}
