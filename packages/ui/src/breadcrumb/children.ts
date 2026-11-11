import { Comment, Fragment, isVNode, Text, type VNode } from 'vue'

export function flatChildren(nodes: VNode[]): VNode[] {
  return nodes.flatMap((node) => {
    if (!isVNode(node) || node.type === Comment || node.type === Text) {
      return []
    }
    return node.type === Fragment ? flatChildren((node.children ?? []) as VNode[]) : [node]
  })
}
