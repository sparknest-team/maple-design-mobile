import type { NavMenuFieldNames, NavMenuKey, NavMenuNode, NavMenuOption } from './types'

/** Data-first tree/path indexing, inspired by Naive UI Menu's TreeMate usage.
 * No component registration or cross-library runtime dependency is required. */
export function createNavMenuTree(options: NavMenuOption[], fields: NavMenuFieldNames = {}) {
  const names = { key: 'key', label: 'label', children: 'children', disabled: 'disabled', ...fields }
  const byKey = new Map<NavMenuKey, NavMenuNode>()
  function visit(list: NavMenuOption[], parent?: NavMenuNode, level = 0): NavMenuNode[] {
    return list
      .filter((option) => option.show !== false)
      .map((option, index) => {
        const type = option.type ?? 'item'
        const rawKey = option[names.key]
        if (type === 'item' && typeof rawKey !== 'string' && typeof rawKey !== 'number') {
          throw new Error('NavMenu options require a string or number key')
        }
        const key = (rawKey ?? `__nav_${parent?.key ?? 'root'}_${type}_${index}`) as NavMenuKey
        if (byKey.has(key)) {
          throw new Error(`NavMenu duplicate key: ${key}`)
        }
        const node: NavMenuNode = {
          key,
          option,
          parent,
          level,
          type,
          disabled: !!parent?.disabled || !!option[names.disabled],
          children: [],
        }
        byKey.set(key, node)
        const children = option[names.children]
        if (Array.isArray(children)) {
          node.children = visit(children, node, level + (type === 'group' ? 0 : 1))
        }
        return node
      })
  }
  const roots = visit(options)
  const ancestors = (key: NavMenuKey | null | undefined) => {
    const result: NavMenuNode[] = []
    let node = key == null ? undefined : byKey.get(key)?.parent
    while (node) {
      if (node.type === 'item') {
        result.unshift(node)
      }
      node = node.parent
    }
    return result
  }
  return { roots, byKey, names, ancestors }
}
