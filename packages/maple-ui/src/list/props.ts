import type { PropType, StyleValue, VNodeChild } from 'vue'
import type { ScrollIntoViewOptions, VirtualListProps } from '../_components/virtual-list-v2/interface'
import type { ComponentSize } from '../utils/constants'

export type ListSize = Extract<ComponentSize, 'sm' | 'md' | 'lg'>
export type ListVirtualListProps = Omit<VirtualListProps, 'data' | 'isStaticItemHeight'>
export interface ListScrollbarProps {
  type?: 'track' | 'embed'
  outerClass?: string | Record<string, boolean> | unknown[]
  outerStyle?: StyleValue
  hide?: boolean
  disableHorizontal?: boolean
  disableVertical?: boolean
}
export interface ListExpose {
  scrollIntoView(options: ScrollIntoViewOptions): void
}
export interface ListSlots {
  default?: () => VNodeChild
  header?: () => VNodeChild
  footer?: () => VNodeChild
  empty?: () => VNodeChild
  item?: (props: { item: unknown; index: number }) => VNodeChild
}
export interface ListEmits {
  scroll: (event: Event) => void
}
export const listProps = {
  /** 数据列表，与 item 插槽配合；default 插槽优先。 */
  data: Array as PropType<unknown[]>,
  /** 实现 sm/md/lg 三档。 */
  size: {
    type: String as PropType<ListSize>,
    default: 'md',
    validator: (value: string) => ['sm', 'md', 'lg'].includes(value),
  },
  /** 显示外边框。 */
  bordered: { type: Boolean, default: true },
  /** 显示列表项、头部和尾部分隔线。 */
  split: { type: Boolean, default: true },
  /** 加载反馈，不管理分页请求。 */
  loading: Boolean,
  /** 滚动区域最大高度；数字以 px 为单位，0 为不限。 */
  maxHeight: { type: [String, Number], default: 0 },
  /** 数据模式的虚拟化参数；default 插槽存在时不生效。 */
  virtualListProps: Object as PropType<ListVirtualListProps>,
  /** 普通列表的自定义滚动条；虚拟列表使用自身滚动视口。 */
  scrollbar: { type: [Boolean, Object] as PropType<boolean | ListScrollbarProps>, default: true },
}
export type ListProps = import('vue').ExtractPublicPropTypes<typeof listProps>
