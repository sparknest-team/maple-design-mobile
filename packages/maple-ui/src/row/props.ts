import { type PropType } from 'vue'
import type { ResponsiveValue } from '../utils/responsive-observe'

export type RowJustify = 'start' | 'center' | 'end' | 'space-around' | 'space-between'

export type RowAlign = 'start' | 'center' | 'end' | 'stretch'

export type RowGutter = number | ResponsiveValue | [number | ResponsiveValue, number | ResponsiveValue]

export type RowProps = {
  gutter?: RowGutter
  justify?: RowJustify
  align?: RowAlign
  wrap?: boolean
  div?: boolean
}

export const props = {
  /**
   * 栅格间隔（px）。支持响应式对象，或 [水平, 垂直] 数组。
   */
  gutter: {
    type: [Number, Object, Array] as PropType<RowGutter>,
    default: 0,
  },
  /**
   * 水平对齐方式（justify-content）
   */
  justify: {
    type: String as PropType<RowJustify>,
    default: 'start',
  },
  /**
   * 竖直对齐方式（align-items）
   */
  align: {
    type: String as PropType<RowAlign>,
    default: 'start',
  },
  /**
   * Col 是否支持换行
   */
  wrap: {
    type: Boolean,
    default: true,
  },
  /**
   * 开启后 Row/Col 仅作为普通 div，不附带栅格样式
   */
  div: Boolean,
}

export const rowProps = props
