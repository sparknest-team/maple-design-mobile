import { Date as RootDate, DateRange as RootRange } from '@maple-design/ui-vue'
import DefaultDate, { Date as DateField } from '@maple-design/ui-vue/date'
import DefaultRange, { DateRange } from '@maple-design/ui-vue/date-range'

export const single: typeof DefaultDate = DateField
export const range: typeof DefaultRange = DateRange
export const root: typeof RootDate = DateField
export const rootRange: typeof RootRange = DateRange
