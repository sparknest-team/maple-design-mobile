import { computed, type ComputedRef } from 'vue'
import { useChildren } from '@maplejs/maple-use'
import type { ComponentSize } from '../utils/constants'
import { TAB_ITEM_BIND_INFINITE_SCROLL_KEY } from './tab-item-provide'

export { createNamespace } from '../utils/components'
export type { ComponentSize, Orientation } from '../utils/constants'
export function useTabsPlatform(size: ComputedRef<ComponentSize | undefined>) {
  return { size: computed(() => size.value ?? 'md'), rtl: computed(() => false) }
}
export function providePanelVisibility(active: ComputedRef<boolean>) {
  const { bindChildren } = useChildren(TAB_ITEM_BIND_INFINITE_SCROLL_KEY)
  bindChildren({ current: active })
}
