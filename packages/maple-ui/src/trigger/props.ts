import type { CSSProperties, ExtractPropTypes, PropType, TeleportProps } from 'vue'
import type { PositioningStrategy } from '@popperjs/core'
import type { Placement, Reference, TriggerEvent } from './useFloatingTrigger'

export const triggerProps = {
  /** 浮层是否打开 */
  open: Boolean,
  /** 是否禁用 */
  disabled: Boolean,
  /** 触发方式 */
  trigger: {
    type: String as PropType<TriggerEvent>,
    default: 'click',
  },
  /** 关联的触发元素或选择器 */
  reference: [String, Object] as PropType<Reference>,
  /** 浮层位置 */
  placement: {
    type: String as PropType<Placement>,
    default: 'cover-top-start',
  },
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
  popupContainer: {
    type: [String, Object, Boolean] as PropType<TeleportProps['to'] | false>,
    default: 'body',
  },
  /** 浮层是否与触发元素同宽 */
  sameWidth: Boolean,
  /** 浮层类名 */
  popupClass: [String, Array, Object],
  /** 浮层样式 */
  popupStyle: Object as PropType<CSSProperties>,
  /** 过渡动画名称 */
  animationName: String,
  /** 点击触发元素时是否关闭已打开的浮层 */
  closeOnClickReference: Boolean,
  /** 是否支持 ESC 关闭 */
  escToClose: {
    type: Boolean,
    default: true,
  },
  /** 是否对齐鼠标坐标 */
  alignPoint: Boolean,

  // internal start
  cascadeOptimization: Boolean,
  // internal end
}

export type TriggerProps = ExtractPropTypes<typeof triggerProps>
