import type { CSSProperties, PropType } from 'vue'
import type { ComponentSize } from '../utils/constants'
import { componentSizes } from '../utils/constants'
import type { PaginationPageSizeProps } from './types'

export const paginationProps = {
  total: {
    type: Number,
    required: true as const,
    validator: (value: number) => Number.isInteger(value) && value >= 0,
  },
  /** 当前页码，从 1 开始；通过 v-model 绑定。 */
  modelValue: Number,
  /** 非受控初始值，仅创建时读取；后续修改不重置当前状态。 */
  defaultValue: {
    type: Number,
    default: 1,
    validator: (value: number) => Number.isInteger(value) && value >= 1,
  },
  pageSize: Number,
  defaultPageSize: {
    type: Number,
    default: 10,
    validator: (value: number) => Number.isInteger(value) && value > 0,
  },
  disabled: Boolean,
  hideOnSinglePage: Boolean,
  simple: Boolean,
  showTotal: Boolean,
  showMore: Boolean,
  showJumper: Boolean,
  showPageSize: Boolean,
  pageSizeOptions: {
    type: Array as PropType<number[]>,
    default: () => [10, 20, 30, 40, 50],
    validator: (value: number[]) => value.length > 0 && value.every((item) => Number.isInteger(item) && item > 0),
  },
  pageSizeProps: Object as PropType<PaginationPageSizeProps>,
  /** 所有内部控件使用相同尺寸。 */
  size: {
    type: String as PropType<ComponentSize>,
    default: 'md' as const,
    validator: (value: ComponentSize) => componentSizes.includes(value),
  },
  pageItemStyle: Object as PropType<CSSProperties>,
  activePageItemStyle: Object as PropType<CSSProperties>,
  baseSize: {
    type: Number,
    default: 6,
    validator: (value: number) => Number.isInteger(value) && value > 0,
  },
  bufferSize: {
    type: Number,
    default: 2,
    validator: (value: number) => Number.isInteger(value) && value >= 0,
  },
  /** 页码按钮的阴影等级。 */
  elevation: { type: [Boolean, Number], default: false },
  /** 根据容器宽度自动切换为简洁分页，保留全部辅助功能。 */
  responsive: { type: Boolean, default: true },
  /** 简洁分页的容器宽度阈值，单位 px。 */
  compactBreakpoint: {
    type: Number,
    default: 480,
    validator: (value: number) => Number.isFinite(value) && Number.isInteger(value) && value > 0,
  },
  autoAdjust: {
    type: Boolean,
    default: true,
  },
}

export type PaginationProps = import('vue').ExtractPublicPropTypes<typeof paginationProps>
