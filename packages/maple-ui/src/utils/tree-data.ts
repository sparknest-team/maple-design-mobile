/** Tree traversal carries actual ancestor nodes; never infers ancestry from string prefixes. */
export function findTreePath<T>(
  nodes: readonly T[],
  children: (node: T) => readonly T[] | undefined,
  match: (node: T) => boolean,
): T[] {
  for (const node of nodes) {
    if (match(node)) {
      return [node]
    }
    const path = findTreePath(children(node) ?? [], children, match)
    if (path.length) {
      return [node, ...path]
    }
  }
  return []
}
export function collectTreeLeaves<T>(
  nodes: readonly T[],
  children: (node: T) => readonly T[] | undefined,
  disabled: (node: T) => boolean = () => false,
  isLeaf: (node: T) => boolean = (node) => !children(node)?.length,
): T[] {
  return nodes.flatMap((node) =>
    disabled(node) ? [] : isLeaf(node) ? [node] : collectTreeLeaves(children(node) ?? [], children, disabled, isLeaf),
  )
}
export function collectTreePaths<T>(
  nodes: readonly T[],
  children: (node: T) => readonly T[] | undefined,
  disabled: (node: T) => boolean = () => false,
): T[][] {
  return nodes.flatMap((node) => {
    if (disabled(node)) {
      return []
    }
    const descendants = children(node)
    return descendants?.length
      ? collectTreePaths(descendants, children, disabled).map((path) => [node, ...path])
      : [[node]]
  })
}
