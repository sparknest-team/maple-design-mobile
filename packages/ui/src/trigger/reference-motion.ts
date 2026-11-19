import { getScrollViews, getSlotChangeRoots, positionParent } from './position'

const motionEvents = ['transitionend', 'transitioncancel', 'animationend', 'animationcancel']

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
