import type { ExtractPublicPropTypes, PropType } from 'vue'
import { popupContainerProp } from '../utils/popup-container'

export type BackTopEasing = 'linear' | 'quartOut' | 'easeInOutCubic' | ((progress: number) => number)
export type BackTopTarget = string | HTMLElement | (() => HTMLElement | null | undefined)

export const backTopProps = {
  /** 浮层挂载容器，false 表示原地绝对定位。 */
  popupContainer: popupContainerProp,
  /** 显示阈值；数字和数字字符串均以 px 为单位。 */
  visibleHeight: { type: [Number, String], default: 200 },
  /** 滚动容器；省略时监听页面，支持动态 getter。 */
  targetContainer: [String, Object, Function] as PropType<BackTopTarget>,
  /** 动画缓动函数或内置曲线。 */
  easing: { type: [String, Function] as PropType<BackTopEasing>, default: 'quartOut' },
  /** 动画时长（ms），0 表示立即回顶。 */
  duration: { type: Number, default: 200, validator: (value: number) => value >= 0 },
  /** 距离定位容器右侧的距离；数字以 px 为单位。 */
  right: [Number, String],
  /** 距离定位容器底部的距离；数字以 px 为单位。 */
  bottom: [Number, String],
  /** 阴影等级，true 为默认等级 2。 */
  elevation: { type: [Boolean, Number], default: true },
  /** 图标按钮的无障碍名称。 */
  ariaLabel: { type: String, default: 'Back to top' },
}
export type BackTopProps = ExtractPublicPropTypes<typeof backTopProps>
