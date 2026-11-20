import { isEditable } from '../_utils/is-editable'

export function canRestoreFocus(element: HTMLElement) {
  if (
    !element.isConnected ||
    element.matches(':disabled') ||
    element.closest('[hidden],[inert],[aria-hidden="true"]')
  ) {
    return false
  }
  const view = element.ownerDocument.defaultView
  for (let node: HTMLElement | null = element; node; node = node.parentElement) {
    const style = view?.getComputedStyle(node)
    if (style?.display === 'none' || style?.visibility === 'hidden') {
      return false
    }
  }
  return true
}
export function isTabStop(element: HTMLElement) {
  const parent = element.parentElement
  const tabIndexAttribute = element.getAttribute('tabindex')
  const hasValidTabIndex = tabIndexAttribute !== null && /^[ \t\n\f\r]*[+-]?\d/.test(tabIndexAttribute)
  const editableHost =
    element.hasAttribute('contenteditable') &&
    !hasValidTabIndex &&
    isEditable(element) &&
    (!parent || !isEditable(parent))
  return (element.tabIndex >= 0 || editableHost) && canRestoreFocus(element)
}
