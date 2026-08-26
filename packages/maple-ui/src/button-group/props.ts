import { type ExtractPropTypes, type PropType } from 'vue'
import type { ButtonVariant } from '../button/props'
import type { ComponentSize, SemanticStatus } from '../utils/constants'

export const buttonGroupProps = {
  /**
   * 按钮组主题色
   */
  status: {
    type: String as PropType<SemanticStatus>,
    default: 'default',
  },
  /**
   * 按钮组尺寸
   */
  size: {
    type: String as PropType<ComponentSize>,
    default: 'md',
  },
  /**
   * 按钮组变体
   */
  variant: {
    type: String as PropType<ButtonVariant>,
    default: 'default',
  },
  /**
   * 自定义背景色
   */
  color: String,
  /**
   * 自定义文字色
   */
  textColor: String,
  /**
   * 是否禁用
   */
  disabled: Boolean,
  /**
   * 是否堆叠
   */
  stacked: Boolean,
  /**
   * 是否纵向排列
   */
  vertical: Boolean,
  /**
   * 海拔阴影
   */
  elevation: {
    type: [Boolean, Number, String],
    default: true,
  },
}

export type ButtonGroupProps = ExtractPropTypes<typeof buttonGroupProps>
