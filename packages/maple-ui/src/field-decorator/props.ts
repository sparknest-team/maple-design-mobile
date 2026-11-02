import type { ExtractPublicPropTypes, PropType } from 'vue'
import { componentSizes, type ComponentSize } from '../utils/constants'

export const fieldVariants = ['filled', 'outline', 'standard'] as const
export type FieldDecoratorVariant = (typeof fieldVariants)[number]
export type FieldDecoratorSize = ComponentSize

export const fieldLoadingModes = ['default', 'line'] as const
export type FieldLoadingMode = (typeof fieldLoadingModes)[number]
/** Shared presentation contract; loading never changes disabled or readonly. */
export const fieldLoadingProps = {
  loading: Boolean,
  loadingMode: {
    type: String as PropType<FieldLoadingMode>,
    default: 'default',
    validator: (value: FieldLoadingMode) => fieldLoadingModes.includes(value),
  },
}

export type FieldLoadingProps = ExtractPublicPropTypes<typeof fieldLoadingProps>

export const fieldDecoratorProps = {
  ...fieldLoadingProps,
  /** 外壳标签。 */
  tag: { type: String as PropType<'div' | 'span'>, default: 'div' },
  /** 当前内容，仅用于空值判断。 */
  value: { type: null },
  /** 关联的原生表单控件 id。 */
  id: String,
  /** 原生标题提示。 */
  title: String,
  /** 控件尺寸。 */
  size: {
    type: String as PropType<ComponentSize>,
    default: 'md',
    validator: (value: ComponentSize) => componentSizes.includes(value),
  },
  /** 外观变体。 */
  variant: {
    type: String as PropType<FieldDecoratorVariant>,
    default: 'outline',
    validator: (value: FieldDecoratorVariant) => fieldVariants.includes(value),
  },
  /** 提示文字。 */
  placeholder: String,
  /** 是否启用浮动提示。 */
  hint: { type: Boolean, default: true },
  /** 未浮起时是否垂直居中；多行控件可设为 false。 */
  hintCenter: { type: Boolean, default: true },
  /** 是否显示边框或底线。 */
  line: { type: Boolean, default: true },
  /** 焦点状态，由消费者管理。 */
  focused: Boolean,
  /** 错误状态，由消费者管理。 */
  error: Boolean,
  /** 禁用状态，由消费者合并 Form/Group 后传入。 */
  disabled: Boolean,
  /** 只读状态，禁止清除但保留展示。 */
  readonly: Boolean,
  /** 是否允许清除非空内容。 */
  clearable: Boolean,
  /** 正在输入法组合输入。 */
  composing: Boolean,
  /** 自定义文字颜色。 */
  textColor: String,
  /** 自定义聚焦颜色。 */
  focusColor: String,
  /** 自定义未聚焦颜色。 */
  blurColor: String,
  /** 光标样式。 */
  cursor: String,
}

export type FieldDecoratorProps = ExtractPublicPropTypes<typeof fieldDecoratorProps>
