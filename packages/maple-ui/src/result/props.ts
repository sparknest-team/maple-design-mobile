import { type PropType } from 'vue'

export type ResultStatus = 'info' | 'success' | 'warning' | 'danger' | 'question' | 'empty' | '403' | '404' | '500'

export const props = {
  imageSize: [String, Number],
  status: {
    type: String as PropType<ResultStatus>,
    default: 'info',
  },
  title: String,
  subtitle: String,
  animation: {
    type: Boolean,
    default: true,
  },
}
