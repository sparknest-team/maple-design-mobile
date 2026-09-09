import type { PropType } from 'vue'
import type { MenuOptionData } from './types'

export type MenuOptionKeyArrowX = 'ArrowLeft' | 'ArrowRight'
export const props = {
  label: { type: [String, Number, Boolean, Function, Object, Array] as PropType<any>, default: undefined },
  value: { type: [String, Number, Boolean, Object] as PropType<any>, default: undefined },
  disabled: Boolean,
  ripple: { type: Boolean, default: true },
  option: Object as PropType<MenuOptionData>,
  childrenTrigger: Boolean,
  highlight: Boolean,
  active: Boolean,
  uninjectContext: Boolean,
}
export const menuOptionProps = props
export type MenuOptionProps = import('vue').ExtractPublicPropTypes<typeof props>
