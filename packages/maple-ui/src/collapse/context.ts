import type { ComputedRef, InjectionKey, Slots } from 'vue'
import type { CollapseName, ExpandIconPosition } from './props'

export interface CollapseItemContext {
  name: CollapseName
  disabled: ComputedRef<boolean>
}

export interface CollapseContext {
  activeNames: CollapseName[]
  slots: Slots
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
