import { CSSProperties, VNode } from 'vue'
import { BasicAttributes, ListenerProp, SetPropsDefaults, VarComponent } from './varComponent'

export declare const paginationProps: Record<keyof PaginationProps, any>

export interface PaginationProps extends BasicAttributes {
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
  onChange?: ListenerProp<(current: number) => void>
  onPageSizeChange?: ListenerProp<(pageSize: number) => void>
  'onUpdate:current'?: ListenerProp<(current: number) => void>
  'onUpdate:pageSize'?: ListenerProp<(pageSize: number) => void>
}

export class Pagination extends VarComponent {
  static setPropsDefaults: SetPropsDefaults<PaginationProps>

  $props: PaginationProps

  $slots: {
    'page-item'(data: { page: number }): VNode[]
    'page-item-step'(data: { type: 'previous' | 'next' }): VNode[]
    'page-item-ellipsis'(): VNode[]
    total(data: { total: number }): VNode[]
    'jumper-prepend'(): VNode[]
    'jumper-append'(): VNode[]
  }
}

export class _PaginationComponent extends Pagination {}
