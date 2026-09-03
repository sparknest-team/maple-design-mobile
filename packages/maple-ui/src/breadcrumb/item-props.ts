import type { ExtractPropTypes, PropType } from 'vue'
import type { MenuProps } from '../menu'
import type { BreadcrumbRoute } from './types'

export const props = {
  /**
   * 分隔符（覆盖父级）
   */
  separator: [String, Number],
  /**
   * 跳转链接
   */
  href: String,
  /**
   * 下拉菜单内容
   */
  droplist: Array as PropType<BreadcrumbRoute['children']>,
  /**
   * 下拉菜单属性
   */
  dropdownProps: Object as PropType<MenuProps>,
}

export type BreadcrumbItemProps = ExtractPropTypes<typeof props>
