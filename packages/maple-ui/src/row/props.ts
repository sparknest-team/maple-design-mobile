import { type PropType } from 'vue'
import type { ResponsiveValue } from '../grid/types'
import { isRowGutter, rowAligns, rowJustifies } from './validation'

export type RowJustify = 'start' | 'center' | 'end' | 'space-around' | 'space-between'

export type RowAlign = 'start' | 'center' | 'end' | 'stretch'

export type RowGutter = number | ResponsiveValue | [number | ResponsiveValue, number | ResponsiveValue]

export type RowProps = InstanceType<(typeof import('./Row.vue'))['default']>['$props']

export const rowProps = {
  /**
   * 栅格间隔（px），默认水平、垂直均为 16。数值和响应式对象仅控制水平间距，也支持 [水平, 垂直] 数组。
   */
  gutter: {
    type: [Number, Object, Array] as PropType<RowGutter>,
    default: (): [number, number] => [16, 16],
    validator: process.env.NODE_ENV !== 'production' ? isRowGutter : undefined,
  },
  /**
   * 水平对齐方式（justify-content）
   */
  justify: {
    type: String as PropType<RowJustify>,
    default: 'start',
    validator:
      process.env.NODE_ENV !== 'production' ? (value: string) => rowJustifies.includes(value as RowJustify) : undefined,
  },
  /**
   * 竖直对齐方式（align-items）
   */
  align: {
    type: String as PropType<RowAlign>,
    default: 'start',
    validator:
      process.env.NODE_ENV !== 'production' ? (value: string) => rowAligns.includes(value as RowAlign) : undefined,
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

export const props = rowProps
