import { type PropType } from 'vue'

export type FlexType = number | string | 'initial' | 'auto' | 'none'

export type ColSizeDescriptor = {
  span?: number
  offset?: number
  order?: number
}

export type ColBreakpoint = number | ColSizeDescriptor

export type ColProps = {
  span?: number
  offset?: number
  order?: number
  xs?: ColBreakpoint
  sm?: ColBreakpoint
  md?: ColBreakpoint
  lg?: ColBreakpoint
  xl?: ColBreakpoint
  xxl?: ColBreakpoint
  flex?: FlexType
}

export const props = {
  /**
   * 栅格占位格数
   */
  span: {
    type: Number,
    default: 24,
  },
  /**
   * 栅格左侧的间隔格数
   */
  offset: Number,
  /**
   * 对元素进行排序
   */
  order: Number,
  /**
   * < 576px 响应式栅格
   */
  xs: [Number, Object] as PropType<ColBreakpoint>,
  /**
   * >= 576px 响应式栅格
   */
  sm: [Number, Object] as PropType<ColBreakpoint>,
  /**
   * >= 768px 响应式栅格
   */
  md: [Number, Object] as PropType<ColBreakpoint>,
  /**
   * >= 992px 响应式栅格
   */
  lg: [Number, Object] as PropType<ColBreakpoint>,
  /**
   * >= 1200px 响应式栅格
   */
  xl: [Number, Object] as PropType<ColBreakpoint>,
  /**
   * >= 1600px 响应式栅格
   */
  xxl: [Number, Object] as PropType<ColBreakpoint>,
  /**
   * 设置 flex 布局属性
   */
  flex: [Number, String] as PropType<FlexType>,
}

export const colProps = props
