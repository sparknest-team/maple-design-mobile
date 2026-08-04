import { PropType } from 'vue'
import { MenuOption } from '../menu/props'
import { defineListenerProp } from '../utils/components'

export type MenuOptionKeyArrowX = 'ArrowLeft' | 'ArrowRight'

export const props = {
  label: {},
  value: {},
  disabled: Boolean,
  ripple: {
    type: Boolean,
    default: true,
  },
  // internal start
  option: Object as PropType<MenuOption>,
  childrenTrigger: Boolean,
  highlight: Boolean,
  onKeyArrowX: defineListenerProp<(key: MenuOptionKeyArrowX) => void>(),
  // internal end
}
