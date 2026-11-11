import type { ExtractPublicPropTypes, PropType } from 'vue'
import { semanticStatuses } from '../utils/constants'
import type { SemanticStatus } from '../utils/constants'
import type { ProgressSize } from './size'

export type { ProgressSize } from './size'
export type ProgressMode = 'line' | 'circle'
export type ProgressStatus = SemanticStatus
export type ProgressColor = string | Record<string, string>

export const progressProps = {
  /** 线形或环形 */
  mode: {
    type: String as PropType<ProgressMode>,
    default: 'line',
    validator: (value: string) => ['line', 'circle'].includes(value),
  },
  /** 五档预设；数字/CSS长度在线形表示厚度、环形表示直径 */
  size: [Number, String] as PropType<ProgressSize>,
  /** 0–100 百分比；支持十进制数字字符串，不接受 CSS 百分比 */
  percent: { type: [Number, String], default: 0 },
  /** 线形分段数；正数向下取整，最多 1000 段 */
  steps: { type: Number, default: 0 },
  /** 确定线形进度的扫光动画 */
  animation: { type: Boolean, default: false },
  /** 覆盖轨道厚度 */
  strokeWidth: [Number, String],
  /** 进度颜色或渐变 stop 映射 */
  color: [String, Object] as PropType<ProgressColor>,
  /** 轨道背景色 */
  trackColor: String,
  /** 线形剩余轨道的缓冲装饰色，不表示另一个进度值 */
  bufferColor: [String, Object] as PropType<ProgressColor>,
  /** 是否显示文本；xs 圆形默认隐藏文本以避免溢出 */
  showText: { type: Boolean, default: true },
  /** 文本容器 class */
  textClass: String,
  /** 主题状态；default 在确定进度完成时推导为 success */
  status: {
    type: String as PropType<ProgressStatus>,
    default: 'default',
    validator: (value: SemanticStatus) => semanticStatuses.includes(value),
  },
  /** 不确定进度 */
  indeterminate: { type: Boolean, default: false },
  /** 是否显示背景轨道 */
  track: { type: Boolean, default: true },
  /** 环形起点相对十二点方向的旋转角度 */
  rotate: { type: Number, default: 0 },
}
export type ProgressProps = ExtractPublicPropTypes<typeof progressProps>
