import { type PropType } from 'vue'
import type { CollapseName } from './props'

export const collapseItemProps = {
  name: {
    type: [String, Number] as PropType<CollapseName>,
    required: true,
  },
  title: String,
  disabled: Boolean,
  showExpandIcon: {
    type: Boolean,
    default: true,
  },
  destroyOnHide: Boolean,
}

export const props = collapseItemProps
