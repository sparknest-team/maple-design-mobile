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
const referenceInteractions = new WeakMap<Document, Set<ReferenceInteraction>>()
const closedPeerReferences = new WeakMap<Document, Set<ReferenceInteraction>>()
// Eagerly mounted children can process the same capture event before their
// parent. Retain their dismissal ownership until this event is collected.
const dismissedInteractions = new WeakMap<Event, Set<InteractionContext>>()

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
    onReferenceEvent?: (name: string, event: Event) => void
    isMovingBlur?: (event: Event) => boolean
  },
) {
  const parent = inject(interactionKey, undefined)
  const children = new Set<InteractionContext>()
  let allowClose = true
  let insidePopup = false
  let insideReference = false
  let focusInside = false
  let restoringFocus = false
  let pointerDismiss:
    | {
        path: EventTarget[]
        target: Node | null
        related?: Node
        timeStamp: number
        trusted: boolean
        pointerId?: number
        releasedPath?: EventTarget[]
      }
    | undefined
  let pointerReleaseTimer: ReturnType<typeof setTimeout> | undefined
  const clearPointerRelease = () => {
    if (pointerReleaseTimer !== undefined) {
      clearTimeout(pointerReleaseTimer)
    }
    pointerReleaseTimer = undefined
  }
  const onPointerUp = (event: Event) => {
    const pending = pointerDismiss
    const releasedId = (event as PointerEvent).pointerId
    if (pending?.pointerId !== undefined && typeof releasedId === 'number' && pending.pointerId !== releasedId) {
      return
    }
    clearPointerRelease()
    if (!pending) {
      return
    }
    pending.releasedPath = event.composedPath()
    pointerReleaseTimer = setTimeout(() => {
      if (pointerDismiss === pending) {
        pointerDismiss = undefined
      }
      pointerReleaseTimer = undefined
    }, 0)
  }
  let forwardedLabel: { control: Node; trusted: boolean } | undefined
  let forwardedLabelTimer: ReturnType<typeof setTimeout> | undefined
  const clearForwardedLabel = () => {
    forwardedLabel = undefined
    if (forwardedLabelTimer !== undefined) {
      clearTimeout(forwardedLabelTimer)
    }
    forwardedLabelTimer = undefined
  }
  const onPointerDown = (event: Event) => {
    if ((event as PointerEvent).isPrimary === false) {
      return
    }
    clearPointerRelease()
    clearForwardedLabel()
    const pointer = event as PointerEvent
    pointerDismiss =
      api.visible.value && has('focus') && pointer.button === 0
        ? {
            path: event.composedPath(),
            target: event.target && typeof (event.target as Node).nodeType === 'number' ? (event.target as Node) : null,
            timeStamp: event.timeStamp,
            trusted: event.isTrusted,
            pointerId: typeof pointer.pointerId === 'number' ? pointer.pointerId : undefined,
          }
        : undefined
  }
  const onPointerCancel = (event: Event) => {
    const canceledId = (event as PointerEvent).pointerId
    if (
      pointerDismiss?.pointerId !== undefined &&
      typeof canceledId === 'number' &&
      pointerDismiss.pointerId !== canceledId
    ) {
      return
    }
    pointerDismiss = undefined
    clearPointerRelease()
    clearForwardedLabel()
  }
  const coalescedClicks = new WeakSet<Event>()
  const has = (event: TriggerEvent) => ([] as TriggerEvent[]).concat(options.trigger).includes(event)
  const contains = (event: Event | Node): boolean =>
    includes(api.reference.value, event) ||
    includes(api.popup.value ?? undefined, event) ||
    [...children].some((child) => child.contains(event))
  const close = (delay = 0) => {
    if (allowClose) {
      api.request(false, delay)
    }
  }
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
    api.onReferenceEvent?.('onClick', event)
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
    api.onReferenceEvent?.('onMouseenter', event)
    insideReference = true
    // Capture an opening point, never overwrite an open context menu on re-entry.
    if (!options.disabled && has('hover') && !api.visible.value) {
      api.onPoint?.(event as MouseEvent)
    }
    enter()
  }
  const onLeave = (event: Event) => {
    api.onReferenceEvent?.('onMouseleave', event)
    insideReference = false
    leave()
  }
  const onFocus = (event: Event) => {
    api.onReferenceEvent?.('onFocusin', event)
    focusInside = true
    if (!restoringFocus && !options.disabled && has('focus')) {
      api.request(true, options.focusDelay ?? 0)
    }
  }
  const onBlur = (event: Event) => {
    api.onReferenceEvent?.('onFocusout', event)
    if (api.isMovingBlur?.(event)) {
      return
    }
    const related = (event as FocusEvent).relatedTarget as Node | null
    if (related && contains(related)) {
      return
    }
    focusInside = false
    if (has('focus') && options.blurToClose !== false && !(has('hover') && (insideReference || insidePopup))) {
      if (allowClose && pointerDismiss) {
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
    api.onReferenceEvent?.('onContextmenu', event)
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
  let active = false
  // A sibling reference can dismiss this whole branch while its child owns
  // the top layer. An unrelated top layer still protects the branch below it.
  const hasTopDescendant = (event: Event, branch = context): boolean =>
    [...branch.children].some(
      (child) =>
        dismissedInteractions.get(event)?.has(child) || child.isTopLayer?.(event) || hasTopDescendant(event, child),
    )
  const isTopPeerReference = (event: Event) =>
    [...(owner ? (referenceInteractions.get(owner) ?? []) : [])].some(
      (other) =>
        other !== peer &&
        other.parent === parent &&
        includes(other.reference.value, event) &&
        ((other.visible.value && other.isTopLayer(event)) || hasTopDescendant(event)),
    )
  const shadowInsideEvents = new WeakSet<Event>()
  const shadowPeerEvents = new WeakSet<Event>()
  let shadowRoots: ShadowRoot[] = []
  let outsideGeneration = 0
  const markShadowInside = (event: Event) => {
    if (contains(event)) {
      shadowInsideEvents.add(event)
    }
    if (isTopPeerReference(event)) {
      shadowPeerEvents.add(event)
    }
  }
  const refreshShadowRoots = () => {
    for (const root of shadowRoots) {
      root.removeEventListener('click', markShadowInside, true)
    }
    const roots = new Set<ShadowRoot>()
    const closedPeers = owner ? closedPeerReferences.get(owner) : undefined
    const peerReferences = [...(closedPeers ?? [])]
      .filter((other) => other.parent === parent)
      .map((other) => other.reference.value)
    for (const element of [api.reference.value, api.popup.value, ...peerReferences]) {
      let root = element?.getRootNode()
      while (root && root.nodeType === 11 && 'host' in root) {
        const shadow = root as ShadowRoot
        if (shadow.mode === 'closed') {
          roots.add(shadow)
        }
        root = shadow.host.getRootNode()
      }
    }
    shadowRoots = [...roots]
    for (const root of shadowRoots) {
      root.addEventListener('click', markShadowInside, true)
    }
  }
  watch(
    api.visible,
    () => {
      outsideGeneration++
    },
    { flush: 'sync' },
  )
  const onOutside = (event: Event) => {
    const clickId = (event as PointerEvent).pointerId
    const otherPointer =
      (pointerDismiss?.trusted && !event.isTrusted) ||
      (pointerDismiss?.pointerId !== undefined && typeof clickId === 'number' && pointerDismiss.pointerId !== clickId)
    const pending = otherPointer ? undefined : pointerDismiss
    const forwarded = forwardedLabel
    if (!otherPointer) {
      pointerDismiss = undefined
    }
    if (!active || !api.visible.value || options.clickOutsideToClose === false || contains(event)) {
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
      !!pending?.related &&
      (!pending.trusted || event.isTrusted) &&
      event.timeStamp >= pending.timeStamp &&
      (path.includes(pending.related) || dragMatch)
    if ((event as MouseEvent).detail > 0 && (pointerMatch || forwardedMatch)) {
      coalescedClicks.add(event)
    }
    if (forwardedMatch) {
      clearForwardedLabel()
    }
    const label = pending?.path.find(
      (node) => (node as Element).nodeType === 1 && (node as Element).localName === 'label' && path.includes(node),
    ) as HTMLLabelElement | undefined
    if (label?.control && !path.includes(label.control)) {
      clearForwardedLabel()
      const forwarding = { control: label.control, trusted: event.isTrusted }
      forwardedLabel = forwarding
      forwardedLabelTimer = setTimeout(() => {
        if (forwardedLabel === forwarding) {
          forwardedLabel = undefined
        }
        forwardedLabelTimer = undefined
      }, 0)
    }
    const eligible = api.isTopLayer(event) || isTopPeerReference(event)
    // The document path hides a closed root's internals; wait for its capture listener.
    if (shadowRoots.some((root) => event.composedPath().includes(root.host))) {
      const generation = outsideGeneration
      setTimeout(() => {
        if (
          active &&
          api.visible.value &&
          generation === outsideGeneration &&
          !shadowInsideEvents.has(event) &&
          (eligible || shadowPeerEvents.has(event))
        ) {
          deliverOutside(event)
        }
      }, 0)
      return
    }
    if (eligible) {
      deliverOutside(event)
    }
  }
  const deliverOutside = (event: Event) => {
    let dismissed = dismissedInteractions.get(event)
    if (!dismissed) {
      dismissed = new Set()
      dismissedInteractions.set(event, dismissed)
    }
    dismissed.add(context)
    api.onOutside(event)
    if (!coalescedClicks.has(event)) {
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
      active &&
      api.visible.value &&
      options.clickOutsideToClose !== false &&
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
  let owner: Document | undefined
  let view: Window | null | undefined
  let peerReferenceHadClosedRoot = false
  const hasClosedRoot = (element: Element | undefined) => {
    let root = element?.getRootNode()
    while (root && root.nodeType === 11 && 'host' in root) {
      const shadow = root as ShadowRoot
      if (shadow.mode === 'closed') {
        return true
      }
      root = shadow.host.getRootNode()
    }
    return false
  }
  const registerReference = () => {
    if (!owner) {
      return
    }
    active = true
    let peers = referenceInteractions.get(owner)
    if (!peers) {
      peers = new Set()
      referenceInteractions.set(owner, peers)
    }
    peers.add(peer)
    peerReferenceHadClosedRoot = hasClosedRoot(peer.reference.value)
    if (peerReferenceHadClosedRoot) {
      let closedPeers = closedPeerReferences.get(owner)
      if (!closedPeers) {
        closedPeers = new Set()
        closedPeerReferences.set(owner, closedPeers)
      }
      closedPeers.add(peer)
    }
    peer.refreshRoots()
    if (peerReferenceHadClosedRoot) {
      for (const other of peers) {
        if (other !== peer && other.parent === parent) {
          other.refreshRoots()
        }
      }
    }
  }
  const unregisterReference = () => {
    active = false
    if (owner) {
      const peers = referenceInteractions.get(owner)
      peers?.delete(peer)
      if (peerReferenceHadClosedRoot) {
        closedPeerReferences.get(owner)?.delete(peer)
        for (const other of peers ?? []) {
          if (other.parent === parent) {
            other.refreshRoots()
          }
        }
      }
      peerReferenceHadClosedRoot = false
    }
  }
  let popupOwner: Document | undefined
  let mounted = false
  let suspended = false
  const onPopupKeydown = (event: KeyboardEvent) => {
    if (includes(api.popup.value ?? undefined, event)) {
      onKeydown(event)
    }
  }
  const unbind = () => {
    outsideGeneration++
    for (const root of shadowRoots) {
      root.removeEventListener('click', markShadowInside, true)
    }
    shadowRoots = []
    unregisterReference()
    pointerDismiss = undefined
    clearPointerRelease()
    clearForwardedLabel()
    owner?.removeEventListener('pointerdown', onPointerDown, true)
    owner?.removeEventListener('pointerup', onPointerUp, true)
    owner?.removeEventListener('pointercancel', onPointerCancel, true)
    popupOwner?.removeEventListener('pointerdown', onPointerDown, true)
    popupOwner?.removeEventListener('pointerup', onPointerUp, true)
    popupOwner?.removeEventListener('pointercancel', onPointerCancel, true)
    owner?.removeEventListener('click', onOutside, true)
    view?.removeEventListener('keydown', onKeydown)
    popupOwner?.removeEventListener('click', onOutside, true)
    popupOwner?.defaultView?.removeEventListener('keydown', onPopupKeydown)
    owner = undefined
    view = undefined
    popupOwner = undefined
  }
  const bind = () => {
    unbind()
    if (!mounted || suspended) {
      return
    }
    owner = api.reference.value?.ownerDocument ?? api.popup.value?.ownerDocument ?? document
    registerReference()
    refreshShadowRoots()
    view = owner.defaultView
    owner.addEventListener('pointerdown', onPointerDown, true)
    owner.addEventListener('pointerup', onPointerUp, true)
    owner.addEventListener('pointercancel', onPointerCancel, true)
    owner.addEventListener('click', onOutside, true)
    view?.addEventListener('keydown', onKeydown)
    const popupDocument = api.popup.value?.ownerDocument
    if (popupDocument && popupDocument !== owner) {
      popupOwner = popupDocument
      popupOwner.addEventListener('pointerdown', onPointerDown, true)
      popupOwner.addEventListener('pointerup', onPointerUp, true)
      popupOwner.addEventListener('pointercancel', onPointerCancel, true)
      popupOwner.addEventListener('click', onOutside, true)
      popupOwner.defaultView?.addEventListener('keydown', onPopupKeydown)
    }
  }
  watch([api.reference, api.popup], bind, { flush: 'sync' })
  watch(api.popupTarget, bind, { flush: 'post' })
  onMounted(() => {
    mounted = true
    bind()
  })
  onActivated(() => {
    suspended = false
    bind()
  })
  onDeactivated(() => {
    suspended = true
    unbind()
  })
  onBeforeUnmount(() => {
    mounted = false
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
    allowClose: () => {
      allowClose = true
    },
    setAllowClose: (value: boolean) => {
      allowClose = value
    },
    open: () => api.request(true),
    close: () => close(),
  }
}
