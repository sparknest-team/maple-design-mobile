import type { PropType } from 'vue'
import { buttonProps } from '../button'
import { defineListenerProp, type ExtractPublicPropTypes } from '../utils/components'

export const props = {
  /** 当前选中项，传入时由调用者控制 */
  active: {
    type: [Number, String] as PropType<number | string>,
    default: undefined,
  },
  /** 非受控模式的初始选中值，仅初始化时读取 */
  defaultActive: {
    type: [Number, String] as PropType<number | string>,
    default: 0,
  },
  zIndex: {
    type: [Number, String] as PropType<number | string>,
    default: undefined,
  },
  fixed: Boolean,
  border: Boolean,
  variant: Boolean,
  safeArea: Boolean,
  activeColor: String,
  inactiveColor: String,
  placeholder: Boolean,
  fabProps: Object as PropType<ExtractPublicPropTypes<typeof buttonProps>>,
  beforeChange: defineListenerProp<(active: number | string) => any | Promise<any>>(),
}
