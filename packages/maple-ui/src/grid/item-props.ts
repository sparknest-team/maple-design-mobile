import type { ExtractPropTypes, PropType } from 'vue'
import type { ResponsiveValue } from '../grid/types'

export const gridItemProps = {
  /**
   * 跨越的格数
   */
  span: {
    type: [Number, Object] as PropType<number | ResponsiveValue>,
    default: 1,
  },
  /**
   * 左侧的间隔格数
   */
  offset: {
    type: [Number, Object] as PropType<number | ResponsiveValue>,
    default: 0,
  },
  /**
   * 是否是后缀元素
   */
  suffix: {
    type: Boolean,
    default: false,
  },
}

export type GridItemProps = ExtractPropTypes<typeof gridItemProps>
