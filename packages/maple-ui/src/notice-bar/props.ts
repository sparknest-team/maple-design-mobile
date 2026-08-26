import type { PropType } from 'vue'

export type NoticeBarMode = 'closeable' | undefined
export type NoticeBarType = 'info' | 'success' | 'warning' | 'danger'

export const props = {
  text: String,
  color: String,
  background: String,
  icon: {
    type: String,
    default: 'information-outline',
  },
  type: {
    type: String as PropType<NoticeBarType>,
    default: 'warning',
  },
  mode: String as PropType<NoticeBarMode>,
  scrollable: {
    type: Boolean,
    default: false,
  },
  speed: {
    type: [Number, String],
    default: 50,
  },
  delay: {
    type: [Number, String],
    default: 1,
  },
}
