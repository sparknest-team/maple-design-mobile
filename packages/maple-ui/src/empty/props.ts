import { type ExtractPropTypes, type PropType } from 'vue'
import { componentSizes, type ComponentSize } from '../utils/constants'

export type EmptyImageSize = ComponentSize | number | string

export const emptyProps = {
  description: String,
  imageUrl: String,
  alt: { type: String, default: '' },
  imageSize: {
    type: [String, Number] as PropType<EmptyImageSize>,
    default: 'md',
  },
  showIcon: { type: Boolean, default: true },
  showDescription: { type: Boolean, default: true },
}

export type EmptyProps = import('vue').ExtractPublicPropTypes<typeof emptyProps>
