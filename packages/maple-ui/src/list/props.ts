import type { PropType } from 'vue'
import type { ExtractPublicPropTypes } from '../utils/components'

export type ListSize = 'sm' | 'md' | 'lg'

export const listProps = {
  data: Array as PropType<unknown[]>,
  size: {
    type: String as PropType<ListSize>,
    default: 'md',
  },
  bordered: {
    type: Boolean,
    default: true,
  },
  split: {
    type: Boolean,
    default: true,
  },
  loading: Boolean,
}

export type ListProps = ExtractPublicPropTypes<typeof listProps>
