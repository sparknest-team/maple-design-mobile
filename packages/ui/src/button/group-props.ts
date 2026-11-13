import { type PropType } from 'vue'
import { componentSizes, semanticStatuses } from '../utils/constants'
import type { ComponentSize, SemanticStatus } from '../utils/constants'
import { buttonVariants, type ButtonVariant } from './variant'

export const buttonGroupProps = {
  /**
   * 按钮组主题色
   */
  status: {
    type: String as PropType<SemanticStatus>,
    default: 'default',
    validator: (value: SemanticStatus) => semanticStatuses.includes(value),
  },
  /**
   * 按钮组尺寸
   */
  size: {
    type: String as PropType<ComponentSize>,
    default: undefined,
    validator: (value: ComponentSize) => componentSizes.includes(value),
  },
  /**
   * 按钮组变体
   */
  variant: {
    type: String as PropType<ButtonVariant>,
    default: 'default',
    validator: (value: ButtonVariant) => buttonVariants.includes(value),
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
    type: [Boolean, Number],
    default: true,
  },
}

export type ButtonGroupProps = import('../_utils/public-props').CompatiblePublicProps<typeof buttonGroupProps>
