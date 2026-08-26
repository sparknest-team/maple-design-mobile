import { iconProps } from '../icon'
import { pickProps } from '../utils/components'

export const props = {
  title: String,
  icon: pickProps(iconProps, 'name'),
  description: String,
  border: Boolean,
  borderOffset: [Number, String],
  iconClass: String,
  titleClass: String,
  descriptionClass: String,
  extraClass: String,
  ripple: Boolean,
}
