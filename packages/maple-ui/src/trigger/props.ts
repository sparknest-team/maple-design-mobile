import type { PropType } from 'vue'
import type { PositioningStrategy } from '@popperjs/core'
import { popupContainerProp } from '../utils/popup-container'
import { triggerInteractionProps } from './interaction-props'
import { triggerRenderProps } from './render-props'
import type { Placement } from './useFloatingTrigger'

export const triggerProps = {
  ...triggerInteractionProps,
  ...triggerRenderProps,
  /** 浮层位置 */
  placement: {
    type: String as PropType<Placement>,
    default: 'bottom',
  },
  /** 覆盖触发元素；placement 仍使用标准十二方位 */
  cover: Boolean,
  /** Popper 定位策略 */
  strategy: {
    type: String as PropType<PositioningStrategy>,
    default: 'absolute',
  },
  /** 水平偏移 */
  offsetX: {
    type: [Number, String],
    default: 0,
  },
  /** 垂直偏移 */
  offsetY: {
    type: [Number, String],
    default: 0,
  },
  /** 浮层挂载容器，false 表示不 Teleport */
  popupContainer: popupContainerProp,
  /** 浮层是否与触发元素同宽 */
  autoFitPopupWidth: Boolean,
  /** 过渡动画名称 */
  animationName: String,
  /** 是否对齐鼠标坐标 */
  alignPoint: Boolean,

  // internal start
  cascadeOptimization: Boolean,
  // internal end
}

export type TriggerProps = import('vue').ExtractPublicPropTypes<typeof triggerProps>
