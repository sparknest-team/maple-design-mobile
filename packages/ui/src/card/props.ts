import type { CSSProperties, PropType } from 'vue'
import type { CompatiblePublicProps as ExtractPublicPropTypes } from '../_utils/public-props'
import type { ComponentSize } from '../utils/constants'

export const cardVariants = ['default', 'outline', 'tonal'] as const
export const cardSizes = ['sm', 'md'] as const
export const cardDirections = ['row', 'column', 'row-reverse'] as const
export type CardVariant = (typeof cardVariants)[number]
export type CardSize = Extract<ComponentSize, 'sm' | 'md'>
export type CardDirection = (typeof cardDirections)[number]
export type CardFit = 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'

export const cardProps = {
  /** 视觉变体 */
  variant: {
    type: String as PropType<CardVariant>,
    default: 'outline',
    validator: (v: CardVariant) => cardVariants.includes(v),
  },
  /** 内容密度；仅实现 sm/md */
  size: { type: String as PropType<CardSize>, validator: (v: CardSize) => cardSizes.includes(v) },
  /** 封面与正文排列 */
  direction: {
    type: String as PropType<CardDirection>,
    default: 'column',
    validator: (v: CardDirection) => cardDirections.includes(v),
  },
  hoverable: Boolean,
  titleStyle: Object as PropType<CSSProperties>,
  title: String,
  subtitle: String,
  description: String,
  topDivider: Boolean,
  bottomDivider: Boolean,
  imageSrc: String,
  imageFit: { type: String as PropType<CardFit>, default: 'cover' },
  imageHeight: [String, Number],
  imageWidth: [String, Number],
  imageAlt: String,
  elevation: { type: [Boolean, Number] as PropType<boolean | number>, default: 0 },
  ripple: Boolean,
  floating: Boolean,
  floatingDuration: { type: Number, default: 250, validator: (value: number) => Number.isFinite(value) && value >= 0 },
  ariaLabel: String,
  ariaLabelledby: String,
  closeButtonAriaLabel: String,
}
export type CardProps = ExtractPublicPropTypes<typeof cardProps>
