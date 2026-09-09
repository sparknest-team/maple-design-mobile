import type { ComputedRef, Slots } from 'vue'
import { useChildren, useParent } from '@maplejs/maple-use'
import type { BreadcrumbMoreIconSlotData } from './types'

export interface BreadcrumbProvider {
  length: ComputedRef<number>
  maxCount: ComputedRef<number>
  separator: ComputedRef<string | number | undefined>
  needHide: ComputedRef<boolean>
  moreSlotData: ComputedRef<BreadcrumbMoreIconSlotData>
  slots: Slots
}

export const BREADCRUMB_BIND_BREADCRUMB_ITEM_KEY = Symbol('BREADCRUMB_BIND_BREADCRUMB_ITEM_KEY')

export function useBreadcrumbItems() {
  const { bindChildren, childProviders, length } = useChildren<BreadcrumbProvider, null>(
    BREADCRUMB_BIND_BREADCRUMB_ITEM_KEY,
  )

  return {
    length,
    breadcrumbItems: childProviders,
    bindBreadcrumbItems: bindChildren,
  }
}

export function useBreadcrumb() {
  const { bindParent, parentProvider, index } = useParent<BreadcrumbProvider, null>(BREADCRUMB_BIND_BREADCRUMB_ITEM_KEY)

  return {
    index,
    breadcrumb: parentProvider,
    bindBreadcrumb: bindParent,
  }
}
