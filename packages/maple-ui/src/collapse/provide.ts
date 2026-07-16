import { type ComputedRef, type Slots } from 'vue'
import { useChildren } from '@maplejs/maple-use'
import { CollapseItemProvider } from '../collapse-item/provide'
import type { CollapseExpandIconPosition } from './props'

export interface CollapseProvider {
  offset: ComputedRef<boolean>
  divider: ComputedRef<boolean>
  accordion: ComputedRef<boolean>
  elevation: ComputedRef<boolean | number | string>
  expandIconPosition: ComputedRef<CollapseExpandIconPosition>
  showExpandIcon: ComputedRef<boolean | undefined>
  destroyOnHide: ComputedRef<boolean>
  slots: Slots
  updateItem: (value: number | string, isExpand: boolean) => void
}

export const COLLAPSE_BIND_COLLAPSE_ITEM_KEY = Symbol('COLLAPSE_BIND_COLLAPSE_ITEM_KEY')

export function useCollapseItem() {
  const { childProviders, length, bindChildren } = useChildren<CollapseProvider, CollapseItemProvider>(
    COLLAPSE_BIND_COLLAPSE_ITEM_KEY,
  )

  return {
    length,
    collapseItems: childProviders,
    bindCollapseItems: bindChildren,
  }
}
