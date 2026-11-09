import type { ExtractPropTypes, PropType } from 'vue'
import type { ResponsiveValue } from '../grid/types'
import { isGridResponsive } from './validation'

export const gridItemProps = {
  /**
   * 跨越的格数
   */
  span: {
    type: [Number, Object] as PropType<number | ResponsiveValue>,
    default: 1,
    validator: process.env.NODE_ENV !== 'production' ? isGridResponsive : undefined,
  },
  /**
   * 逻辑行内起点的间隔格数
   */
  offset: {
    type: [Number, Object] as PropType<number | ResponsiveValue>,
    default: 0,
    validator: process.env.NODE_ENV !== 'production' ? isGridResponsive : undefined,
  },
  /**
   * 是否是后缀元素
   */
  suffix: {
    type: Boolean,
    default: false,
  },
}

export type GridItemProps = import('vue').ExtractPublicPropTypes<typeof gridItemProps>
