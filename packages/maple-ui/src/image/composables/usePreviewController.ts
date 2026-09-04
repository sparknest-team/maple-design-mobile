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
  closeOnImageTap: Ref<boolean | undefined>
  onOpenChange: (open: boolean) => void
  onKeyEscape?: () => void
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
  const mergedCloseOnImageTap = computed(() => options.closeOnImageTap.value ?? isTouch.value)

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
  let lastTapAt = 0
  let tapCloseTimer: ReturnType<typeof setTimeout> | undefined
  let longPressTimer: ReturnType<typeof setTimeout> | undefined

  function cancelPendingTap() {
    if (tapCloseTimer) {
      clearTimeout(tapCloseTimer)
    }
    tapCloseTimer = undefined
    lastTapAt = 0
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

  function onPointerUp(event: PointerEvent) {
    if (pointerId !== event.pointerId) {
      return
    }
    if (longPressTimer) {
      clearTimeout(longPressTimer)
    }
    const dx = event.clientX - startX
    moving.value = false
    pointerId = undefined
    if (scale.value <= 1 && Math.abs(dx) > 48) {
      dx > 0 ? options.onPrev?.() : options.onNext?.()
      resetOffset()
      return
    }
    if (scale.value <= 1) {
      resetOffset()
    }
    if (!moved && event.pointerType === 'touch') {
      const now = Date.now()
      if (now - lastTapAt < 320) {
        if (tapCloseTimer) {
          clearTimeout(tapCloseTimer)
        }
        tapCloseTimer = undefined
        scale.value > 1 ? zoomTo(1) : zoomIn()
        lastTapAt = 0
      } else {
        lastTapAt = now
        if (options.closeOnImageTap.value ?? (isTouch.value || event.pointerType === 'touch')) {
          const tapAt = now
          tapCloseTimer = setTimeout(() => {
            tapCloseTimer = undefined
            if (lastTapAt === tapAt) {
              lastTapAt = 0
              close()
            }
          }, 320)
        }
      }
    } else if (!moved && mergedCloseOnImageTap.value) {
      close()
    }
  }

  function onWheel(event: WheelEvent) {
    if (!mergedWheelZoom.value) {
      return
    }
    event.preventDefault()
    event.deltaY < 0 ? zoomIn() : zoomOut()
  }

  function onDoubleClick() {
    scale.value > 1 ? zoomTo(1) : zoomIn()
  }
  function onKeydown(event: KeyboardEvent) {
    if (!mergedOpen.value || !mergedKeyboard.value) {
      return
    }
    if (event.key === 'Escape') {
      options.onKeyEscape?.()
      close()
    } else if (event.key === 'ArrowLeft') {
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
    mergedCloseOnImageTap,
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
    onWheel,
    onDoubleClick,
  }
}
