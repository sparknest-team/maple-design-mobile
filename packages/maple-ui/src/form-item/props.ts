import { type PropType } from 'vue'
import { type FormLayout } from '../form/props'
import { defineListenerProp } from '../utils/components'

export type FormItemValidateTrigger = 'change' | 'input' | 'focus' | 'blur' | 'clear'

export type FormItemAsteriskPosition = 'start' | 'end'

export type FormItemLayout = FormLayout

export const props = {
  field: {
    type: String,
    default: '',
  },
  label: String,
  layout: String as PropType<FormItemLayout>,
  required: Boolean,
  hideLabel: Boolean,
  hideAsterisk: Boolean,
  asteriskPosition: {
    type: String as PropType<FormItemAsteriskPosition>,
    default: 'start',
  },
  help: String,
  extra: String,
  disabled: Boolean,
  noStyle: Boolean,
  rules: [Array, Function, Object] as PropType<any>,
  validateTrigger: {
    type: [String, Array] as PropType<FormItemValidateTrigger | FormItemValidateTrigger[]>,
    default: 'change',
  },
  onValidate: defineListenerProp<(valid: boolean) => void>(),
}
