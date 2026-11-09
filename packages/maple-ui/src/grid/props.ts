import type { ExtractPropTypes, PropType } from 'vue'
import type { ResponsiveValue } from './types'
import { isGridResponsive, isGridScalar } from './validation'

export const gridProps = {
  /**
   * 每一行展示的列数
   */
  cols: {
    type: [Number, Object] as PropType<number | ResponsiveValue>,
    default: 24,
    validator: process.env.NODE_ENV !== 'production' ? isGridResponsive : undefined,
  },
  /**
   * 行与行之间的间距
   */
  rowGap: {
    type: [Number, Object] as PropType<number | ResponsiveValue>,
    default: 0,
    validator: process.env.NODE_ENV !== 'production' ? isGridResponsive : undefined,
  },
  /**
   * 列与列之间的间距
   */
  colGap: {
    type: [Number, Object] as PropType<number | ResponsiveValue>,
    default: 0,
    validator: process.env.NODE_ENV !== 'production' ? isGridResponsive : undefined,
  },
  /**
   * 是否折叠
   */
  collapsed: {
    type: Boolean,
    default: false,
  },
  /**
   * 折叠时显示的行数
   */
  collapsedRows: {
    type: Number,
    default: 1,
    validator: process.env.NODE_ENV !== 'production' ? isGridScalar : undefined,
  },
}

export type GridProps = import('vue').ExtractPublicPropTypes<typeof gridProps>
