import { type ExtractPropTypes, type PropType } from 'vue'
import { type BreadcrumbRoute } from './types'

export const props = {
  /**
   * 最多展示的正常面包屑项数量，不包含 more（0 表示不限制）
   */
  maxCount: {
    type: Number,
    default: 0,
  },
  /**
   * 通过路径数据渲染面包屑
   */
  routes: {
    type: Array as PropType<BreadcrumbRoute[]>,
  },
  /**
   * 分隔符
   */
  separator: {
    type: [String, Number] as PropType<string | number>,
    default: '/',
  },
}

export type BreadcrumbProps = ExtractPropTypes<typeof props>

export type { BreadcrumbRoute, BreadcrumbMoreIconSlotData }
