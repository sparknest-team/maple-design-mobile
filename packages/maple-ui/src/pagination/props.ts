import { type CSSProperties, type ExtractPropTypes, type PropType } from 'vue'
import { componentSizes, type ComponentSize } from '../utils/constants'

export const props = {
  total: {
    type: Number,
    required: true,
    validator: (value: number) => value >= 0,
  },
  current: Number,
  defaultCurrent: {
    type: Number,
    default: 1,
  },
  pageSize: Number,
  defaultPageSize: {
    type: Number,
    default: 10,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  hideOnSinglePage: {
    type: Boolean,
    default: false,
  },
  simple: {
    type: Boolean,
    default: false,
  },
  showTotal: {
    type: Boolean,
    default: false,
  },
  showMore: {
    type: Boolean,
    default: false,
  },
  showJumper: {
    type: Boolean,
    default: false,
  },
  showPageSize: {
    type: Boolean,
    default: false,
  },
  pageSizeOptions: {
    type: Array as PropType<number[]>,
    default: () => [10, 20, 30, 40, 50],
  },
  pageSizeProps: {
    type: Object as PropType<Record<string, any>>,
  },
  size: {
    type: String as PropType<ComponentSize>,
    default: 'md',
    validator: (value: ComponentSize) => componentSizes.includes(value),
  },
  pageItemStyle: {
    type: Object as PropType<CSSProperties>,
  },
  activePageItemStyle: {
    type: Object as PropType<CSSProperties>,
  },
  baseSize: {
    type: Number,
    default: 6,
  },
  bufferSize: {
    type: Number,
    default: 2,
  },
  autoAdjust: {
    type: Boolean,
    default: true,
  },
  elevation: {
    type: [Boolean, Number, String],
    default: true,
  },
}

export type PaginationProps = Partial<ExtractPropTypes<typeof props>>
