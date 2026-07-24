import { type CSSProperties, type PropType } from 'vue'
import { defineListenerProp } from '../utils/components'

export const props = {
  total: {
    type: [Number, String],
    default: 0,
  },
  current: [Number, String],
  defaultCurrent: {
    type: Number,
    default: 1,
  },
  pageSize: [Number, String],
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
    default: true,
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
  onChange: defineListenerProp<(current: number) => void>(),
  onPageSizeChange: defineListenerProp<(pageSize: number) => void>(),
  'onUpdate:current': defineListenerProp<(current: number) => void>(),
  'onUpdate:pageSize': defineListenerProp<(pageSize: number) => void>(),
}
