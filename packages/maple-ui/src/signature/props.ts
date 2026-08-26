import { type PropType } from 'vue'

export type SignatureDataUrlType = 'png' | 'jpg'

export const props = {
  lineWidth: {
    type: [Number, String],
    default: 2,
  },
  strokeStyle: {
    type: String,
    default: 'currentColor',
  },
  dataUrlType: {
    type: String as PropType<SignatureDataUrlType>,
    default: 'png',
  },
}
