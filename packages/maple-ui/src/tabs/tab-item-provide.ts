import type { ComputedRef } from 'vue'

export interface TabItemProvider {
  current: ComputedRef<boolean>
}
export const TAB_ITEM_BIND_INFINITE_SCROLL_KEY = Symbol('TAB_ITEM_BIND_INFINITE_SCROLL_KEY')
