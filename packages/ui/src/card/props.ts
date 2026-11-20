import type { CSSProperties, PropType } from 'vue'
import type { CompatiblePublicProps as ExtractPublicPropTypes } from '../_utils/public-props'
import { componentSizes, type ComponentSize } from '../utils/constants'

export const cardVariants = ['default', 'outline', 'tonal'] as const
export const cardSizes = componentSizes
export const cardDirections = ['row', 'column', 'row-reverse'] as const
export type CardVariant = (typeof cardVariants)[number]
export type CardSize = ComponentSize
export type CardHeadingLevel = 1 | 2 | 3 | 4 | 5 | 6
export type CardDirection = (typeof cardDirections)[number]
const cardFooterAlignments = ['start', 'center', 'end'] as const
export type CardFooterAlign = (typeof cardFooterAlignments)[number]
export type CardFit = 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'

export const cardProps = {
  /** 视觉变体 */
  variant: {
    type: String as PropType<CardVariant>,
    default: 'outline',
    validator: (v: CardVariant) => cardVariants.includes(v),
  },
  /** 内容密度 */
  size: { type: String as PropType<CardSize>, validator: (v: CardSize) => cardSizes.includes(v) },
  /** 封面与正文排列 */
  direction: {
    type: String as PropType<CardDirection>,
    default: 'column',
    validator: (v: CardDirection) => cardDirections.includes(v),
  },
  hoverable: Boolean,
  /** 页脚内容的水平对齐，起止位置随文字方向。 */
  footerAlign: {
    type: String as PropType<CardFooterAlign>,
    default: 'end',
    validator: (align: CardFooterAlign) => cardFooterAlignments.includes(align),
  },
  titleStyle: Object as PropType<CSSProperties>,
  title: String,
  headingLevel: {
    type: Number as PropType<CardHeadingLevel>,
    validator: (level: number) => Number.isInteger(level) && level >= 1 && level <= 6,
  },
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
