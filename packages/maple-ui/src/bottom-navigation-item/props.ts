import { type PropType } from 'vue'
import { badgeProps } from '../badge'
import { iconProps } from '../icon'
import { pickProps, type ExtractPublicPropTypes } from '../utils/components'

export const props = {
  name: String,
  label: String,
  icon: pickProps(iconProps, 'name'),
  badge: {
    type: [Boolean, Object] as PropType<boolean | ExtractPublicPropTypes<typeof badgeProps>>,
    default: false,
  },
}
