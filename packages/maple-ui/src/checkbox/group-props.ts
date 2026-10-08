import type { PropType } from 'vue'
import { checkboxGroupValueProps, choiceOptionsProps } from '../checkbox/choice-group-props'
import type { Orientation } from '../utils/constants'

export const props = {
  ...checkboxGroupValueProps,
  ...choiceOptionsProps,
  /** 是否禁用；未设置时继承表单 */
  disabled: { type: Boolean, default: undefined },
  /** 是否只读；未设置时继承表单 */
  readonly: { type: Boolean, default: undefined },
  /** 错误态；未设置时继承表单 */
  error: { type: Boolean, default: undefined },
  direction: {
    type: String as PropType<Orientation>,
    default: 'horizontal',
  },
}
