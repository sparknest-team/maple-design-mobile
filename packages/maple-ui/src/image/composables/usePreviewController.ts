import { computed, onActivated, onBeforeUnmount, onDeactivated, onMounted, ref, watch, type Ref } from 'vue'
import type { ImageInteraction } from '../api'
import { useImageInteraction } from './useInteraction'

export interface PreviewControllerOptions {
  open: Ref<boolean | undefined>
  isRtl?: Ref<boolean>
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
  let active = true
  let disposed = false
  const available = () => active && !disposed
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
    if (!available()) {
      return
    }
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
    if (!available()) {
      return
    }
    rotate.value -= 90
  }
  function rotateRight() {
    if (!available()) {
      return
    }
    rotate.value += 90
  }
  function resetOffset() {
    translateX.value = 0
    translateY.value = 0
  }
  function resetState() {
    scale.value = options.defaultScale.value
    rotate.value = 0
    resetOffset()
  }
  function reset() {
    if (available()) {
      resetState()
    }
  }
  function open() {
    if (!available()) {
      return
    }
    mergedOpen.value = true
  }
  function close() {
    if (!available()) {
      return
    }
    cancelGesture()
    mergedOpen.value = false
  }

  let pointerId: number | undefined
  let pointerElement: HTMLElement | undefined
  let longPressGeneration = 0
  let tapGeneration = 0
  let startX = 0
  let startY = 0
  let originX = 0
  let originY = 0
  let moved = false
  let pointerStartedOnImage = false
  let lastTap: { at: number; src: string | undefined; x: number; y: number } | undefined
  let tapTimer: ReturnType<typeof setTimeout> | undefined
  let longPressTimer: ReturnType<typeof setTimeout> | undefined

  function cancelPendingTap() {
    tapGeneration++
    if (tapTimer !== undefined) {
      clearTimeout(tapTimer)
    }
    tapTimer = undefined
    lastTap = undefined
  }

  function cancelLongPress() {
    longPressGeneration++
    if (longPressTimer !== undefined) {
      clearTimeout(longPressTimer)
    }
    longPressTimer = undefined
  }
  function cancelGesture() {
    cancelLongPress()
    cancelPendingTap()
    const id = pointerId
    const element = pointerElement
    pointerId = undefined
    pointerElement = undefined
    moving.value = false
    moved = false
    pointerStartedOnImage = false
    if (id !== undefined && element?.hasPointerCapture?.(id)) {
      element.releasePointerCapture?.(id)
    }
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
    if (!available() || !mergedOpen.value) {
      return
    }
    pointerStartedOnImage = false
    if (isInteractiveTarget(event.target)) {
      cancelGesture()
      return
    }
    if (!options.draggable.value || event.button !== 0) {
      return
    }
    if (pointerId !== undefined) {
      cancelGesture()
    }
    cancelLongPress()
    pointerId = event.pointerId
    pointerElement = event.currentTarget as HTMLElement
    startX = event.clientX
    startY = event.clientY
    originX = translateX.value
    originY = translateY.value
    moved = false
    pointerStartedOnImage = Boolean((event.target as HTMLElement | null)?.closest?.('[data-image-preview-image]'))
    moving.value = true
    ;(event.currentTarget as HTMLElement).setPointerCapture?.(event.pointerId)
    if (event.pointerType === 'touch') {
      const generation = ++longPressGeneration
      const id = pointerId
      const src = options.src.value
      longPressTimer = setTimeout(() => {
        if (
          !available() ||
          !mergedOpen.value ||
          generation !== longPressGeneration ||
          pointerId !== id ||
          moved ||
          src !== options.src.value ||
          !options.draggable.value
        ) {
          return
        }
        longPressGeneration++
        longPressTimer = undefined
        options.onLongPress?.()
      }, 500)
    }
  }

  function onPointerMove(event: PointerEvent) {
    if (!available() || !mergedOpen.value) {
      return
    }
    if (pointerId !== event.pointerId) {
      return
    }
    const dx = event.clientX - startX
    const dy = event.clientY - startY
    moved ||= Math.abs(dx) + Math.abs(dy) > 8
    if (moved) {
      cancelLongPress()
    }
    if (scale.value > 1) {
      translateX.value = originX + dx
      translateY.value = originY + dy
    } else {
      translateX.value = dx
    }
  }

  function releasePointer(event: PointerEvent) {
    const target = pointerElement ?? (event.currentTarget as HTMLElement)
    pointerElement = undefined
    if (target.hasPointerCapture?.(event.pointerId)) {
      target.releasePointerCapture?.(event.pointerId)
    }
  }

  function onPointerUp(event: PointerEvent) {
    if (!available() || !mergedOpen.value) {
      return
    }
    if (pointerId !== event.pointerId) {
      return
    }
    cancelLongPress()
    pointerId = undefined
    releasePointer(event)
    if (!available() || !mergedOpen.value) {
      return
    }
    const dx = event.clientX - startX
    moving.value = false
    pointerId = undefined
    if (scale.value <= 1 && Math.abs(dx) > 48) {
      cancelPendingTap()
      if (dx > 0 !== !!options.isRtl?.value) {
        options.onPrev?.()
      } else {
        options.onNext?.()
      }
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
        cancelPendingTap()
        scale.value > 1 ? zoomTo(1) : zoomIn()
        lastTap = undefined
      } else {
        cancelPendingTap()
        lastTap = { at: now, src: options.src.value, x: event.clientX, y: event.clientY }
        const tap = lastTap
        const generation = ++tapGeneration
        tapTimer = setTimeout(() => {
          if (!available() || !mergedOpen.value || generation !== tapGeneration || lastTap !== tap) {
            return
          }
          tapGeneration++
          tapTimer = undefined
          lastTap = undefined
        }, 320)
      }
    }
  }

  function onPointerCancel(event: PointerEvent) {
    if (!available() || !mergedOpen.value) {
      return
    }
    if (pointerId !== event.pointerId) {
      return
    }
    cancelLongPress()
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
    if (!available() || !mergedOpen.value) {
      return
    }
    if (!mergedWheelZoom.value) {
      return
    }
    event.preventDefault()
    event.deltaY < 0 ? zoomIn() : zoomOut()
  }

  function onDoubleClick(event: MouseEvent) {
    if (!available() || !mergedOpen.value) {
      return
    }
    const element = event.target as HTMLElement | null
    if (isInteractiveTarget(event.target) || !element?.closest?.('[data-image-preview-image]')) {
      cancelPendingTap()
      return
    }
    scale.value > 1 ? zoomTo(1) : zoomIn()
  }

  function onOverlayClick(event: MouseEvent) {
    if (!available() || !mergedOpen.value) {
      return
    }
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
    if (!available() || !mergedOpen.value || !mergedKeyboard.value) {
      return
    }
    if (event.key === (options.isRtl?.value ? 'ArrowRight' : 'ArrowLeft')) {
      options.onPrev?.()
    } else if (event.key === (options.isRtl?.value ? 'ArrowLeft' : 'ArrowRight')) {
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

  if (options.isRtl) {
    watch(
      options.isRtl,
      () => {
        cancelGesture()
        if (scale.value <= 1) {
          resetOffset()
        }
      },
      { flush: 'sync' },
    )
  }
  watch(
    options.src,
    () => {
      cancelGesture()
      resetState()
    },
    { flush: 'sync' },
  )
  watch(
    mergedOpen,
    (value) => {
      if (!value) {
        cancelGesture()
        resetState()
      }
    },
    { flush: 'sync' },
  )
  watch(options.draggable, (value) => {
    if (!value) {
      cancelGesture()
    }
  })
  let keyboardBound = false
  function bindKeyboard() {
    if (available() && !keyboardBound) {
      document.addEventListener('keydown', onKeydown)
      keyboardBound = true
    }
  }
  function suspend() {
    active = false
    if (keyboardBound) {
      document.removeEventListener('keydown', onKeydown)
    }
    keyboardBound = false
    cancelGesture()
  }
  onMounted(bindKeyboard)
  onActivated(() => {
    if (!disposed) {
      active = true
      bindKeyboard()
    }
  })
  onDeactivated(suspend)
  onBeforeUnmount(() => {
    disposed = true
    suspend()
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
