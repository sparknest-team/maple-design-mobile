import { Fragment, isVNode, type VNode } from 'vue'

export function flatChildren(children: VNode[]): VNode[] {
  return children.flatMap((child) =>
    isVNode(child) && child.type === Fragment && Array.isArray(child.children)
      ? flatChildren(child.children as VNode[])
      : [child],
  )
}
