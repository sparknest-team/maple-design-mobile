import type { ComputedRef, InjectionKey } from 'vue'
import type { CollapseName, CollapseSlots, ExpandIconPosition } from './props'

export interface CollapseItemContext {
  name: CollapseName
  disabled: ComputedRef<boolean>
}

export interface CollapseContext {
  expandedNames: CollapseName[]
  slots: CollapseSlots
  showExpandIcon?: boolean
  expandIconPosition: ExpandIconPosition
  destroyOnHide: boolean
  divider: boolean
  offset: boolean
  handleClick: (name: CollapseName, e: Event) => void
  addItem: (item: CollapseItemContext) => void
  removeItem: (name: CollapseName) => void
}

export const collapseKey: InjectionKey<CollapseContext> = Symbol('collapseCtx')
