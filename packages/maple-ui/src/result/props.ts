import { type PropType } from 'vue'

export type ResultStatus = 'info' | 'success' | 'warning' | 'danger' | 'question' | 'empty'

export const props = {
  imageSize: [String, Number],
  status: {
    type: String as PropType<ResultStatus>,
    default: 'success',
  },
  title: String,
  subtitle: String,
  animation: {
    type: Boolean,
    default: true,
  },
}
