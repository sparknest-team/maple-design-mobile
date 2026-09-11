import type { PropType } from 'vue'
import type { DropdownMenuProps } from '../dropdown-menu'
import type { BreadcrumbRoute } from './types'

export const breadcrumbProps = {
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
   * 分隔符文字
   */
  separator: {
    type: [String, Number] as PropType<string | number>,
    default: '/',
  },
}

export type BreadcrumbProps = import('vue').ExtractPublicPropTypes<typeof breadcrumbProps>

export const breadcrumbItemProps = {
  /** @internal 由 Breadcrumb 注入的稳定索引 */
  index: Number,
  /**
   * 分隔符文字（覆盖父级 `separator`）
   */
  separator: {
    type: [String, Number] as PropType<string | number>,
  },
  /**
   * 下拉菜单内容
   */
  droplist: {
    type: Array as PropType<BreadcrumbRoute['children']>,
  },
  /**
   * 下拉菜单属性
   */
  dropdownProps: {
    type: Object as PropType<DropdownMenuProps>,
  },
  /**
   * 跳转链接
   */
  href: String,
}

export type BreadcrumbItemProps = import('vue').ExtractPublicPropTypes<typeof breadcrumbItemProps>

export { breadcrumbProps as props }
export type { BreadcrumbRoute, BreadcrumbMoreIconSlotData } from './types'
