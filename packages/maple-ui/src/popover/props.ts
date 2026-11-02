import type { PropType } from 'vue'
import type { TriggerEvent, TriggerPlacement } from '../trigger'
import { triggerProps } from '../trigger/props'

export const popoverProps = {
  ...triggerProps,
  /** 标题内容。 */
  title: String,
  /** 正文内容。 */
  content: String,
  /** Popover 默认使用点击触发。 */
  trigger: { type: [String, Array] as PropType<TriggerEvent | TriggerEvent[]>, default: 'click' },
  /** 首选弹出位置。 */
  /** 浮层相对触发元素的首选方位，默认 bottom；启用默认的 auto-fit-position 时，空间不足会自动翻转并约束到可视区域，不保证最终停在该侧 */
  placement: { type: String as PropType<TriggerPlacement>, default: 'bottom' },
  /** 默认显示箭头。 */
  showArrow: { type: Boolean, default: true },
  /** 浮层与触发元素的默认距离。 */
  popupOffset: { type: Number, default: 10 },
  /** 动画名省略时使用 Popover 自身动画。 */
  animationName: { type: String, default: undefined },
  /** 根据最终方位设置动画原点。 */
  autoFitTransformOrigin: { type: Boolean, default: true },
  /** 关闭后保留交互内容和草稿状态。 */
  unmountOnClose: { type: Boolean, default: false },
  /** 再次点击触发元素时关闭。 */
  closeOnClickReference: { type: Boolean, default: true },
}

export type PopoverProps = import('vue').ExtractPublicPropTypes<typeof popoverProps>
export type PopoverPlacement = TriggerPlacement
export type PopoverTrigger = TriggerEvent
