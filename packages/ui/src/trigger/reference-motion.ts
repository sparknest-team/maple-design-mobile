import { getScrollViews, getSlotChangeRoots, positionParent } from './position'

const motionEvents = ['transitionend', 'transitioncancel', 'animationend', 'animationcancel']

// Keyboard-driven page panning can continue after the final viewport event.
export function trackPopupAnchor(reference: Element, popup: HTMLElement, update: () => void) {
  const view = popup.ownerDocument.defaultView
  if (!view) {
    return
  }
  let active = true
  let previousX: number | undefined
  let previousY: number | undefined
  function measure() {
    if (!active || !view) {
      return
    }
    frame = view.requestAnimationFrame(measure)
    const anchor = reference.getBoundingClientRect()
    const panel = popup.getBoundingClientRect()
    const x = anchor.left - panel.left
    const y = anchor.top - panel.top
    if (active && (x !== previousX || y !== previousY)) {
      previousX = x
      previousY = y
      update()
    }
  }
  let frame = view.requestAnimationFrame(measure)
  return () => {
    active = false
    view.cancelAnimationFrame(frame)
  }
}

// Size observers do not report a transform-only movement of the reference.
export function observeReferenceMotion(reference: Element, update: () => void) {
  const roots = new Set<Document | ShadowRoot>([
    ...getScrollViews(reference).map((view) => view.document),
    ...getSlotChangeRoots(reference),
  ])
  const onMotion = (event: Event) => {
    const target = event.composedPath()[0]
    let element: Element | null = reference
    while (element) {
      if (element === target) {
        update()
        return
      }
      element = positionParent(element)
    }
  }
  for (const root of roots) {
    for (const type of motionEvents) {
      root.addEventListener(type, onMotion, true)
    }
  }
  return () => {
    for (const root of roots) {
      for (const type of motionEvents) {
        root.removeEventListener(type, onMotion, true)
      }
    }
  }
}
