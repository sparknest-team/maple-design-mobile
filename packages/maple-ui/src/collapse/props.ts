import { type PropType } from 'vue'

export type CollapseName = string | number

export type CollapseActiveNames = CollapseName[]

export const expandIconPositions = ['left', 'right'] as const

export type CollapseExpandIconPosition = (typeof expandIconPositions)[number]

export type CollapseToggleAllOptions = {
  expand: boolean | 'inverse'
  skipDisabled?: boolean
}

export const collapseProps = {
  activeNames: Array as PropType<CollapseActiveNames>,
  defaultActiveNames: {
    type: Array as PropType<CollapseActiveNames>,
    default: () => [],
  },
  accordion: Boolean,
  offset: Boolean,
  divider: {
    type: Boolean,
    default: true,
  },
  bordered: {
    type: Boolean,
    default: true,
  },
  elevation: {
    type: [Boolean, String, Number],
    default: true,
  },
  expandIconPosition: {
    type: String as PropType<CollapseExpandIconPosition>,
    default: 'left',
  },
  showExpandIcon: {
    type: Boolean,
    default: undefined,
  },
  destroyOnHide: Boolean,
}

export const props = collapseProps
