import type { PropType } from 'vue'
import { fieldPresentationProps } from '../_components/field-presentation/props'
import { datePickerFieldsProp, timePickerFieldsProp } from '../_components/picker-field/fields'
import { openTriggerTargetProp } from '../_components/picker-field/open-trigger'
import { dateRuleProps, dateSingleValueProps } from '../date/core-props'
import type { DateValue } from '../date/date-value'
import { fieldDecoratorProps, fieldLoadingProps } from '../field-decorator/props'
import { popupContainerProp, type PopupContainer } from '../utils/popup-container'
import { calendarViewportProps } from './calendar-viewport-props'
import type { DatePickerOptions } from './picker-props'
import { props as panelProps } from './picker-props'
import type { DateWheelOptions } from './wheel-options'

export const props = {
  ...fieldLoadingProps,
  openTriggerTarget: openTriggerTargetProp,
  dateFields: datePickerFieldsProp,
  timeFields: timePickerFieldsProp,
  ...fieldPresentationProps,
  ...dateRuleProps,
  ...calendarViewportProps,
  ...dateSingleValueProps,
  type: panelProps.type,
  panelType: { ...panelProps.presentation, default: 'calendar' as const },
  multiple: Boolean,
  modelValue: [String, Number, Date, Array] as PropType<DateValue | DateValue[] | null>,
  defaultValue: [String, Number, Date, Array] as PropType<DateValue | DateValue[]>,
  open: { type: Boolean, default: undefined },
  defaultOpen: Boolean,
  disableConfirm: Boolean,
  popupContainer: popupContainerProp,
  /** 可选的字段浮层展示配置，placement 默认 bottom-start；交给底层 Trigger 自动定位，可覆盖首选方位；不增加顶层 placement，不允许覆盖字段状态和规则 */
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
  variant: { ...fieldDecoratorProps.variant, default: 'outline' },
  hint: fieldDecoratorProps.hint,
  line: fieldDecoratorProps.line,
  textColor: fieldDecoratorProps.textColor,
  focusColor: fieldDecoratorProps.focusColor,
  blurColor: fieldDecoratorProps.blurColor,
}
export type DateProps = import('../_utils/public-props').CompatiblePublicProps<typeof props>
export type DateType = NonNullable<DateProps['type']>
