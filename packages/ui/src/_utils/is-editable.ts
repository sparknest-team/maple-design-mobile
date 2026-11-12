export function isEditable(node: HTMLElement): boolean {
  if (typeof node.isContentEditable === 'boolean') {
    return node.isContentEditable
  }
  // Some DOM implementations do not expose isContentEditable. Match the
  // enumerated attribute values and walk the inherited state instead.
  let current: HTMLElement | null = node
  while (current) {
    const value = current.getAttribute('contenteditable')?.toLowerCase()
    if (value === '' || value === 'true' || value === 'plaintext-only') {
      return true
    }
    if (value === 'false') {
      return false
    }
    current = current.parentElement
  }
  return false
}
