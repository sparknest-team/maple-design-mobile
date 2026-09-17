import { isVNode, type ComputedRef, type InjectionKey, type VNode } from 'vue'
import type { TabsKey, TabsProps } from './props'

export interface TabEntry {
  key: TabsKey
  disabled: boolean
  hasPanel: boolean
}
export interface TabsContext {
  props: Readonly<TabsProps>
  entries: ComputedRef<TabEntry[]>
  active: ComputedRef<TabsKey | undefined>
  focused: { value: TabsKey | undefined }
  rtl: ComputedRef<boolean>
  id: (key: TabsKey, part: 'tab' | 'panel') => string
  select: (key: TabsKey) => void
  click: (key: TabsKey, event: Event) => void
  add: (event: Event) => void
  remove: (key: TabsKey, event: Event) => void
}
export const tabsInjectionKey: InjectionKey<TabsContext> = Symbol('Tabs')

export function flatten(nodes: VNode[] | VNode): VNode[] {
  return (Array.isArray(nodes) ? nodes : [nodes])
    .filter(isVNode)
    .flatMap((node) =>
      Array.isArray(node.children) && typeof node.type === 'symbol' ? flatten(node.children as VNode[]) : [node],
    )
}
