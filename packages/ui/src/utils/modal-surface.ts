import { computed, nextTick, onActivated, onDeactivated, ref, watch, type Ref } from 'vue'
import { useZIndex } from '../context/zIndex'
import { useActiveTarget } from './active-target'
import { useLayerContainer } from './layer-container'
import { useModalFocus } from './modal-focus'
import type { PopupContainer } from './popup-container'
import { usePopupLayer } from './popup-layer'
import { usePopupTransition } from './popup-transition'
import { useScrollLock } from './scroll-lock'
import { useVisualSurface } from './visual-surface'

export type ModalSurfaceCloseReason = 'overlay' | 'escape' | 'route'

export interface ModalSurfaceCloseRequest {
  reason: ModalSurfaceCloseReason
  event?: Event
}

export interface ModalSurfaceOptions {
  open: () => boolean | undefined
  defaultOpen: () => boolean
  unmountOnClose: () => boolean
  lockScroll: () => boolean
  overlayClosable: () => boolean
  escToClose: () => boolean
  closeOnRouteChange: () => boolean
  popupContainer: () => PopupContainer | undefined
  zIndex: () => number | undefined
  root: Ref<HTMLElement | undefined>
  emit: (...args: any[]) => void
  onRequestClose?: (request: ModalSurfaceCloseRequest) => void
}

/** Shared modal behavior. Component layout and presentation remain local. */
export function useModalSurface(options: ModalSurfaceOptions) {
  const localOpen = ref(options.defaultOpen())
  const teleportDisabled = ref(false)
  let overlayPointerDown = false

  const mergedOpen = computed({
    get: () => options.open() ?? localOpen.value,
    set: (value: boolean) => {
      if (options.open() === undefined) {
        localOpen.value = value
      }
      options.emit('update:open', value)
    },
  })
  const transition = usePopupTransition(
    () => mergedOpen.value,
    options.unmountOnClose,
    (event) => options.emit(event),
  )
  const { popupContainerTarget, scrollLockTarget, modalDocument } = useLayerContainer(options.popupContainer)
  const layerActive = () => mergedOpen.value && !teleportDisabled.value
  const { zIndex } = useZIndex(layerActive, 3)
  const mergedZIndex = computed(() => options.zIndex() ?? zIndex.value)
  useVisualSurface(
    () => ((mergedOpen.value || transition.leaving.value) && modalDocument() ? options.root.value : undefined),
    () => mergedZIndex.value,
  )
  const { onStackTop, onModalStackTop } = usePopupLayer(layerActive, mergedZIndex, modalDocument, false, true)
  const { focus, focusAfterEnter, restore } = useModalFocus(
    () => options.root.value?.querySelector<HTMLElement>('[data-modal-focus-root]') ?? options.root.value,
    () => mergedOpen.value,
    onStackTop,
    options.lockScroll,
    modalDocument,
    onModalStackTop,
  )

  // Same-document Teleport moves keep the root ref and ownerDocument, but the
  // browser can blur the moved control. Restore focus only when no control
  // retained it, including teleported children outside the modal DOM subtree.
  watch(
    [popupContainerTarget, () => options.popupContainer() === false],
    () => {
      nextTick(() => {
        const doc = modalDocument()
        const current = doc?.activeElement
        if (!current || current === doc?.body || current === doc?.documentElement) {
          focus()
        }
      })
    },
    { flush: 'post' },
  )

  useScrollLock(scrollLockTarget, () => (mergedOpen.value || transition.leaving.value) && options.lockScroll(), {
    reserveScrollBar: true,
  })

  function requestClose(request: ModalSurfaceCloseRequest) {
    if (options.onRequestClose) {
      options.onRequestClose(request)
    } else {
      mergedOpen.value = false
    }
  }

  function handleOverlayPointerDown(event: PointerEvent) {
    overlayPointerDown = event.target === event.currentTarget
  }

  function handleOverlayClick(event: MouseEvent) {
    const isOverlayClick = overlayPointerDown && event.target === event.currentTarget
    overlayPointerDown = false
    if (!isOverlayClick || !mergedOpen.value || !onStackTop(event)) {
      return
    }
    options.emit('click-overlay', event)
    if (options.overlayClosable()) {
      requestClose({ reason: 'overlay', event })
    }
  }

  function handleKeydown(event: KeyboardEvent) {
    if (
      !mergedOpen.value ||
      event.defaultPrevented ||
      event.isComposing ||
      event.keyCode === 229 ||
      event.key !== 'Escape' ||
      !onStackTop(event)
    ) {
      return
    }
    options.emit('key-escape', event)
    if (options.escToClose()) {
      event.preventDefault()
      requestClose({ reason: 'escape', event })
    }
  }

  function handleRouteChange(event: Event) {
    if (mergedOpen.value && options.closeOnRouteChange() && onStackTop(event)) {
      requestClose({ reason: 'route', event })
    }
  }

  useActiveTarget(modalDocument, (doc) => {
    const view = doc.defaultView
    doc.addEventListener('keydown', handleKeydown)
    view?.addEventListener('hashchange', handleRouteChange)
    view?.addEventListener('popstate', handleRouteChange)
    return () => {
      doc.removeEventListener('keydown', handleKeydown)
      view?.removeEventListener('hashchange', handleRouteChange)
      view?.removeEventListener('popstate', handleRouteChange)
    }
  })
  onActivated(() => {
    teleportDisabled.value = false
  })
  onDeactivated(() => {
    teleportDisabled.value = true
    overlayPointerDown = false
  })

  function opened() {
    if (mergedOpen.value) {
      focusAfterEnter()
      transition.opened()
    }
  }

  function closed() {
    if (!mergedOpen.value) {
      restore()
      transition.closed()
    }
  }

  return {
    mergedOpen,
    mergedZIndex,
    popupContainerTarget,
    teleportDisabled,
    transition,
    handleOverlayPointerDown,
    handleOverlayClick,
    opened,
    closed,
  }
}
