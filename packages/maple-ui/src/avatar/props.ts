import type { CSSProperties, PropType } from 'vue'
import type { PopoverProps } from '../popover'

export const avatarShapes = ['circle', 'square'] as const
export const avatarTriggerTypes = ['button', 'overlay'] as const
export const avatarObjectFits = ['fill', 'contain', 'cover', 'none', 'scale-down'] as const

export type AvatarShape = (typeof avatarShapes)[number]
export type AvatarTriggerType = (typeof avatarTriggerTypes)[number]
export type AvatarObjectFit = (typeof avatarObjectFits)[number]

export const avatarProps = {
  /** 头像形状 */
  shape: {
    type: String as PropType<AvatarShape>,
    default: 'circle',
    validator: (value: unknown): value is AvatarShape => avatarShapes.includes(value as AvatarShape),
  },
  /** 图片地址 */
  imageUrl: String,
  /** 图片替代文本 */
  alt: { type: String, default: '' },
  /** 头像宽高；数字为 px，字符串为 CSS 长度 */
  size: {
    type: [Number, String] as PropType<number | string>,
    validator: (value: number | string) => typeof value === 'string' || (Number.isFinite(value) && value >= 0),
  },
  /** 是否自动缩放过长的文字 */
  autoFixFontSize: { type: Boolean, default: true },
  /** 交互图标展示方式 */
  triggerType: {
    type: String as PropType<AvatarTriggerType>,
    default: 'button',
    validator: (value: unknown): value is AvatarTriggerType => avatarTriggerTypes.includes(value as AvatarTriggerType),
  },
  /** 交互入口的可访问名称。 */
  triggerAriaLabel: String,
  /** 交互图标自定义样式 */
  triggerIconStyle: Object as PropType<CSSProperties>,
  /** 图片填充方式 */
  objectFit: {
    type: String as PropType<AvatarObjectFit>,
    default: 'cover',
    validator: (value: unknown): value is AvatarObjectFit => avatarObjectFits.includes(value as AvatarObjectFit),
  },
  /** 背景色 */
  color: String,
  /** 是否显示描边 */
  bordered: Boolean,
  /** 描边颜色 */
  borderColor: String,
  /** 图片加载中的占位图地址 */
  loading: String,
  /** 图片加载失败的占位图地址 */
  error: String,
  /** 是否懒加载图片 */
  lazy: Boolean,
  /** 是否开启悬停放大 */
  hoverable: Boolean,
}

export const avatarGroupProps = {
  /** 子头像形状 */
  shape: avatarProps.shape,
  /** 子头像宽高；数字为 px，字符串为 CSS 长度 */
  size: avatarProps.size,
  /** 是否自动缩放子头像中的文字 */
  autoFixFontSize: avatarProps.autoFixFontSize,
  /** 最多直接展示的头像数，0 表示不限 */
  maxCount: { type: Number, default: 0, validator: (value: number) => Number.isInteger(value) && value >= 0 },
  /** 头像层级是否按顺序递增 */
  zIndexAscend: { type: Boolean, default: false },
  /** 数量汇总头像的自定义样式 */
  maxStyle: Object as PropType<CSSProperties>,
  /** 汇总 Popover 的属性 */
  maxPopoverProps: Object as PropType<PopoverProps>,
  /** 组内头像的重叠偏移量 */
  offset: {
    type: [Number, String] as PropType<number | string>,
    validator: (value: number | string) => typeof value === 'string' || Number.isFinite(value),
  },
  /** 是否纵向堆叠 */
  vertical: Boolean,
}

export type AvatarProps = import('vue').ExtractPublicPropTypes<typeof avatarProps>
export type AvatarGroupProps = import('vue').ExtractPublicPropTypes<typeof avatarGroupProps>
