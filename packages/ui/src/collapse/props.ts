import type { PropType, VNodeChild } from 'vue'

export type CollapseName = string | number
export type CollapseActiveNames = CollapseName[]
export const expandIconPositions = ['left', 'right'] as const
export type ExpandIconPosition = (typeof expandIconPositions)[number]

export type CollapseToggleAllOptions = {
  expand: boolean | 'inverse'
  skipDisabled?: boolean
}

export const collapseProps = {
  /** 当前展开项的 name 数组；手风琴模式最多一项。 */
  modelValue: Array as PropType<CollapseActiveNames>,
  /** 非受控初始值，仅创建时读取；后续修改不重置当前状态。 */
  defaultValue: {
    type: Array as PropType<CollapseActiveNames>,
    default: () => [],
  },
  accordion: Boolean,
  showExpandIcon: {
    type: Boolean,
    default: undefined,
  },
  /** 展开图标在标题区域的 left 或 right 位置，默认 left；不控制内容展开方向 */
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
  /** 标题层级；未设置时不添加标题角色。 */
  headingLevel: {
    type: Number,
    validator: (value: number) => Number.isInteger(value) && value >= 1 && value <= 6,
  },
  /** 是否将内容声明为区域地标。 */
  region: {
    type: Boolean,
    default: true,
  },
  disabled: Boolean,
  showExpandIcon: {
    type: Boolean,
    default: true,
  },
  destroyOnHide: Boolean,
}

export type CollapseProps = import('../_utils/public-props').CompatiblePublicProps<typeof collapseProps>
export type CollapseItemProps = import('../_utils/public-props').CompatiblePublicProps<typeof collapseItemProps> & {
  name: CollapseName
}

export interface CollapseExpandIconSlotProps {
  expanded: boolean
  disabled: boolean
  position: ExpandIconPosition
}
export interface CollapseSlots {
  default?: () => VNodeChild
  'expand-icon'?: (context: CollapseExpandIconSlotProps) => VNodeChild
}
export interface CollapseItemSlots extends CollapseSlots {
  title?: () => VNodeChild
  extra?: () => VNodeChild
}
