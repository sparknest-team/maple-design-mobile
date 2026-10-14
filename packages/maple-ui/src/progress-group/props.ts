import type { Component, PropType } from 'vue'
import type { ComponentSize } from '../utils/constants'

export type ProgressGroupOrientation = 'horizontal' | 'vertical'
export type ProgressGroupMode = 'line' | 'circle'
export interface ProgressGroupItem {
  label?: string
  value?: number
  color?: string
  icon?: Component
  slot?: string
  class?: string
  tip?: string
}

export const progressGroupProps = {
  /** 分组的无障碍名称 */
  ariaLabel: String,
  /** 展示模式 */
  mode: { type: String as PropType<ProgressGroupMode>, default: 'line' },
  /** 分段数据 */
  items: { type: Array as PropType<ProgressGroupItem[]>, default: () => [] },
  /** 所有分段相对于该值计算占比 */
  max: { type: Number, default: 100 },
  /** 是否显示累计百分比 */
  showText: { type: Boolean, default: false },
  /** 组件尺寸 */
  size: { type: String as PropType<ComponentSize>, default: 'md' },
  /** 未指定分段颜色时的默认颜色 */
  color: String,
  /** 环形模式的直径 */
  circleSize: { type: [Number, String], default: 120 },
  /** 环形模式的轨道宽度 */
  strokeWidth: { type: Number, default: 8 },
  /** 是否在悬浮或聚焦分段时显示提示 */
  tooltip: { type: Boolean, default: true },
  /** 进度轨方向 */
  orientation: { type: String as PropType<ProgressGroupOrientation>, default: 'horizontal' },
}
export type ProgressGroupProps = import('vue').ExtractPublicPropTypes<typeof progressGroupProps>
