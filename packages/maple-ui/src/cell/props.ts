import { iconProps } from '../icon'
import { pickProps } from '../utils/components'

export const props = {
  title: String,
  icon: pickProps(iconProps, 'name'),
  description: String,
  border: Boolean,
  borderOffset: {
    type: [Number, String],
    validator: (value: number | string) => typeof value === 'string' || Number.isFinite(value),
  },
  iconClass: String,
  titleClass: String,
  descriptionClass: String,
  extraClass: String,
  ripple: Boolean,
  clickable: { type: Boolean, default: undefined },
  actionAriaLabel: String,
}

export interface CellSlots {
  default?: () => import('vue').VNodeChild
  icon?: () => import('vue').VNodeChild
  description?: () => import('vue').VNodeChild
  extra?: () => import('vue').VNodeChild
}
export type CellEmits = { click: [event: Event] }
