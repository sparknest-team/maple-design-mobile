import type { PropType } from 'vue'

export const RADIO_VARIANTS = ['radio', 'button'] as const
export type RadioVariant = (typeof RADIO_VARIANTS)[number]
export const radioVariantProp = {
  type: String as PropType<RadioVariant>,
  default: 'radio' as RadioVariant,
  validator: (value: unknown): value is RadioVariant => RADIO_VARIANTS.includes(value as RadioVariant),
}
