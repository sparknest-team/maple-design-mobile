import type { PropType } from 'vue'
import type { LoadingProps } from '../loading'

export const props = {
  /** 外部加载状态或加载指示器配置。 */
  loading: { type: [Boolean, Object] as PropType<boolean | Partial<LoadingProps>>, default: false },
  fullWidth: {
    type: [Number, String],
    default: '100%',
  },
  scrollerHeight: {
    type: [Number, String],
  },
  elevation: {
    type: [Boolean, Number],
    default: true,
  },
}
