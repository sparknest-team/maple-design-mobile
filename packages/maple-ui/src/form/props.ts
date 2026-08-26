import { type PropType } from 'vue'

export type FormScrollToError = 'start' | 'end'

export type FormLayout = 'horizontal' | 'vertical'

export const props = {
  model: Object as PropType<Record<string, any>>,
  layout: {
    type: String as PropType<FormLayout>,
    default: 'vertical',
  },
  disabled: Boolean,
  readonly: Boolean,
  scrollToError: String as PropType<FormScrollToError>,
  scrollToErrorOffsetY: {
    type: [String, Number],
    default: 0,
  },
}
