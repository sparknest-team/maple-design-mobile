import { type PropType } from 'vue'
import { isColBreakpoint, isColCount, isColFlex, isColOrder } from './validation'

export type FlexType = number | string | 'initial' | 'auto' | 'none'

export type ColSizeDescriptor = {
  span?: number
  offset?: number
  order?: number
}

export type ColBreakpoint = number | ColSizeDescriptor

export type ColProps = InstanceType<(typeof import('./Col.vue'))['default']>['$props']

export const colProps = {
  /**
   * 栅格占位格数
   */
  span: {
    type: Number,
    default: 24,
    validator: process.env.NODE_ENV !== 'production' ? isColCount : undefined,
  },
  /**
   * 栅格逻辑起点的间隔格数
   */
  offset: { type: Number, validator: process.env.NODE_ENV !== 'production' ? isColCount : undefined },
  /**
   * 对元素进行排序
   */
  order: { type: Number, validator: process.env.NODE_ENV !== 'production' ? isColOrder : undefined },
  /**
   * < 576px 响应式栅格
   */
  xs: {
    type: [Number, Object] as PropType<ColBreakpoint>,
    validator: process.env.NODE_ENV !== 'production' ? isColBreakpoint : undefined,
  },
  /**
   * >= 576px 响应式栅格
   */
  sm: {
    type: [Number, Object] as PropType<ColBreakpoint>,
    validator: process.env.NODE_ENV !== 'production' ? isColBreakpoint : undefined,
  },
  /**
   * >= 768px 响应式栅格
   */
  md: {
    type: [Number, Object] as PropType<ColBreakpoint>,
    validator: process.env.NODE_ENV !== 'production' ? isColBreakpoint : undefined,
  },
  /**
   * >= 992px 响应式栅格
   */
  lg: {
    type: [Number, Object] as PropType<ColBreakpoint>,
    validator: process.env.NODE_ENV !== 'production' ? isColBreakpoint : undefined,
  },
  /**
   * >= 1200px 响应式栅格
   */
  xl: {
    type: [Number, Object] as PropType<ColBreakpoint>,
    validator: process.env.NODE_ENV !== 'production' ? isColBreakpoint : undefined,
  },
  /**
   * >= 1600px 响应式栅格
   */
  xxl: {
    type: [Number, Object] as PropType<ColBreakpoint>,
    validator: process.env.NODE_ENV !== 'production' ? isColBreakpoint : undefined,
  },
  /**
   * 设置 flex 布局属性
   */
  flex: {
    type: [Number, String] as PropType<FlexType>,
    validator: process.env.NODE_ENV !== 'production' ? isColFlex : undefined,
  },
}

export const props = colProps
