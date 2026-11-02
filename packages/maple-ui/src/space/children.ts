import { Comment, createTextVNode, Fragment, isVNode, Text, type VNode, type VNodeChild } from 'vue'

/** Keep visible text/zero and empty elements, but omit empty structural nodes. */
export function isEmptySpaceNode(value: VNodeChild): boolean {
  if (value == null || typeof value === 'boolean') {
    return true
  }
  if (Array.isArray(value)) {
    return value.every(isEmptySpaceNode)
  }
  if (!isVNode(value)) {
    return String(value).trim() === ''
  }
  return (
    value.type === Comment ||
    (value.type === Text && String(value.children ?? '').trim() === '') ||
    (value.type === Fragment &&
      (value.children == null ||
        (Array.isArray(value.children) && value.children.every((child) => isEmptySpaceNode(child as VNodeChild)))))
  )
}

export interface SpaceChild {
  node: VNode
  key: string
}

/** Key namespaces belong to one Space instance, never to a shared registry. */
export function createSpaceChildren() {
  const symbolKeys = new Map<symbol, number>()
  let serial = 0

  return (nodes: VNodeChild[]): SpaceChild[] => {
    const usedSymbols = new Set<symbol>()
    const result: SpaceChild[] = []
    const segment = (key: VNode['key'], index: number): string => {
      if (key == null) {
        return `i${index}`
      }
      if (typeof key === 'string') {
        return `s${key.length}:${key}`
      }
      if (typeof key === 'number') {
        return `n${key}`
      }
      usedSymbols.add(key)
      let id = symbolKeys.get(key)
      if (id === undefined) {
        id = serial++
        symbolKeys.set(key, id)
      }
      return `y${id}`
    }
    const visit = (children: VNodeChild[], parent: string) => {
      let index = 0
      for (const value of children) {
        if (isEmptySpaceNode(value)) {
          continue
        }
        if (Array.isArray(value)) {
          visit(value, `${parent}/${segment(null, index++)}`)
          continue
        }
        const node = isVNode(value) ? value : createTextVNode(String(value))
        const key = `${parent}/${segment(node.key, index++)}`
        if (node.type === Fragment && Array.isArray(node.children)) {
          visit(node.children as VNodeChild[], key)
        } else {
          result.push({ node, key })
        }
      }
    }
    visit(nodes, '')
    for (const symbol of symbolKeys.keys()) {
      if (!usedSymbols.has(symbol)) {
        symbolKeys.delete(symbol)
      }
    }
    return result
  }
}
