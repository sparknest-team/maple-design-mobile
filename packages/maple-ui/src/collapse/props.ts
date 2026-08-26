import { type PropType } from 'vue'

export type CollapseActiveNames = Array<string | number>

export type CollapseExpandIconPosition = 'left' | 'right'

export const props = {
  activeNames: Array as PropType<CollapseActiveNames>,
  defaultActiveNames: {
    type: Array as PropType<CollapseActiveNames>,
    default: () => [],
  },
  accordion: Boolean,
  offset: {
    type: Boolean,
    default: true,
  },
  divider: {
    type: Boolean,
    default: true,
  },
  elevation: {
    type: [Boolean, String, Number],
    default: true,
  },
  expandIconPosition: {
    type: String as PropType<CollapseExpandIconPosition>,
    default: 'right',
  },
  showExpandIcon: {
    type: Boolean,
    default: undefined,
  },
  destroyOnHide: Boolean,
}
