import { type PropType } from 'vue'
import { type ComponentSize } from '../utils/constants'

export type LoadingType = 'circle' | 'wave' | 'cube' | 'rect' | 'disappear'

export type LoadingSize = ComponentSize | number

export const props = {
  type: {
    type: String as PropType<LoadingType>,
    default: 'circle',
  },
  radius: [String, Number],
  size: {
    type: [String, Number] as PropType<LoadingSize>,
    default: 'md',
  },
  color: String,
  tip: String,
  loading: Boolean,
}
