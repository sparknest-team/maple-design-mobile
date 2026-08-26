import { type PropType } from 'vue'

export type AvatarSize = 'mini' | 'small' | 'normal' | 'large' | number | string

export type AvatarShape = 'circle' | 'square'

export type AvatarObjectFit = 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'

export const props = {
  shape: {
    type: String as PropType<AvatarShape>,
    default: 'circle',
  },
  size: {
    type: [String, Number] as PropType<AvatarSize>,
    default: 'normal',
  },
  alt: String,
  color: String,
  imageUrl: String,
  objectFit: {
    type: String as PropType<AvatarObjectFit>,
    default: 'cover',
  },
  bordered: Boolean,
  borderColor: String,
  loading: String,
  error: String,
  lazy: Boolean,
  hoverable: Boolean,
}
