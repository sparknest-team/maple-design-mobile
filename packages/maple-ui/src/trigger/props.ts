import type { PropType } from 'vue'
import { readingDirectionProp } from '../_utils/direction'
import { popupContainerProp } from '../utils/popup-container'
import type { TriggerPlacement } from './contract'
import { triggerInteractionProps } from './interaction-props'
import { triggerRenderProps } from './render-props'
import type { TriggerPopupTranslate, TriggerStrategy } from './types'

export type TriggerReferenceAttrs = Record<string, string | number | boolean | null | undefined>

export const triggerProps = {
  /** 阅读方向，省略时从触发元素所在作用域继承。 */
  dir: readingDirectionProp,
  ...triggerInteractionProps,
  ...triggerRenderProps,
  /** 浮层相对触发元素的首选方位。 */
  /** 浮层相对触发元素的首选方位，默认 bottom；启用默认的 auto-fit-position 时，空间不足会自动翻转并约束到可视区域，不保证最终停在该侧 */
  placement: { type: String as PropType<TriggerPlacement>, default: 'bottom' },
  /** 定位策略；fixed 相对可视视口定位。 */
  strategy: { type: String as PropType<TriggerStrategy>, default: 'absolute' },
  /** 是否让浮层沿主轴覆盖触发元素。 */
  cover: { type: Boolean, default: false },
  /** 浮层沿 placement 主轴向外的距离。 */
  popupOffset: { type: Number, default: 0 },
  /** 浮层在屏幕 x/y 轴上的附加平移。 */
  popupTranslate: { type: [Array, Object] as PropType<TriggerPopupTranslate> },
  /** 是否使用鼠标坐标作为虚拟触发点。 */
  alignPoint: { type: Boolean, default: false },
  /** 浮层过渡动画名称。 */
  animationName: { type: String, default: 'trigger-fade' },
  /** 是否让浮层宽度等于触发元素宽度。 */
  autoFitPopupWidth: { type: Boolean, default: false },
  /** 是否让浮层最小宽度等于触发元素宽度。 */
  autoFitPopupMinWidth: { type: Boolean, default: false },
  /** 触发元素或浮层尺寸变化时是否自动重新定位。 */
  autoFixPosition: { type: Boolean, default: true },
  /** 浮层挂载容器；false 表示原地渲染。 */
  popupContainer: popupContainerProp,
  /** 滚动容器滚动时是否更新浮层位置。 */
  updateAtScroll: { type: Boolean, default: false },
  /** 是否根据最终 placement 自动设置动画原点。 */
  autoFitTransformOrigin: { type: Boolean, default: false },
  /** content 插槽为空时是否不渲染浮层。 */
  hideEmpty: { type: Boolean, default: false },
  /** 打开时附加到首个触发节点的类名。 */
  openedClass: { type: [String, Array, Object] },
  /** 写入实际触发元素的属性；函数参数为当前打开状态。 */
  referenceAttrs: {
    type: [Object, Function] as PropType<TriggerReferenceAttrs | ((open: boolean) => TriggerReferenceAttrs)>,
  },
  /** 空间不足时是否翻转并限制到可视区域。 */
  autoFitPosition: { type: Boolean, default: true },
  /** 是否阻止浮层定位层的 mousedown 抢占焦点。 */
  preventFocus: { type: Boolean, default: false },
  /** 滚动超过阈值时是否关闭浮层。 */
  scrollToClose: { type: Boolean, default: false },
  /** 触发滚动关闭的最小距离。 */
  scrollToCloseDistance: { type: Number, default: 0 },
}

export type TriggerProps = import('vue').ExtractPublicPropTypes<typeof triggerProps>
