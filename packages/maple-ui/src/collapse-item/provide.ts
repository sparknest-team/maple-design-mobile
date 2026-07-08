import { type ComputedRef } from 'vue'
import { useParent } from '@maplejs/maple-use'
import { assert } from '@maplejs/maple-shared'
import { COLLAPSE_BIND_COLLAPSE_ITEM_KEY, CollapseProvider } from '../collapse/provide'

export interface CollapseItemProvider {
  index: ComputedRef<number>
  name: ComputedRef<string | number | undefined>
  disabled: ComputedRef<boolean>
  init(show: boolean): void
}

export function useCollapse() {
  const { parentProvider, index, bindParent } = useParent<CollapseProvider, CollapseItemProvider>(
    COLLAPSE_BIND_COLLAPSE_ITEM_KEY,
  )

  assert(!!bindParent, 'Collapse', '<mp-collapse-item/> must in <mp-collapse>')

  return {
    index,
    collapse: parentProvider,
    bindCollapse: bindParent,
  }
}
