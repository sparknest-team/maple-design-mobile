// Keep native navigation inside each visible surface. Intervene at its edges,
// where the browser would otherwise continue into the covered document.
import { isTabStop } from '../utils/focusable'

function tabStops(root: HTMLElement, otherRoots: HTMLElement[]) {
  const items: HTMLElement[] = []
  function visit(node: Element) {
    const el = node as HTMLElement
    if (otherRoots.includes(el) || el.matches('[hidden],[inert],[aria-hidden="true"]')) {
      return
    }
    if (typeof el.focus === 'function' && el.getClientRects().length && isTabStop(el)) {
      items.push(el)
    }
    if (el.localName === 'slot') {
      const assigned = (el as HTMLSlotElement).assignedElements({ flatten: true })
      if (assigned.length) {
        assigned.forEach(visit)
        return
      }
    }
    Array.from((el.shadowRoot ?? el).children).forEach(visit)
  }
  visit(root)
  // Only one radio in a named group participates in sequential navigation.
  const stops = items.filter((el) => {
    const radio = el as HTMLInputElement
    if (radio.type !== 'radio' || !radio.name) {
      return true
    }
    const group = items.filter((item) => {
      const peer = item as HTMLInputElement
      return (
        peer.type === 'radio' &&
        peer.name === radio.name &&
        peer.form === radio.form &&
        peer.getRootNode() === radio.getRootNode()
      )
    })
    return el === (group.find((item) => (item as HTMLInputElement).checked) ?? group[0])
  })
  return stops.sort((a, b) => (a.tabIndex > 0 ? a.tabIndex : Infinity) - (b.tabIndex > 0 ? b.tabIndex : Infinity))
}

export function cycleCardTab(event: KeyboardEvent, roots: HTMLElement[]) {
  const path = event.composedPath()
  const index = roots
    .map((root) => {
      const tree = root.getRootNode() as Document | ShadowRoot
      return path.includes(root) || root.contains(tree.activeElement)
    })
    .lastIndexOf(true)
  const step = event.shiftKey ? -1 : 1
  if (index >= 0) {
    const current = tabStops(
      roots[index],
      roots.filter((root) => root !== roots[index]),
    )
    const edge = event.shiftKey ? current[0] : current.at(-1)
    const focused = (roots[index].getRootNode() as ShadowRoot).activeElement
    if (edge && !path.includes(edge) && focused !== edge && path[0] !== roots[index] && focused !== roots[index]) {
      return
    }
  }
  let next = index < 0 ? (event.shiftKey ? roots.length - 1 : 0) : (index + step + roots.length) % roots.length
  for (let i = 0; i < roots.length; i++) {
    const stops = tabStops(
      roots[next],
      roots.filter((root) => root !== roots[next]),
    )
    const target = event.shiftKey ? stops.at(-1) : stops[0]
    if (target) {
      event.preventDefault()
      target.focus({ preventScroll: true })
      return
    }
    next = (next + step + roots.length) % roots.length
  }
  event.preventDefault()
  roots[0]?.focus({ preventScroll: true })
}
