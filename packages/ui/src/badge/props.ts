import type { ExtractPublicPropTypes, PropType } from 'vue'
import { componentSizes, semanticStatuses } from '../utils/constants'
import type { ComponentSize, SemanticStatus } from '../utils/constants'

export const badgeModes = ['floating', 'inline'] as const
export const badgePositions = ['top-right', 'top-left', 'bottom-right', 'bottom-left', 'left', 'right'] as const
export const badgeInlinePositions = ['start', 'end'] as const
export const badgeVariants = ['default', 'outline'] as const

export type BadgeMode = (typeof badgeModes)[number]
export type BadgePosition = (typeof badgePositions)[number]
export type BadgeInlinePosition = (typeof badgeInlinePositions)[number]
export type BadgeVariant = (typeof badgeVariants)[number]

export const badgeProps = {
  description: String,
  dot: Boolean,
  max: { type: Number, default: 99, validator: (value: number) => Number.isFinite(value) && value >= 0 },
  show: { type: Boolean, default: true },
  showZero: { type: Boolean, default: false },
  offsetX: { type: Number, default: 0, validator: (value: number) => Number.isFinite(value) },
  offsetY: { type: Number, default: 0, validator: (value: number) => Number.isFinite(value) },
  color: String,
  content: {
    type: [Number, String] as PropType<number | string>,
    validator: (value: number | string) => typeof value === 'string' || (Number.isFinite(value) && value >= 0),
  },
  textColor: String,
  mode: {
    type: String as PropType<BadgeMode>,
    default: 'floating',
    validator: (value: unknown): value is BadgeMode => badgeModes.includes(value as BadgeMode),
  },
  /** 浮动徽标在宿主盒子中的物理角落或左右中点，默认 top-right；只在 floating 模式生效，RTL 不反转 */
  position: {
    type: String as PropType<BadgePosition>,
    default: 'top-right',
    validator: (value: unknown): value is BadgePosition => badgePositions.includes(value as BadgePosition),
  },
  /** 内联徽标位于宿主内容的逻辑 start 或 end，默认 end；仅 inline 模式生效 */
  inlinePosition: {
    type: String as PropType<BadgeInlinePosition>,
    default: 'end',
    validator: (value: unknown): value is BadgeInlinePosition =>
      badgeInlinePositions.includes(value as BadgeInlinePosition),
  },
  size: {
    type: String as PropType<ComponentSize>,
    default: 'md',
    validator: (value: unknown): value is ComponentSize => componentSizes.includes(value as ComponentSize),
  },
  status: {
    type: String as PropType<SemanticStatus>,
    default: 'danger',
    validator: (value: unknown): value is SemanticStatus => semanticStatuses.includes(value as SemanticStatus),
  },
  variant: {
    type: String as PropType<BadgeVariant>,
    default: 'default',
    validator: (value: unknown): value is BadgeVariant => badgeVariants.includes(value as BadgeVariant),
  },
}

export type BadgeProps = ExtractPublicPropTypes<typeof badgeProps>
