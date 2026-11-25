import { nextTick, onActivated, onBeforeUnmount, onDeactivated, watch, type Ref } from 'vue'
import { containingFrame } from './geometry'

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

function documentChain(start: Document) {
  const documents = [start]
  const frames: Element[] = []
  for (let frame = containingFrame(start); frame; frame = containingFrame(frame.ownerDocument)) {
    frames.push(frame)
    documents.push(frame.ownerDocument)
  }
  return { documents, frames }
}

function activeControl(doc: Document) {
  const current = doc.activeElement
  return current === doc.body || current === doc.documentElement ? null : current
}

// The consumer may move the focused shadow descendant while Vue moves its host.
function belongsToAnchor(focused: HTMLElement, anchor: HTMLElement) {
  let node: Element | undefined = focused
  while (node && node !== anchor) {
    node = (node.getRootNode() as ShadowRoot).host
  }
  return node === anchor
}

function canRestore(owner: Document, destination: Document, anchor: HTMLElement, focused: HTMLElement): boolean {
  function available(doc: Document, frames?: Element[]) {
    const current = activeControl(doc)
    return !current || frames?.includes(current) || (current === anchor && deepestActive(anchor) === focused)
  }
  if (owner === destination) {
    return available(owner)
  }
  const from = documentChain(owner)
  const to = documentChain(destination)
  const common = from.documents.find((doc) => to.documents.includes(doc))
  if (!common?.hasFocus()) {
    return false
  }
  const frames = from.frames.concat(to.frames)
  return from.documents.concat(to.documents).every((doc) => available(doc, frames))
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
  const suspend = () => {
    active = false
    invalidate()
  }
  onDeactivated(suspend)
  onActivated(() => {
    active = true
  })
  onBeforeUnmount(suspend)
  watch(
    [target, inline],
    () => {
      invalidate()
      const root = popup.value
      const focusRoot = root?.getRootNode() as Document | ShadowRoot | undefined
      const anchor = focusRoot?.activeElement as HTMLElement | null | undefined
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
          popup.value !== root ||
          !root.contains(anchor) ||
          !belongsToAnchor(focused, anchor) ||
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
      const current = activeControl(doc)
      return !current || current === moving || chain.frames.includes(current)
    })
  }
}
