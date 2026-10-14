import type { HTMLAttributes, PropType } from 'vue'

export type FormItemAsteriskPosition = 'start' | 'end'
export type FormItemValidateStatus = 'success' | 'warning' | 'error' | 'validating'

/** Presentation only: explicit status never changes the validator's result. */
export function resolveFormItemStatus(
  explicit: FormItemValidateStatus | undefined,
  automatic: FormItemValidateStatus | '' | undefined,
) {
  return explicit ?? automatic
}

export const formItemDecorationProps = {
  tooltip: String,
  showColon: { type: Boolean, default: false },
  contentClass: [String, Array, Object],
  contentFlex: { type: Boolean, default: true },
  labelComponent: { type: String, default: 'label' },
  labelAttrs: Object as PropType<HTMLAttributes & Record<string, unknown>>,
  asteriskPosition: { type: String as PropType<FormItemAsteriskPosition>, default: 'start' },
}
