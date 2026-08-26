import { type ExtractPropTypes, type PropType } from 'vue'
import type { ComponentSize, SemanticStatus } from '../utils/constants'

/**
 * 徽标变体
 */
export type BadgeVariant = 'default' | 'outline'

/**
 * 徽标布局模式
 */
export type BadgeMode = 'floating' | 'inline'

/**
 * 徽标定位（mode=floating 时有效）
 */
export type BadgePosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'

/**
 * 内联模式定位（mode=inline 时有效）
 */
export type BadgeInlinePosition = 'start' | 'end'

/**
 * 徽标尺寸
 */
export const badgeProps = {
  /**
   * 徽标的描述文本
   */
  description: String,
  /**
   * 显示为小红点
   */
  dot: Boolean,
  /**
   * 徽标最大显示数值，超出时显示为 `${max}+`，content 为数字时有效
   */
  max: {
    type: Number,
    default: 99,
  },
  /**
   * 是否显示徽标
   */
  show: {
    type: Boolean,
    default: true,
  },
  /**
   * 徽标内容为 0 时是否显示
   */
  showZero: Boolean,
  /**
   * 横向偏移量（mode=floating 时有效）
   */
  offsetX: {
    type: Number,
    default: 0,
  },
  /**
   * 纵向偏移量
   */
  offsetY: {
    type: Number,
    default: 0,
  },
  /**
   * 自定义背景色
   */
  color: String,
  /**
   * 徽标显示的内容
   */
  content: [Number, String],
  /**
   * 徽标显示的内容颜色
   */
  textColor: String,
  /**
   * 徽标布局模式，可选 `floating` | `inline`
   */
  mode: {
    type: String as PropType<BadgeMode>,
    default: 'floating',
  },
  /**
   * 徽标定位（mode=floating 时有效）
   */
  position: {
    type: String as PropType<BadgePosition>,
    default: 'top-right',
  },
  /**
   * 内联模式定位（mode=inline 时有效）
   */
  inlinePosition: {
    type: String as PropType<BadgeInlinePosition>,
    default: 'end',
  },
  /**
   * 徽标尺寸
   */
  size: {
    type: String as PropType<ComponentSize>,
    default: 'md',
  },
  /**
   * 徽标状态色
   */
  status: {
    type: String as PropType<SemanticStatus>,
    default: 'default',
  },
  /**
   * 徽标变体
   */
  variant: {
    type: String as PropType<BadgeVariant>,
    default: 'default',
  },
}

export type BadgeProps = ExtractPropTypes<typeof badgeProps>
