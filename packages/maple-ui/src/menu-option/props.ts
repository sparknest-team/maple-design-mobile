import { type ExtractPropTypes, type PropType } from 'vue'
import { MenuOption } from '../menu/props'

export type MenuOptionKeyArrowX = 'ArrowLeft' | 'ArrowRight'

export const props = {
  label: {
    type: [String, Number, Function, Object] as PropType<any>,
  },
  value: {
    type: [String, Number, Object] as PropType<any>,
    default: undefined,
  },
  disabled: Boolean,
  ripple: {
    type: Boolean,
    default: true,
  },
  // internal start
  option: Object as PropType<MenuOption>,
  childrenTrigger: Boolean,
  highlight: Boolean,
  // internal end
}

export type MenuOptionProps = ExtractPropTypes<typeof props>
