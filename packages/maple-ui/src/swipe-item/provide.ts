import { type ComputedRef } from 'vue'
import { useParent } from '@maplejs/maple-use'
import { assert } from '@maplejs/maple-shared'
import { SWIPE_BIND_SWIPE_ITEM_KEY, type SwipeProvider } from '../swipe/provide'

export interface SwipeItemProvider {
  index: ComputedRef<number>
  isFocusing: ComputedRef<boolean>
  setTranslate(x: number): void
}

export function useSwipe() {
  const { bindParent, index, parentProvider } = useParent<SwipeProvider, SwipeItemProvider>(SWIPE_BIND_SWIPE_ITEM_KEY)

  assert(!!bindParent, 'SwipeItem', '<mp-swipe-item/> must in <mp-swipe/>')

  return {
    index,
    swipe: parentProvider,
    bindSwipe: bindParent,
  }
}
