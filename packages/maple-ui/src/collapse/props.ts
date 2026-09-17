import type { PropType } from 'vue'

export type CollapseName = string | number
export type CollapseActiveNames = CollapseName[]
export const expandIconPositions = ['left', 'right'] as const
export type ExpandIconPosition = (typeof expandIconPositions)[number]

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
  showExpandIcon: {
    type: Boolean,
    default: undefined,
  },
  expandIconPosition: {
    type: String as PropType<ExpandIconPosition>,
    default: 'left',
    validator: (value: ExpandIconPosition) => expandIconPositions.includes(value),
  },
  bordered: {
    type: Boolean,
    default: true,
  },
  divider: {
    type: Boolean,
    default: true,
  },
  offset: Boolean,
  destroyOnHide: Boolean,
}

export const collapseItemProps = {
  name: {
    type: [String, Number] as PropType<CollapseName>,
    required: true as const,
  },
  title: String,
  disabled: Boolean,
  showExpandIcon: {
    type: Boolean,
    default: true,
  },
  destroyOnHide: Boolean,
}

export type CollapseProps = import('vue').ExtractPublicPropTypes<typeof collapseProps>
export type CollapseItemProps = import('vue').ExtractPublicPropTypes<typeof collapseItemProps> & { name: CollapseName }
