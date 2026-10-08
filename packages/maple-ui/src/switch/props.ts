import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { ComponentSize } from '../utils/constants'

export const switchVariants = ['circle', 'round', 'line', 'tonal'] as const
export const switchSizes = ['sm', 'md', 'lg'] as const
export type SwitchVariant = (typeof switchVariants)[number]
export type SwitchSize = Extract<ComponentSize, (typeof switchSizes)[number]>
export type SwitchValue = string | number | boolean
export type SwitchBeforeChange = (nextValue: SwitchValue) => boolean | void | Promise<boolean | void>

export const switchProps = {
  /** 受控值；省略时使用内部状态 */
  modelValue: { type: [String, Number, Boolean] as PropType<SwitchValue>, default: undefined },
  /** 非受控初始选中状态 */
  defaultChecked: Boolean,
  /** 禁用交互，或继承表单禁用 */
  disabled: Boolean,
  /** 只读，仍可聚焦 */
  readonly: Boolean,
  /** 加载中，禁止切换 */
  loading: Boolean,
  /** 四种相同的跨端造型 */
  variant: {
    type: String as PropType<SwitchVariant>,
    default: 'circle',
    validator: (v: SwitchVariant) => switchVariants.includes(v),
  },
  /** 仅实现 sm/md/lg，省略时采用平台配置或 md */
  size: { type: String as PropType<SwitchSize>, validator: (v: SwitchSize) => switchSizes.includes(v) },
  /** 选中值 */
  checkedValue: { type: [String, Number, Boolean] as PropType<SwitchValue>, default: true },
  /** 未选中值 */
  uncheckedValue: { type: [String, Number, Boolean] as PropType<SwitchValue>, default: false },
  /** 选中轨道颜色 */
  checkedColor: String,
  /** 未选中轨道颜色 */
  uncheckedColor: String,
  /** 加载图标颜色 */
  loadingColor: String,
  /** 拦截切换；false 或拒绝 Promise 取消 */
  beforeChange: Function as PropType<SwitchBeforeChange>,
  /** 选中文案（line 与 sm 不展示） */
  checkedText: String,
  /** 未选中文案（line 与 sm 不展示） */
  uncheckedText: String,
  /** 点击波纹 */
  ripple: { type: Boolean, default: true },
  /** 滑块阴影等级 0～24；true 为 2，false 为无 */
  handleElevation: { type: [Boolean, Number], default: true },
}
export const props = switchProps
export type SwitchProps = ExtractPublicPropTypes<typeof switchProps>
