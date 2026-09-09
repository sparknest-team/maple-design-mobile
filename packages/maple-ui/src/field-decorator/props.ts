import { type PropType } from 'vue'
import { componentSizes, type ComponentSize } from '../utils/constants'

export type FieldDecoratorSize = ComponentSize

export type FieldDecoratorVariant = 'filled' | 'outline' | 'standard'

export const props = {
  value: {
    type: null,
    required: true as const,
  },
  id: {
    type: String,
    default: '',
  },
  isFocusing: Boolean,
  size: {
    type: String as PropType<FieldDecoratorSize>,
    default: 'md',
    validator: (value: ComponentSize) => componentSizes.includes(value),
  },
  variant: {
    type: String as PropType<FieldDecoratorVariant>,
    default: 'standard',
  },
  placeholder: String,
  line: {
    type: Boolean,
    default: true,
  },
  hint: {
    type: Boolean,
    default: true,
  },
  hintCenter: {
    type: Boolean,
    default: true,
  },
  textColor: String,
  focusColor: String,
  blurColor: String,
  isError: Boolean,
  formDisabled: Boolean,
  disabled: Boolean,
  clearable: Boolean,
  cursor: String,
  composing: Boolean,
}
