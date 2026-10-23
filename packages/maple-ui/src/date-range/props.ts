import type { PropType } from 'vue'
import { fieldPresentationProps } from '../_components/field-presentation/props'
import { dateRangeValueProps, dateRuleProps } from '../date/core-props'
import type { DateValue } from '../date/date-value'
import type { DateWheelOptions } from '../date/wheel-options'
import { fieldDecoratorProps } from '../field-decorator/props'
import { popupContainerProp, type PopupContainer } from '../utils/popup-container'
import type { DateRangeCalendarOptions } from './calendar-options'
import type { DateRangePickerOptions } from './picker-props'
import { props as panelProps } from './picker-props'

export const props = {
  ...fieldPresentationProps,
  ...dateRuleProps,
  ...dateRangeValueProps,
  type: panelProps.type,
  showNowButton: panelProps.showNowButton,
  panelType: { ...panelProps.presentation, default: 'calendar' as const },

  open: { type: Boolean, default: undefined },
  defaultOpen: Boolean,
  disableConfirm: Boolean,
  popupContainer: popupContainerProp,
  popupProps: {
    type: Object as PropType<Record<string, unknown> & { popupContainer?: PopupContainer }>,
    default: () => ({}),
  },
  dateRangePickerProps: { type: Object as PropType<DateRangePickerOptions>, default: () => ({}) },
  datePickerProps: { type: Object as PropType<DateRangeCalendarOptions>, default: () => ({}) },
  pickerProps: { type: Object as PropType<DateWheelOptions>, default: () => ({}) },
  inputEditable: { type: Boolean, default: true },
  disabled: { type: [Boolean, Array] as PropType<boolean | boolean[]>, default: undefined },
  readonly: { type: Boolean, default: undefined },
  error: { type: Boolean, default: undefined },
  clearable: { type: Boolean, default: true },
  placeholder: [String, Array] as PropType<string | string[]>,
  separator: { type: String, default: ' ~ ' },
  size: fieldDecoratorProps.size,
  variant: { ...fieldDecoratorProps.variant, default: 'standard' },
  hint: fieldDecoratorProps.hint,
  line: fieldDecoratorProps.line,
  textColor: fieldDecoratorProps.textColor,
  focusColor: fieldDecoratorProps.focusColor,
  blurColor: fieldDecoratorProps.blurColor,
}
export type DateRangeProps = import('vue').ExtractPublicPropTypes<typeof props>
export type DateRangeType = NonNullable<DateRangeProps['type']>
export type DateRangePresentation = NonNullable<DateRangeProps['presentation']>
