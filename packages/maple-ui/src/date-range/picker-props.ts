import type { PropType } from 'vue'
import { dateRangeValueProps, dateRuleProps } from '../date/core-props'
import { props as presentationProps } from './presentation-props'

export type { DateRangePickerPresentation, DateRangePickerType } from './presentation-props'

export const props = {
  ...presentationProps,
  ...dateRuleProps,
  ...dateRangeValueProps,

  type: presentationProps.type,
  disabled: { type: [Boolean, Array] as PropType<boolean | boolean[]>, default: undefined },
}
export type DateRangePickerProps = import('vue').ExtractPublicPropTypes<typeof props>
