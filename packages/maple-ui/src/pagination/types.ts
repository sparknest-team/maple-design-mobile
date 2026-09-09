import type { CSSProperties } from 'vue'

export const PAGE_ITEM_TYPES = ['page', 'more', 'previous', 'next'] as const
export type PageItemType = (typeof PAGE_ITEM_TYPES)[number]
export type PageListItem =
  { type: 'page'; key: number; pageNumber: number } | { type: 'more'; key: string; step: number }

/** 两端条数选择器支持的公共配置；分页值、选项和尺寸由 Pagination 管理。 */
export interface PaginationPageSizeProps {
  disabled?: boolean
  placement?: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end'
  popupContainer?: string | HTMLElement | false
  class?: string
  style?: CSSProperties
}
