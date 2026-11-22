import { Comment, Fragment, isVNode, Text, type VNode } from 'vue'

/** Use the first actual structural node; conditional slots may yield comments. */
export function firstStructuralNode(nodes: unknown): VNode | undefined {
  if (Array.isArray(nodes)) {
    for (const node of nodes) {
      const result = firstStructuralNode(node)
      if (result) {
        return result
      }
    }
    return undefined
  }
  if (!isVNode(nodes) || nodes.type === Comment) {
    return undefined
  }
  if (nodes.type === Text && !String(nodes.children ?? '').trim()) {
    return undefined
  }
  if (nodes.type === Fragment && Array.isArray(nodes.children)) {
    return firstStructuralNode(nodes.children)
  }
  return nodes
}
