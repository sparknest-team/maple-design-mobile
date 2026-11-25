import { isVNode, type ComputedRef, type InjectionKey, type Ref, type VNode } from 'vue'
import type { TabsName, TabsProps } from './props'

export interface TabEntry {
  name: TabsName
  disabled: boolean
  hasPanel: boolean
}
export interface TabsContext {
  props: Readonly<TabsProps>
  entries: Readonly<Ref<TabEntry[]>>
  enabled: ComputedRef<TabsName[]>
  tabStop: ComputedRef<TabsName | undefined>
  active: ComputedRef<TabsName | undefined>
  focused: { value: TabsName | undefined }
  rtl: ComputedRef<boolean>
  rtlAt: (element?: Element) => boolean
  id: (key: TabsName, part: 'tab' | 'panel' | 'title' | 'close') => string
  focusTab: (key: TabsName, scope: Document | ShadowRoot) => void
  select: (key: TabsName) => void
  click: (key: TabsName, event: Event) => void
  add: (event: Event) => void
  remove: (key: TabsName, event: Event) => void
}
export const tabsInjectionKey: InjectionKey<TabsContext> = Symbol('Tabs')

export function flatten(nodes: VNode[] | VNode): VNode[] {
  return (Array.isArray(nodes) ? nodes : [nodes])
    .filter(isVNode)
    .flatMap((node) =>
      Array.isArray(node.children) && typeof node.type === 'symbol' ? flatten(node.children as VNode[]) : [node],
    )
}

export function focusScope(element: Element): Document | ShadowRoot {
  const root = element.getRootNode()
  return 'activeElement' in root ? (root as Document | ShadowRoot) : element.ownerDocument
}
