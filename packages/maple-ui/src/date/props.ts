import type { PropType } from 'vue'
import { fieldPresentationProps } from '../_components/field-presentation/props'
import { dateRuleProps, dateSingleValueProps } from '../date/core-props'
import type { DateValue } from '../date/date-value'
import { fieldDecoratorProps } from '../field-decorator/props'
import { popupContainerProp, type PopupContainer } from '../utils/popup-container'
import type { DatePickerOptions } from './picker-props'
import { props as panelProps } from './picker-props'
import type { DateWheelOptions } from './wheel-options'

export const props = {
  ...fieldPresentationProps,
  ...dateRuleProps,
  ...dateSingleValueProps,
  type: panelProps.type,
  panelType: { ...panelProps.presentation, default: 'calendar' as const },
  multiple: Boolean,
  modelValue: [String, Number, Date, Array] as PropType<DateValue | DateValue[]>,
  defaultValue: [String, Number, Date, Array] as PropType<DateValue | DateValue[]>,
  open: { type: Boolean, default: undefined },
  defaultOpen: Boolean,
  disableConfirm: Boolean,
  popupContainer: popupContainerProp,
  popupProps: {
    type: Object as PropType<Record<string, unknown> & { popupContainer?: PopupContainer }>,
    default: () => ({}),
  },
  datePickerProps: { type: Object as PropType<DatePickerOptions>, default: () => ({}) },

  pickerProps: { type: Object as PropType<DateWheelOptions>, default: () => ({}) },
  inputEditable: { type: Boolean, default: true },
  disabled: { type: Boolean, default: undefined },
  readonly: { type: Boolean, default: undefined },
  error: { type: Boolean, default: undefined },
  clearable: { type: Boolean, default: true },
  placeholder: String,
  separator: { type: String, default: ', ' },
  size: fieldDecoratorProps.size,
  variant: { ...fieldDecoratorProps.variant, default: 'standard' },
  hint: fieldDecoratorProps.hint,
  line: fieldDecoratorProps.line,
  textColor: fieldDecoratorProps.textColor,
  focusColor: fieldDecoratorProps.focusColor,
  blurColor: fieldDecoratorProps.blurColor,
}
export type DateProps = import('vue').ExtractPublicPropTypes<typeof props>
export type DateType = NonNullable<DateProps['type']>
