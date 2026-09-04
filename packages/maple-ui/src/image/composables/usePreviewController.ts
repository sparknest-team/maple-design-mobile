import { computed, onBeforeUnmount, onMounted, ref, watch, type Ref } from 'vue'
import type { ImageInteraction } from '../api'
import { useImageInteraction } from './useInteraction'

export interface PreviewControllerOptions {
  open: Ref<boolean | undefined>
  defaultOpen: boolean
  src: Ref<string | undefined>
  interaction: Ref<ImageInteraction | undefined>
  defaultScale: Ref<number>
  minScale: Ref<number>
  maxScale: Ref<number>
  scaleStep: Ref<number>
  wheelZoom: Ref<boolean | undefined>
  keyboard: Ref<boolean | undefined>
  draggable: Ref<boolean>
  keepDragOffset: Ref<boolean>
  overlayClosable: Ref<boolean>
  onOpenChange: (open: boolean) => void
  onLongPress?: () => void
  onPrev?: () => void
  onNext?: () => void
}

export function usePreviewController(options: PreviewControllerOptions) {
  const localOpen = ref(options.defaultOpen)
  const scale = ref(options.defaultScale.value)
  const rotate = ref(0)
  const translateX = ref(0)
  const translateY = ref(0)
  const moving = ref(false)
  const { isDesktop, isTouch } = useImageInteraction(options.interaction)

  const mergedOpen = computed({
    get: () => options.open.value ?? localOpen.value,
    set(value: boolean) {
      if (value === mergedOpen.value) {
        return
      }
      if (options.open.value === undefined) {
        localOpen.value = value
      }
      options.onOpenChange(value)
    },
  })
  const mergedWheelZoom = computed(() => options.wheelZoom.value ?? isDesktop.value)
  const mergedKeyboard = computed(() => options.keyboard.value ?? isDesktop.value)

  const clampScale = (value: number) => Math.min(options.maxScale.value, Math.max(options.minScale.value, value))
  function zoomTo(value: number) {
    scale.value = clampScale(value)
    if (scale.value <= 1 && !options.keepDragOffset.value) {
      resetOffset()
    }
  }
  function zoomIn() {
    zoomTo(scale.value + options.scaleStep.value)
  }
  function zoomOut() {
    zoomTo(scale.value - options.scaleStep.value)
  }
  function rotateLeft() {
    rotate.value -= 90
  }
  function rotateRight() {
    rotate.value += 90
  }
  function resetOffset() {
    translateX.value = 0
    translateY.value = 0
  }
  function reset() {
    scale.value = options.defaultScale.value
    rotate.value = 0
    resetOffset()
  }
  function open() {
    mergedOpen.value = true
  }
  function close() {
    mergedOpen.value = false
  }

  let pointerId: number | undefined
  let startX = 0
  let startY = 0
  let originX = 0
  let originY = 0
  let moved = false
  let pointerStartedOnImage = false
  let lastTap: { at: number; src: string | undefined; x: number; y: number } | undefined
  let tapCloseTimer: ReturnType<typeof setTimeout> | undefined
  let longPressTimer: ReturnType<typeof setTimeout> | undefined

  function cancelPendingTap() {
    if (tapCloseTimer) {
      clearTimeout(tapCloseTimer)
    }
    tapCloseTimer = undefined
    lastTap = undefined
  }

  function isInteractiveTarget(target: EventTarget | null) {
    const element = target as HTMLElement | null
    return Boolean(
      element?.closest?.(
        "button, a, input, select, textarea, [role='button'], [data-image-preview-interactive], [data-image-preview-toolbar]",
      ),
    )
  }

  function onPointerDown(event: PointerEvent) {
    pointerStartedOnImage = false
    if (isInteractiveTarget(event.target)) {
      cancelPendingTap()
      return
    }
    if (!options.draggable.value || event.button !== 0) {
      return
    }
    pointerId = event.pointerId
    startX = event.clientX
    startY = event.clientY
    originX = translateX.value
    originY = translateY.value
    moved = false
    pointerStartedOnImage = Boolean((event.target as HTMLElement | null)?.closest?.('[data-image-preview-image]'))
    moving.value = true
    ;(event.currentTarget as HTMLElement).setPointerCapture?.(event.pointerId)
    if (event.pointerType === 'touch') {
      longPressTimer = setTimeout(() => options.onLongPress?.(), 500)
    }
  }

  function onPointerMove(event: PointerEvent) {
    if (pointerId !== event.pointerId) {
      return
    }
    const dx = event.clientX - startX
    const dy = event.clientY - startY
    moved ||= Math.abs(dx) + Math.abs(dy) > 8
    if (moved && longPressTimer) {
      clearTimeout(longPressTimer)
    }
    if (scale.value > 1) {
      translateX.value = originX + dx
      translateY.value = originY + dy
    } else {
      translateX.value = dx
    }
  }

  function releasePointer(event: PointerEvent) {
    const target = event.currentTarget as HTMLElement
    if (target.hasPointerCapture?.(event.pointerId)) {
      target.releasePointerCapture?.(event.pointerId)
    }
  }

  function onPointerUp(event: PointerEvent) {
    if (pointerId !== event.pointerId) {
      return
    }
    if (longPressTimer) {
      clearTimeout(longPressTimer)
    }
    releasePointer(event)
    const dx = event.clientX - startX
    moving.value = false
    pointerId = undefined
    if (scale.value <= 1 && Math.abs(dx) > 48) {
      cancelPendingTap()
      dx > 0 ? options.onPrev?.() : options.onNext?.()
      resetOffset()
      return
    }
    if (scale.value <= 1) {
      resetOffset()
    }
    if (!moved && pointerStartedOnImage && event.pointerType === 'touch') {
      const now = Date.now()
      const isDoubleTap =
        lastTap !== undefined &&
        now - lastTap.at < 320 &&
        lastTap.src === options.src.value &&
        Math.hypot(event.clientX - lastTap.x, event.clientY - lastTap.y) <= 24
      if (isDoubleTap) {
        if (tapCloseTimer) {
          clearTimeout(tapCloseTimer)
        }
        tapCloseTimer = undefined
        scale.value > 1 ? zoomTo(1) : zoomIn()
        lastTap = undefined
      } else {
        lastTap = { at: now, src: options.src.value, x: event.clientX, y: event.clientY }
        const tap = lastTap
        tapCloseTimer = setTimeout(() => {
          tapCloseTimer = undefined
          if (lastTap === tap) {
            lastTap = undefined
          }
        }, 320)
      }
    }
  }

  function onPointerCancel(event: PointerEvent) {
    if (pointerId !== event.pointerId) {
      return
    }
    if (longPressTimer) {
      clearTimeout(longPressTimer)
    }
    releasePointer(event)
    longPressTimer = undefined
    moving.value = false
    pointerId = undefined
    moved = false
    pointerStartedOnImage = false
    translateX.value = originX
    translateY.value = originY
    cancelPendingTap()
  }

  function onWheel(event: WheelEvent) {
    if (!mergedWheelZoom.value) {
      return
    }
    event.preventDefault()
    event.deltaY < 0 ? zoomIn() : zoomOut()
  }

  function onDoubleClick(event: MouseEvent) {
    const element = event.target as HTMLElement | null
    if (isInteractiveTarget(event.target) || !element?.closest?.('[data-image-preview-image]')) {
      cancelPendingTap()
      return
    }
    scale.value > 1 ? zoomTo(1) : zoomIn()
  }

  function onOverlayClick(event: MouseEvent) {
    const startedOnImage = pointerStartedOnImage
    pointerStartedOnImage = false
    if (!options.overlayClosable.value) {
      return
    }
    const element = event.target as HTMLElement | null
    if (startedOnImage || isInteractiveTarget(event.target) || element?.closest?.('[data-image-preview-image]')) {
      return
    }
    if (moved) {
      moved = false
      return
    }
    close()
  }

  function onKeydown(event: KeyboardEvent) {
    if (!mergedOpen.value || !mergedKeyboard.value) {
      return
    }
    if (event.key === 'ArrowLeft') {
      options.onPrev?.()
    } else if (event.key === 'ArrowRight') {
      options.onNext?.()
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      zoomIn()
    } else if (event.key === 'ArrowDown') {
      event.preventDefault()
      zoomOut()
    } else if (event.key === ' ') {
      event.preventDefault()
      reset()
    }
  }

  watch(options.src, () => {
    cancelPendingTap()
    reset()
  })
  watch(mergedOpen, (value) => {
    if (!value) {
      reset()
    }
  })
  onMounted(() => document.addEventListener('keydown', onKeydown))
  onBeforeUnmount(() => {
    document.removeEventListener('keydown', onKeydown)
    if (longPressTimer) {
      clearTimeout(longPressTimer)
    }
    cancelPendingTap()
  })

  return {
    mergedOpen,
    scale,
    rotate,
    translateX,
    translateY,
    moving,
    isDesktop,
    isTouch,
    mergedWheelZoom,
    mergedKeyboard,
    open,
    close,
    reset,
    zoomTo,
    zoomIn,
    zoomOut,
    rotateLeft,
    rotateRight,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel,
    onWheel,
    onDoubleClick,
    onOverlayClick,
  }
}
