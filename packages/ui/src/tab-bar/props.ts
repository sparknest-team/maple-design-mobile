import type { PropType } from 'vue'
import { buttonProps } from '../button/props'
import { defineListenerProp, type ExtractPublicPropTypes } from '../utils/components'

export type TabBarVariant = 'standard' | 'pill'
/** Truthy results allow the switch; falsy results cancel it. */
export type TabBarBeforeChange = (active: number | string) => unknown

export const props = {
  /** 外部加载状态；加载期间不能切换。 */
  loading: Boolean,
  /** 当前选中项，传入时由调用者控制 */
  modelValue: {
    type: [Number, String] as PropType<number | string>,
    default: undefined,
  },
  /** 非受控模式的初始选中值，仅初始化时读取 */
  defaultValue: {
    type: [Number, String] as PropType<number | string>,
    default: 0,
  },
  zIndex: {
    type: [Number, String] as PropType<number | string>,
    default: undefined,
  },
  fixed: Boolean,
  border: Boolean,
  /** 外观样式：标准或胶囊指示器 */
  variant: {
    type: String as PropType<TabBarVariant>,
    default: 'standard',
    validator: (value: string) => ['standard', 'pill'].includes(value),
  },
  safeArea: Boolean,
  activeColor: String,
  inactiveColor: String,
  placeholder: Boolean,
  fabProps: Object as PropType<ExtractPublicPropTypes<typeof buttonProps>>,
  beforeChange: defineListenerProp<TabBarBeforeChange>(),
}
