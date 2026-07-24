import type { CSSProperties } from 'vue'

export const PAGE_ITEM_TYPES = ['page', 'more', 'previous', 'next'] as const

export type PageItemType = (typeof PAGE_ITEM_TYPES)[number]

export interface PaginationProps {
  total?: number | string
  current?: number | string
  defaultCurrent?: number
  pageSize?: number | string
  defaultPageSize?: number
  disabled?: boolean
  hideOnSinglePage?: boolean
  simple?: boolean
  showTotal?: boolean
  showMore?: boolean
  showJumper?: boolean
  showPageSize?: boolean
  pageSizeOptions?: number[]
  pageSizeProps?: Record<string, any>
  pageItemStyle?: CSSProperties
  activePageItemStyle?: CSSProperties
  baseSize?: number
  bufferSize?: number
  autoAdjust?: boolean
  elevation?: boolean | string | number
}
