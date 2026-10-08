import { inject, nextTick, onBeforeUnmount, onMounted, provide, watch, type InjectionKey, type Ref } from 'vue'
import type { TriggerEvent } from './contract'
import { bindTriggerEvents, type TriggerElement } from './reference'

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
}
const interactionKey: InjectionKey<InteractionContext> = Symbol('trigger-interaction')

function includes(element: Element | undefined, event: Event | Node): boolean {
  if (!element) {
    return false
  }
  if ('composedPath' in event) {
    return event.composedPath().includes(element) || Boolean(event.target && element.contains(event.target as Node))
  }
  return element.contains(event)
}

/** Shared behavior; positioning, theme names and rendering stay at the local boundary. */
export function useTriggerInteraction(
  options: InteractionOptions,
  api: {
    visible: Readonly<Ref<boolean>>
    reference: Readonly<Ref<TriggerElement | undefined>>
    popup: Readonly<Ref<HTMLElement | undefined | null>>
    request: (visible: boolean, delay?: number) => void
    isTopLayer: (event?: Event) => boolean
    onPoint?: (event: MouseEvent) => void
    onOutside: (event: Event) => void
    onReferenceEvent?: (name: string, event: Event) => void
  },
) {
  const parent = inject(interactionKey, undefined)
  const children = new Set<InteractionContext>()
  let allowClose = true
  let insidePopup = false
  let insideReference = false
  let focusInside = false
  let restoringFocus = false
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
  const context: InteractionContext = { visible: api.visible, contains, enter, leave, children }
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
    if (options.disabled) {
      return
    }
    if (has('click')) {
      api.onPoint?.(event as MouseEvent)
      if (api.visible.value) {
        if (options.closeOnClickReference !== false) {
          close()
        }
      } else {
        api.request(true)
      }
    } else if (has('contextMenu') && api.visible.value) {
      close()
    }
  }
  const onEnter = (event: Event) => {
    api.onReferenceEvent?.('onMouseenter', event)
    insideReference = true
    api.onPoint?.(event as MouseEvent)
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
    const related = (event as FocusEvent).relatedTarget as Node | null
    if (related && contains(related)) {
      return
    }
    focusInside = false
    if (has('focus') && options.blurToClose !== false && !(has('hover') && (insideReference || insidePopup))) {
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
  const onOutside = (event: Event) => {
    if (!api.visible.value || options.clickOutsideToClose === false || contains(event) || !api.isTopLayer(event)) {
      return
    }
    api.onOutside(event)
    close()
  }
  const focusReference = () => {
    if (!api.reference.value?.isConnected) {
      return
    }
    restoringFocus = true
    try {
      api.reference.value.focus()
    } finally {
      restoringFocus = false
    }
  }
  const onKeydown = (event: KeyboardEvent) => {
    if (event.key !== 'Escape' || !api.visible.value || options.escToClose === false || !api.isTopLayer(event)) {
      return
    }
    event.preventDefault()
    close()
    nextTick(() => {
      if (api.visible.value || options.restoreFocus === false || !api.reference.value?.isConnected) {
        return
      }
      focusReference()
    })
  }
  let owner: Document | undefined
  let view: Window | null | undefined
  onMounted(() => {
    owner = api.reference.value?.ownerDocument ?? document
    view = owner.defaultView
    // Evaluate the current top layer before another reference opens a new one.
    owner.addEventListener('click', onOutside, true)
    view?.addEventListener('keydown', onKeydown)
  })
  onBeforeUnmount(() => {
    parent?.children.delete(context)
    owner?.removeEventListener('click', onOutside, true)
    view?.removeEventListener('keydown', onKeydown)
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
