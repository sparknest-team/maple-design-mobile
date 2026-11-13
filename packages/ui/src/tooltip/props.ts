import type { PropType } from 'vue'
import type { TriggerEvent, TriggerPlacement } from '../trigger'
import { triggerProps } from '../trigger/props'
import type { ComponentSize, SemanticStatus } from '../utils/constants'

export type TooltipStatus = Extract<SemanticStatus, 'default' | 'primary' | 'info' | 'success' | 'warning' | 'danger'>
export type TooltipSize = Extract<ComponentSize, 'xs' | 'md'>

export const tooltipProps = {
  ...triggerProps,
  /** 提示内容。 */
  content: String,
  /** 面板主题状态。 */
  status: { type: String as PropType<TooltipStatus>, default: 'default' },
  /** 提示尺寸；当前实现 xs 和 md。 */
  size: { type: String as PropType<TooltipSize>, default: 'md' },
  /** 自定义背景色。 */
  color: String,
  /** 自定义文字色。 */
  textColor: String,
  /** 默认同时支持鼠标悬停和键盘聚焦。 */
  trigger: {
    type: [String, Array] as PropType<TriggerEvent | TriggerEvent[]>,
    default: () => ['hover', 'focus'],
  },
  /** 首选弹出位置。 */
  /** 浮层相对触发元素的首选方位，默认 top；启用默认的 auto-fit-position 时，空间不足会自动翻转并约束到可视区域，不保证最终停在该侧 */
  placement: { type: String as PropType<TriggerPlacement>, default: 'top' },
  /** 默认显示箭头。 */
  showArrow: { type: Boolean, default: true },
  /** 浮层与触发元素的默认距离。 */
  popupOffset: { type: Number, default: 10 },
  /** 动画名省略时使用 Tooltip 自身动画。 */
  animationName: { type: String, default: undefined },
  /** 根据最终方位设置动画原点。 */
  autoFitTransformOrigin: { type: Boolean, default: true },
  /** 关闭后卸载轻量提示内容。 */
  unmountOnClose: { type: Boolean, default: true },
  /** 无内容时不创建提示浮层。 */
  hideEmpty: { type: Boolean, default: true },
}

export type TooltipProps = import('../_utils/public-props').CompatiblePublicProps<typeof tooltipProps>
