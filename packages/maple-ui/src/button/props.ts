import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { LoadingSize, LoadingType } from '../loading/props'
import { componentSizes, semanticStatuses } from '../utils/constants'
import type { ComponentSize, SemanticStatus } from '../utils/constants'

export const buttonVariants = ['default', 'text', 'outline', 'tonal'] as const
export const buttonHtmlTypes = ['button', 'submit', 'reset'] as const
export const buttonComponents = ['button', 'a'] as const
export const buttonLoadingModes = ['default', 'fill', 'line'] as const
export type ButtonVariant = (typeof buttonVariants)[number]
export type ButtonLoadingMode = (typeof buttonLoadingModes)[number]
export type ButtonHandler = (event: Event) => void | Promise<unknown>

export const buttonProps = {
  /** 主题色，省略时继承按钮组 */
  status: { type: String as PropType<SemanticStatus>, validator: (v: SemanticStatus) => semanticStatuses.includes(v) },
  /** 外观，省略时继承按钮组 */
  variant: { type: String as PropType<ButtonVariant>, validator: (v: ButtonVariant) => buttonVariants.includes(v) },
  /** 五档尺寸，省略时继承按钮组 */
  size: { type: String as PropType<ComponentSize>, validator: (v: ComponentSize) => componentSizes.includes(v) },
  /** 原生按钮类型 */
  htmlType: {
    type: String as PropType<(typeof buttonHtmlTypes)[number]>,
    default: 'button',
    validator: (v: (typeof buttonHtmlTypes)[number]) => buttonHtmlTypes.includes(v),
  },
  /** 根元素 */
  component: {
    type: String as PropType<(typeof buttonComponents)[number]>,
    default: 'button',
    validator: (v: (typeof buttonComponents)[number]) => buttonComponents.includes(v),
  },
  /** 圆形按钮 */
  round: Boolean,
  /** 占满可用宽度 */
  block: Boolean,
  /** 外部加载状态，阻止点击 */
  loading: Boolean,
  /** 加载动画，与 Loading.type 一致 */
  loadingType: { type: String as PropType<LoadingType>, default: 'circle' },
  /** 加载布局：行内、覆盖或底部进度线 */
  loadingMode: {
    type: String as PropType<ButtonLoadingMode>,
    default: 'default',
    validator: (v: ButtonLoadingMode) => buttonLoadingModes.includes(v),
  },
  /** 加载指示器尺寸，省略时使用按钮尺寸 */
  loadingSize: [String, Number] as PropType<LoadingSize>,
  /** 加载颜色 */
  loadingColor: { type: String, default: 'currentColor' },
  /** circle 加载指示器半径 */
  loadingRadius: [String, Number],
  /** 等待事件处理函数返回的 Promise，并阻止重复操作 */
  autoLoading: Boolean,
  /** 图标容器外观 */
  iconContainer: Boolean,
  /** 禁用，省略时继承按钮组 */
  disabled: { type: Boolean, default: undefined },
  /** 点击水波 */
  ripple: { type: Boolean, default: true },
  /** 允许顺序键盘聚焦 */
  focusable: { type: Boolean, default: true },
  /** 原生自动聚焦 */
  autofocus: Boolean,
  /** 自定义文字色 */
  textColor: String,
  /** 自定义背景／变体基色 */
  color: String,
  /** 阴影；true 为等级 2，false 为无，数字 0～24 */
  elevation: { type: [Boolean, Number] as PropType<boolean | number>, default: true },
  /** 图标文字纵向排列，省略时继承按钮组 */
  stacked: { type: Boolean, default: undefined },
  // Explicit listener props retain Promise results for autoLoading. Vue emit() discards returns.
  onClick: [Function, Array] as PropType<ButtonHandler | ButtonHandler[]>,
  onTouchstart: [Function, Array] as PropType<ButtonHandler | ButtonHandler[]>,
}
export type ButtonProps = ExtractPublicPropTypes<typeof buttonProps>
export { buttonGroupProps } from './group-props'
export type { ButtonGroupProps } from './group-props'
