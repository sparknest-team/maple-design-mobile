import type { PropType } from 'vue'
import { fieldPresentationProps } from '../_components/field-presentation/props'
import { datePickerFieldsProp, timePickerFieldsProp } from '../_components/picker-field/fields'
import { openTriggerTargetProp } from '../_components/picker-field/open-trigger'
import { rangeInputAttrsProp } from '../_components/picker-field/props'
import { calendarViewportProps } from '../date/calendar-viewport-props'
import { dateRangeValueProps, dateRuleProps } from '../date/core-props'
import type { DateValue } from '../date/date-value'
import type { DateWheelOptions } from '../date/wheel-options'
import { fieldDecoratorProps, fieldLoadingProps } from '../field-decorator/props'
import { popupContainerProp, type PopupContainer } from '../utils/popup-container'
import type { DateRangeCalendarOptions } from './calendar-options'
import type { DateRangePickerOptions } from './picker-props'
import { props as panelProps } from './picker-props'

export const props = {
  ...fieldLoadingProps,
  inputAttrs: rangeInputAttrsProp,
  openTriggerTarget: openTriggerTargetProp,
  dateFields: datePickerFieldsProp,
  timeFields: timePickerFieldsProp,
  ...fieldPresentationProps,
  ...dateRuleProps,
  ...calendarViewportProps,
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
  variant: { ...fieldDecoratorProps.variant, default: 'outline' },
  hint: fieldDecoratorProps.hint,
  line: fieldDecoratorProps.line,
  textColor: fieldDecoratorProps.textColor,
  focusColor: fieldDecoratorProps.focusColor,
  blurColor: fieldDecoratorProps.blurColor,
}
export type DateRangeProps = import('../_utils/public-props').CompatiblePublicProps<typeof props>
export type DateRangeType = NonNullable<DateRangeProps['type']>
export type DateRangeEditMode = NonNullable<DateRangeProps['editMode']>
