import type { CSSProperties, ExtractPropTypes, PropType } from 'vue'

export const avatarShapes = ['circle', 'square'] as const
export const avatarTriggerTypes = ['button', 'mask'] as const
export const avatarObjectFits = ['fill', 'contain', 'cover', 'none', 'scale-down'] as const

export type AvatarShape = (typeof avatarShapes)[number]
export type AvatarTriggerType = (typeof avatarTriggerTypes)[number]
export type ObjectFit = (typeof avatarObjectFits)[number]

export const props = {
  shape: {
    type: String as PropType<AvatarShape>,
    default: 'circle',
    validator: (value: unknown): value is AvatarShape => avatarShapes.includes(value as AvatarShape),
  },
  imageUrl: String,
  alt: { type: String, default: '' },
  size: Number,
  autoFixFontSize: { type: Boolean, default: true },
  triggerType: {
    type: String as PropType<AvatarTriggerType>,
    default: 'button',
    validator: (value: unknown): value is AvatarTriggerType => avatarTriggerTypes.includes(value as AvatarTriggerType),
  },
  triggerIconStyle: Object as PropType<CSSProperties>,
  objectFit: {
    type: String as PropType<ObjectFit>,
    default: 'cover',
    validator: (value: unknown): value is ObjectFit => avatarObjectFits.includes(value as ObjectFit),
  },
  color: String,
  bordered: Boolean,
  borderColor: String,
  loading: String,
  error: String,
  lazy: Boolean,
  hoverable: Boolean,
}

export type AvatarProps = ExtractPropTypes<typeof props>
