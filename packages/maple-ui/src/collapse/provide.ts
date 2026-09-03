import type { ComputedRef, InjectionKey, Slots } from 'vue'
import type { CollapseExpandIconPosition, CollapseName } from './props'

export interface CollapseItemContext {
  name: CollapseName
  disabled: ComputedRef<boolean>
}

export interface CollapseContext {
  activeNames: CollapseName[]
  slots: Slots
  showExpandIcon?: boolean
  expandIconPosition: CollapseExpandIconPosition
  destroyOnHide: boolean
  divider: boolean
  offset: boolean
  elevation: boolean | number | string
  handleClick: (name: CollapseName, e: Event) => void
  addItem: (item: CollapseItemContext) => void
  removeItem: (name: CollapseName) => void
}

export const collapseKey: InjectionKey<CollapseContext> = Symbol('collapseCtx')
