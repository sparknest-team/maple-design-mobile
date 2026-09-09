import { type PropType } from 'vue'
import type { ProgressSize } from './size'

export type { ProgressSize } from './size'

export type ProgressMode = 'line' | 'circle'

export type ProgressStatus =
  'default' | 'primary' | 'secondary' | 'tertiary' | 'info' | 'success' | 'warning' | 'danger'

export const props = {
  mode: {
    type: String as PropType<ProgressMode>,
    default: 'line',
  },
  strokeWidth: {
    type: [Number, String],
  },
  color: [String, Object] as PropType<string | Record<string, string>>,
  trackColor: String,
  percent: {
    type: [Number, String],
    default: 0,
  },
  showText: Boolean,
  textClass: String,
  size: {
    type: [Number, String] as PropType<ProgressSize>,
    default: 'md',
  },
  rotate: {
    type: Number,
    default: 0,
  },
  track: {
    type: Boolean,
    default: true,
  },
  indeterminate: Boolean,
  status: {
    type: String as PropType<ProgressStatus>,
    default: 'default',
  },
}
