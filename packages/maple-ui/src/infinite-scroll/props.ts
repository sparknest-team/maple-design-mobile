import type { PropType } from 'vue'
import type { ExtractPublicPropTypes } from '../utils/components'

export type InfiniteScrollStatus = 'idle' | 'loading' | 'error' | 'finished'

export const infiniteScrollProps = {
  status: {
    type: String as PropType<InfiniteScrollStatus>,
    default: 'idle',
  },
  bottomOffset: {
    type: [String, Number],
    default: 0,
  },
  immediate: {
    type: Boolean,
    default: true,
  },
  disabled: Boolean,
  target: {
    type: [String, Object] as PropType<string | HTMLElement>,
  },
}

export type InfiniteScrollProps = ExtractPublicPropTypes<typeof infiniteScrollProps>
