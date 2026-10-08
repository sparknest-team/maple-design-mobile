import type { PropType } from 'vue'
import { choiceOptionsProps, radioGroupValueProps } from '../checkbox/choice-group-props'
import { componentSizes } from '../utils/constants'
import type { ComponentSize, Orientation } from '../utils/constants'
import { radioVariantProp } from './variant'

export const props = {
  ...radioGroupValueProps,
  variant: radioVariantProp,
  size: {
    type: String as PropType<ComponentSize>,
    validator: (value: unknown): value is ComponentSize => componentSizes.includes(value as ComponentSize),
  },
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
  ariaLabel: { type: String, default: '' },
}
