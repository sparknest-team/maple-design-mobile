import {
  inject,
  nextTick,
  onActivated,
  onBeforeUnmount,
  onDeactivated,
  onMounted,
  provide,
  watch,
  type InjectionKey,
  type Ref,
} from 'vue'
import type { TriggerEvent } from './contract'
import { bindTriggerEvents, type TriggerElement } from './reference'
import { isTriggerReferenceClickBlocked } from './reference-click'
import { createDelayedTask } from './state'

export type { TriggerEvent } from './contract'
export interface InteractionOptions {
  trigger: TriggerEvent | TriggerEvent[]
  disabled?: boolean
  mouseEnterDelay?: number
  mouseLeaveDelay?: number
  focusDelay?: number
  popupHoverStay?: boolean
  blurToClose?: boolean
  closeOnClickReference?: boolean
  clickOutsideToClose?: boolean
  escToClose?: boolean
  restoreFocus?: boolean
}
interface InteractionContext {
  visible: Readonly<Ref<boolean>>
  contains: (event: Event | Node) => boolean
  enter: () => void
  leave: () => void
  children: Set<InteractionContext>
  escape?: (event: KeyboardEvent) => boolean
  dismiss?: () => void
  isTopLayer?: (event?: Event) => boolean
}
const interactionKey: InjectionKey<InteractionContext> = Symbol('trigger-interaction')
interface ReferenceInteraction {
  parent: InteractionContext | undefined
  visible: Readonly<Ref<boolean>>
  reference: Readonly<Ref<TriggerElement | undefined>>
  isTopLayer: (event?: Event) => boolean
  refreshRoots: () => void
}
interface PeerRegistry {
  peers: Set<ReferenceInteraction>
  closed: Set<ReferenceInteraction>
}
const referenceInteractions = new WeakMap<Document, PeerRegistry>()
// Eagerly mounted children can process the same capture event before their
// parent. Retain their dismissal ownership until this event is collected.
const dismissedInteractions = new WeakMap<Event, Set<InteractionContext>>()

// A pointer release or a label activation can be followed by another click in the same task.
function pendingActivation<T>() {
  let value: T | undefined
  const task = createDelayedTask()
  return {
    get value() {
      return value
    },
    set(next?: T) {
      task.cancel()
      value = next
    },
    expire() {
      task.schedule(() => {
        value = undefined
      })
    },
  }
}

function collectClosedRoots(element: Element | undefined | null, roots = new Set<ShadowRoot>()) {
  let root = element?.getRootNode()
  while (root && root.nodeType === 11 && 'host' in root) {
    const shadow = root as ShadowRoot
    if (shadow.mode === 'closed') {
      roots.add(shadow)
    }
    root = shadow.host.getRootNode()
  }
  return roots
}

function includes(element: Element | undefined, event: Event | Node): boolean {
  if (!element) {
    return false
  }
  if ('composedPath' in event) {
    return (
      event.composedPath().includes(element) ||
      Boolean(
        event.target && typeof (event.target as Node).nodeType === 'number' && element.contains(event.target as Node),
      )
    )
  }
  return element.contains(event)
}

/** An editor owns its nested triggers, including popups teleported outside its DOM. */
export function provideTriggerInteractionScope(
  visible: Readonly<Ref<boolean>>,
  rootContains: (event: Event | Node) => boolean,
) {
  const parent = inject(interactionKey, undefined)
  const children = new Set<InteractionContext>()
  const contains = (event: Event | Node): boolean =>
    rootContains(event) || [...children].some((child) => child.contains(event))
  const context: InteractionContext = {
    visible,
    contains,
    children,
    enter: () => parent?.enter(),
    leave: () => parent?.leave(),
  }
  provide(interactionKey, context)
  parent?.children.add(context)
  onBeforeUnmount(() => parent?.children.delete(context))
  const hasOpenPopup = (contexts: Set<InteractionContext>): boolean =>
    [...contexts].some((child) => child.visible.value || hasOpenPopup(child.children))
  const escapePopup = (event: KeyboardEvent, contexts = children): boolean => {
    for (const child of [...contexts].reverse()) {
      if (escapePopup(event, child.children) || child.escape?.(event)) {
        return true
      }
    }
    return false
  }
  const dismissPopups = (contexts: Set<InteractionContext>) => {
    for (const child of contexts) {
      child.dismiss?.()
      dismissPopups(child.children)
    }
  }
  return {
    contains,
    escapePopup,
    hasOpenPopup: () => hasOpenPopup(children),
    dismissPopups: () => dismissPopups(children),
  }
}

/** Shared behavior; positioning, theme names and rendering stay at the local boundary. */
export function useTriggerInteraction(
  options: InteractionOptions,
  api: {
    visible: Readonly<Ref<boolean>>
    reference: Readonly<Ref<TriggerElement | undefined>>
    popup: Readonly<Ref<HTMLElement | undefined | null>>
    popupTarget: Readonly<Ref<HTMLElement | string | false>>
    request: (visible: boolean, delay?: number) => void
    isTopLayer: (event?: Event) => boolean
    onPoint?: (event: MouseEvent) => void
    onOutside: (event: Event) => void
    isMovingBlur?: (event: Event) => boolean
  },
) {
  const parent = inject(interactionKey, undefined)
  const children = new Set<InteractionContext>()
  let insidePopup = false
  let insideReference = false
  let focusInside = false
  let restoringFocus = false
  const pointer = pendingActivation<{
    down: PointerEvent
    path: EventTarget[]
    target: Node | null
    related?: Node
    releasedPath?: EventTarget[]
  }>()
  const labelActivation = pendingActivation<{ control: Node; trusted: boolean }>()
  const differentPointer = (event: PointerEvent) => {
    const id = pointer.value?.down.pointerId
    return typeof id === 'number' && typeof event.pointerId === 'number' && event.pointerId !== id
  }
  const onPointerUp = (event: PointerEvent) => {
    if (pointer.value && !differentPointer(event)) {
      pointer.value.releasedPath = event.composedPath()
      pointer.expire()
    }
  }
  const onPointerDown = (event: PointerEvent) => {
    if (event.isPrimary === false) {
      return
    }
    labelActivation.set()
    pointer.set(
      api.visible.value && has('focus') && event.button === 0
        ? {
            down: event,
            path: event.composedPath(),
            target: typeof (event.target as Node | null)?.nodeType === 'number' ? (event.target as Node) : null,
          }
        : undefined,
    )
  }
  const onPointerCancel = (event: PointerEvent) => {
    if (!differentPointer(event)) {
      pointer.set()
      labelActivation.set()
    }
  }
  const has = (event: TriggerEvent) => ([] as TriggerEvent[]).concat(options.trigger).includes(event)
  const contains = (event: Event | Node): boolean =>
    includes(api.reference.value, event) ||
    includes(api.popup.value ?? undefined, event) ||
    [...children].some((child) => child.contains(event))
  const close = (delay = 0) => api.request(false, delay)
  const enter = () => {
    if (!options.disabled && has('hover')) {
      api.request(true, options.mouseEnterDelay ?? 0)
    }
    parent?.enter()
  }
  const leave = () => {
    if (has('hover') && !insideReference && !insidePopup && !focusInside) {
      close(options.mouseLeaveDelay ?? 0)
    }
    parent?.leave()
  }
  const context: InteractionContext = {
    visible: api.visible,
    isTopLayer: api.isTopLayer,
    dismiss: () => api.request(false),
    escape: (event) => onKeydown(event),
    contains,
    enter,
    leave,
    children,
  }
  provide(interactionKey, context)
  parent?.children.add(context)
  if (parent) {
    watch(parent.visible, (visible) => {
      if (!visible) {
        api.request(false)
      }
    })
  }

  const onClick = (event: Event) => {
    if (options.disabled || isTriggerReferenceClickBlocked(event)) {
      return
    }
    if (has('click')) {
      if (api.visible.value) {
        if (options.closeOnClickReference !== false) {
          close()
        }
      } else {
        api.onPoint?.(event as MouseEvent)
        api.request(true)
      }
    } else if (has('contextMenu') && api.visible.value) {
      close()
    }
  }
  const onEnter = (event: Event) => {
    insideReference = true
    // Capture an opening point, never overwrite an open context menu on re-entry.
    if (!options.disabled && has('hover') && !api.visible.value) {
      api.onPoint?.(event as MouseEvent)
    }
    enter()
  }
  const onLeave = () => {
    insideReference = false
    leave()
  }
  const onFocus = () => {
    focusInside = true
    if (!restoringFocus && !options.disabled && has('focus')) {
      api.request(true, options.focusDelay ?? 0)
    }
  }
  const onBlur = (event: Event) => {
    if (api.isMovingBlur?.(event)) {
      return
    }
    const related = (event as FocusEvent).relatedTarget as Node | null
    if (related && contains(related)) {
      return
    }
    focusInside = false
    if (has('focus') && options.blurToClose !== false && !(has('hover') && (insideReference || insidePopup))) {
      const pointerDismiss = pointer.value
      if (pointerDismiss) {
        if (related && pointerDismiss.path.includes(related)) {
          pointerDismiss.related = related
        } else if (
          related &&
          pointerDismiss.target &&
          pointerDismiss.path.some(
            (node) =>
              (node as Element).nodeType === 1 &&
              (node as Element).localName === 'label' &&
              (node as HTMLLabelElement).control === related,
          )
        ) {
          pointerDismiss.related = pointerDismiss.target
        } else if (!related && pointerDismiss.target && !contains(pointerDismiss.target)) {
          pointerDismiss.related = pointerDismiss.target
        }
      }
      close()
    }
  }
  const onContextMenu = (event: Event) => {
    if (options.disabled || !has('contextMenu')) {
      return
    }
    event.preventDefault()
    api.onPoint?.(event as MouseEvent)
    api.request(true)
  }
  watch(
    api.reference,
    (element, _previous, cleanup) => {
      cleanup(
        bindTriggerEvents(element, {
          click: onClick,
          mouseenter: onEnter,
          mouseleave: onLeave,
          focusin: onFocus,
          focusout: onBlur,
          contextmenu: onContextMenu,
        }),
      )
    },
    { flush: 'sync', immediate: true },
  )

  const popupEnter = () => {
    if (options.popupHoverStay === false) {
      return
    }
    insidePopup = true
    // Cancel pending leave without introducing another delayed open request.
    if (has('hover') && !options.disabled) {
      api.request(true)
    }
    parent?.enter()
  }
  const popupLeave = () => {
    insidePopup = false
    leave()
  }
  const peer: ReferenceInteraction = {
    parent,
    visible: api.visible,
    reference: api.reference,
    isTopLayer: api.isTopLayer,
    refreshRoots: () => refreshShadowRoots(),
  }
  let registry: PeerRegistry | undefined
  // A sibling reference can dismiss this whole branch while its child owns
  // the top layer. An unrelated top layer still protects the branch below it.
  const hasTopDescendant = (event: Event, branch = context): boolean =>
    [...branch.children].some(
      (child) =>
        dismissedInteractions.get(event)?.has(child) || child.isTopLayer?.(event) || hasTopDescendant(event, child),
    )
  const isTopPeerReference = (event: Event) => {
    if (!registry) {
      return false
    }
    for (const other of registry.peers) {
      if (
        other !== peer &&
        other.parent === parent &&
        includes(other.reference.value, event) &&
        ((other.visible.value && other.isTopLayer(event)) || hasTopDescendant(event))
      ) {
        return true
      }
    }
    return false
  }
  const shadowInsideEvents = new WeakSet<Event>()
  const shadowPeerEvents = new WeakSet<Event>()
  let shadowRoots = new Set<ShadowRoot>()
  let outsideGeneration = 0
  const markShadowInside = (event: Event) => {
    if (contains(event)) {
      shadowInsideEvents.add(event)
    }
    if (isTopPeerReference(event)) {
      shadowPeerEvents.add(event)
    }
  }
  const updateShadowRoots = (next: Set<ShadowRoot>) => {
    for (const root of shadowRoots) {
      if (!next.has(root)) {
        root.removeEventListener('click', markShadowInside, true)
      }
    }
    for (const root of next) {
      if (!shadowRoots.has(root)) {
        root.addEventListener('click', markShadowInside, true)
      }
    }
    shadowRoots = next
  }
  const refreshShadowRoots = () => {
    const next = collectClosedRoots(api.reference.value)
    collectClosedRoots(api.popup.value, next)
    if (registry) {
      for (const other of registry.closed) {
        if (other.parent === parent) {
          collectClosedRoots(other.reference.value, next)
        }
      }
    }
    updateShadowRoots(next)
  }
  watch(
    api.visible,
    () => {
      outsideGeneration++
    },
    { flush: 'sync' },
  )
  const canDismissOutside = () => !!registry && api.visible.value && options.clickOutsideToClose !== false
  const onOutside = (event: Event) => {
    const otherPointer = (pointer.value?.down.isTrusted && !event.isTrusted) || differentPointer(event as PointerEvent)
    const pending = otherPointer ? undefined : pointer.value
    const forwarded = labelActivation.value
    if (!otherPointer) {
      pointer.set()
    }
    if (!canDismissOutside() || contains(event)) {
      return
    }
    const path = event.composedPath()
    const forwardedMatch =
      !!forwarded &&
      (event as MouseEvent).detail > 0 &&
      (!forwarded.trusted || event.isTrusted) &&
      path.includes(forwarded.control)
    const clickTarget = event.target as Node | null
    const dragMatch =
      !!pending?.related &&
      !!pending.target &&
      !!pending.releasedPath &&
      !!clickTarget &&
      typeof clickTarget.contains === 'function' &&
      clickTarget.contains(pending.target) &&
      pending.releasedPath.includes(clickTarget)
    const pointerMatch =
      !!pending?.related && event.timeStamp >= pending.down.timeStamp && (path.includes(pending.related) || dragMatch)
    const coalesced = (event as MouseEvent).detail > 0 && (pointerMatch || forwardedMatch)
    if (forwardedMatch) {
      labelActivation.set()
    }
    const label = pending?.path.find(
      (node) => (node as Element).nodeType === 1 && (node as Element).localName === 'label' && path.includes(node),
    ) as HTMLLabelElement | undefined
    if (label?.control && !path.includes(label.control)) {
      labelActivation.set({ control: label.control, trusted: event.isTrusted })
      labelActivation.expire()
    }
    const eligible = api.isTopLayer(event) || isTopPeerReference(event)
    // The document path hides a closed root's internals; wait for its capture listener.
    if ([...shadowRoots].some((root) => path.includes(root.host))) {
      const generation = outsideGeneration
      setTimeout(() => {
        if (
          canDismissOutside() &&
          generation === outsideGeneration &&
          !shadowInsideEvents.has(event) &&
          (eligible || shadowPeerEvents.has(event))
        ) {
          deliverOutside(event, coalesced)
        }
      }, 0)
      return
    }
    if (eligible) {
      deliverOutside(event, coalesced)
    }
  }
  const deliverOutside = (event: Event, coalesced: boolean) => {
    let dismissed = dismissedInteractions.get(event)
    if (!dismissed) {
      dismissed = new Set()
      dismissedInteractions.set(event, dismissed)
    }
    dismissed.add(context)
    api.onOutside(event)
    if (!coalesced) {
      close()
    }
  }
  const focusReference = () => {
    if (!api.reference.value?.isConnected) {
      return
    }
    restoringFocus = true
    try {
      api.reference.value.focus({ preventScroll: true })
    } finally {
      restoringFocus = false
    }
  }
  const onKeydown = (event: KeyboardEvent) => {
    const target = event.target as HTMLElement | null
    if (
      canDismissOutside() &&
      !event.defaultPrevented &&
      !event.isComposing &&
      ['Enter', ' ', 'ArrowDown', 'ArrowUp'].includes(event.key) &&
      typeof target?.closest === 'function' &&
      !!target.closest('[aria-haspopup="menu"]') &&
      !target?.closest('input, textarea, [contenteditable="true"], [role="textbox"]') &&
      isTopPeerReference(event)
    ) {
      close()
      return false
    }
    if (
      event.key !== 'Escape' ||
      event.defaultPrevented ||
      event.isComposing ||
      event.keyCode === 229 ||
      !api.visible.value ||
      options.escToClose === false ||
      !api.isTopLayer(event)
    ) {
      return false
    }
    event.preventDefault()
    close()
    nextTick(() => {
      if (api.visible.value || options.restoreFocus === false || !api.reference.value?.isConnected) {
        return
      }
      focusReference()
    })
    return true
  }
  const refreshSiblings = (peers: Set<ReferenceInteraction>) => {
    for (const other of peers) {
      if (other !== peer && other.parent === parent) {
        other.refreshRoots()
      }
    }
  }
  const registerReference = (owner: Document) => {
    registry = referenceInteractions.get(owner)
    if (!registry) {
      registry = { peers: new Set(), closed: new Set() }
      referenceInteractions.set(owner, registry)
    }
    registry.peers.add(peer)
    if (collectClosedRoots(peer.reference.value).size) {
      registry.closed.add(peer)
      refreshSiblings(registry.peers)
    }
    refreshShadowRoots()
  }
  const unregisterReference = () => {
    if (!registry) {
      return
    }
    registry.peers.delete(peer)
    if (registry.closed.delete(peer)) {
      refreshSiblings(registry.peers)
    }
    registry = undefined
  }
  const documentCleanups: (() => void)[] = []
  const onPopupKeydown = (event: KeyboardEvent) => {
    if (includes(api.popup.value ?? undefined, event)) {
      onKeydown(event)
    }
  }
  const bindDocument = (doc: Document, keydown: (event: KeyboardEvent) => void) => {
    const view = doc.defaultView
    const update = (method: 'addEventListener' | 'removeEventListener') => {
      doc[method]('pointerdown', onPointerDown as EventListener, true)
      doc[method]('pointerup', onPointerUp as EventListener, true)
      doc[method]('pointercancel', onPointerCancel as EventListener, true)
      doc[method]('click', onOutside, true)
      // The indexed DOM methods expose only their common EventListener overload.
      view?.[method]('keydown', keydown as EventListener)
    }
    update('addEventListener')
    documentCleanups.push(() => update('removeEventListener'))
  }
  const unbind = () => {
    outsideGeneration++
    updateShadowRoots(new Set())
    unregisterReference()
    pointer.set()
    labelActivation.set()
    for (const cleanup of documentCleanups) {
      cleanup()
    }
    documentCleanups.length = 0
  }
  const bind = () => {
    unbind()
    const owner = api.reference.value?.ownerDocument ?? api.popup.value?.ownerDocument ?? document
    registerReference(owner)
    bindDocument(owner, onKeydown)
    const popupDocument = api.popup.value?.ownerDocument
    if (popupDocument && popupDocument !== owner) {
      bindDocument(popupDocument, onPopupKeydown)
    }
  }
  const rebind = () => {
    if (registry) {
      bind()
    }
  }
  const activate = () => {
    if (!registry) {
      bind()
    }
  }
  watch([api.reference, api.popup], rebind, { flush: 'sync' })
  watch(api.popupTarget, rebind, { flush: 'post' })
  onMounted(activate)
  onActivated(activate)
  onDeactivated(unbind)
  onBeforeUnmount(() => {
    unbind()
    parent?.children.delete(context)
  })
  return {
    focusReference,
    popupEnter,
    popupLeave,
    popupFocus: onFocus,
    popupBlur: onBlur,
    contains,
    open: () => api.request(true),
    close: () => close(),
  }
}
