import { nextTick, onActivated, onBeforeUnmount, onDeactivated, watch, type Ref } from 'vue'

function deepestActive(element: HTMLElement): HTMLElement {
  while (element.shadowRoot?.activeElement) {
    element = element.shadowRoot.activeElement as HTMLElement
  }
  return element
}

// A closed shadow root is indistinguishable from no shadow root. Refocusing
// its host may delegate to a different descendant than the one that was active.
const shadowHostNames = new Set([
  'article',
  'aside',
  'blockquote',
  'body',
  'div',
  'footer',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'header',
  'main',
  'nav',
  'p',
  'section',
  'span',
])
function mayHideShadow(element: HTMLElement): boolean {
  return !element.shadowRoot && (element.localName.includes('-') || shadowHostNames.has(element.localName))
}

function documentChain(start: Document): { documents: Document[]; frames: Element[] } {
  const documents = [start],
    frames: Element[] = []
  let current = start
  try {
    while (current.defaultView && current.defaultView.parent !== current.defaultView) {
      const frame = current.defaultView.frameElement
      if (!frame) {
        return { documents, frames }
      }
      frames.push(frame)
      current = frame.ownerDocument
      documents.push(current)
    }
  } catch {
    return { documents, frames }
  }
  return { documents, frames }
}

function canRestore(owner: Document, destination: Document, anchor: HTMLElement, focused: HTMLElement): boolean {
  if (owner === destination) {
    const current = owner.activeElement
    return (
      (!current || current === owner.body || current === owner.documentElement || current === anchor) &&
      (current !== anchor || deepestActive(anchor) === focused)
    )
  }
  // A shared accessible document is sufficient even when an ancestor is cross-origin.
  const from = documentChain(owner),
    to = documentChain(destination)
  const common = from.documents.find((doc) => to.documents.includes(doc))
  if (!common || !common.hasFocus()) {
    return false
  }
  const frames = new Set([...from.frames, ...to.frames])
  return [...new Set([...from.documents, ...to.documents])].every((doc) => {
    const current = doc.activeElement
    return (
      !current ||
      current === doc.body ||
      current === doc.documentElement ||
      frames.has(current) ||
      (current === anchor && deepestActive(anchor) === focused)
    )
  })
}

/** Preserve focus only when Vue moves the same live popup between containers. */
export function usePopupMoveFocus(
  target: Readonly<Ref<unknown>>,
  inline: () => boolean,
  popup: Readonly<Ref<HTMLElement | undefined>>,
  visible: Readonly<Ref<boolean>>,
) {
  let generation = 0
  let active = true
  let moving: HTMLElement | undefined
  const invalidate = () => {
    generation++
    moving = undefined
  }
  onDeactivated(() => {
    active = false
    invalidate()
  })
  onActivated(() => {
    active = true
  })
  onBeforeUnmount(() => {
    active = false
    invalidate()
  })
  watch(
    [target, inline],
    () => {
      invalidate()
      const root = popup.value
      const anchor = root?.ownerDocument.activeElement as HTMLElement | null | undefined
      if (!active || !visible.value || !root || !anchor || !root.contains(anchor)) {
        return
      }
      const focused = deepestActive(anchor)
      if (typeof focused.focus !== 'function' || mayHideShadow(focused)) {
        return
      }
      const owner = root.ownerDocument
      const token = generation
      moving = anchor
      nextTick(() => {
        if (token !== generation) {
          return
        }
        moving = undefined
        if (
          !active ||
          !visible.value ||
          !focused.isConnected ||
          !popup.value?.contains(anchor) ||
          !canRestore(owner, focused.ownerDocument, anchor, focused)
        ) {
          return
        }
        focused.focus({ preventScroll: true })
      })
    },
    { flush: 'pre' },
  )
  return (event: Event) => {
    if (!moving || moving !== event.target || (event as FocusEvent).relatedTarget) {
      return false
    }
    const owner = moving.ownerDocument
    const chain = documentChain(owner)
    if (!chain.documents[chain.documents.length - 1].hasFocus()) {
      return false
    }
    return chain.documents.every((doc) => {
      const current = doc.activeElement
      return (
        !current ||
        current === doc.body ||
        current === doc.documentElement ||
        current === moving ||
        chain.frames.includes(current)
      )
    })
  }
}
