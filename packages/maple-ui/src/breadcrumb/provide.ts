import type { ComputedRef } from 'vue'
import { useChildren } from '@maplejs/maple-use'

export interface BreadcrumbProvider {
  length: ComputedRef<number>
  separator: ComputedRef<string>
}

export const BREADCRUMB_BIND_BREADCRUMB_ITEM_KEY = Symbol('BREADCRUMB_BIND_BREADCRUMB_ITEM_KEY')

export function useBreadcrumbItems() {
  const { childProviders, bindChildren, length } = useChildren<BreadcrumbProvider, null>(
    BREADCRUMB_BIND_BREADCRUMB_ITEM_KEY,
  )

  return {
    length,
    breadcrumbItems: childProviders,
    bindBreadcrumbItems: bindChildren,
  }
}
