import type { Ref } from 'vue'
import { onBeforeUnmount, onDeactivated, reactive, toRefs } from 'vue'
import { getScrollTop } from '@maple-design/shared-vue'

export type TouchDirection = 'horizontal' | 'vertical'

function getDirection(x: number, y: number) {
  if (x > y) {
    return 'horizontal'
  }

  if (y > x) {
    return 'vertical'
  }
}

const initialTouch = {
  startX: 0,
  startY: 0,
  deltaX: 0,
  deltaY: 0,
  offsetX: 0,
  offsetY: 0,
  prevX: 0,
  prevY: 0,
  moveX: 0,
  moveY: 0,
  direction: undefined as TouchDirection | undefined,
  touching: false,
  dragging: false,
  startTime: 0,
  distance: 0,
}

export function useTouch(): {
  startX: Ref<number>
  startY: Ref<number>
  deltaX: Ref<number>
  deltaY: Ref<number>
  offsetX: Ref<number>
  offsetY: Ref<number>
  prevX: Ref<number>
  prevY: Ref<number>
  moveX: Ref<number>
  moveY: Ref<number>
  direction: Ref<TouchDirection | undefined>
  touching: Ref<boolean>
  dragging: Ref<boolean>
  startTime: Ref<number>
  distance: Ref<number>
  resetTouch: () => void
  startTouch: (event: TouchEvent) => void
  moveTouch: (event: TouchEvent) => void
  endTouch: () => void
  isReachTop: (element: Element | Window) => boolean
  isReachBottom: (element: Element, offset?: number) => boolean
} {
  const state = reactive({ ...initialTouch })
  let draggingAnimationFrame: number | null = null

  const cancelFrame = () => {
    if (draggingAnimationFrame !== null && typeof window !== 'undefined') {
      window.cancelAnimationFrame(draggingAnimationFrame)
    }
    draggingAnimationFrame = null
  }
  const resetTouch = () => {
    cancelFrame()
    Object.assign(state, initialTouch)
  }

  const startTouch = (event: TouchEvent) => {
    resetTouch()

    if (!event.touches.length) {
      return
    }
    const { clientX: x, clientY: y } = event.touches[0]

    state.startX = x
    state.startY = y
    state.prevX = x
    state.prevY = y
    state.touching = true
    state.startTime = performance.now()
  }

  const moveTouch = (event: TouchEvent) => {
    if (!event.touches.length) {
      return
    }
    const { clientX: x, clientY: y } = event.touches[0]

    state.dragging = true
    state.deltaX = x - state.startX
    state.deltaY = y - state.startY
    state.offsetX = Math.abs(state.deltaX)
    state.offsetY = Math.abs(state.deltaY)
    state.distance = Math.sqrt(state.offsetX ** 2 + state.offsetY ** 2)
    state.moveX = x - state.prevX
    state.moveY = y - state.prevY

    if (!state.direction) {
      state.direction = getDirection(state.offsetX, state.offsetY)
    }

    state.prevX = x
    state.prevY = y
  }

  const endTouch = () => {
    state.touching = false

    cancelFrame()
    if (typeof window === 'undefined') {
      state.dragging = false
      return
    }
    const frame = window.requestAnimationFrame(() => {
      if (frame !== draggingAnimationFrame) {
        return
      }
      draggingAnimationFrame = null
      state.dragging = false
    })
    draggingAnimationFrame = frame
  }

  const isReachTop = (element: Element | Window) => {
    const scrollTop = getScrollTop(element)

    return scrollTop === 0 && state.deltaY > 0
  }

  const isReachBottom = (element: Element, offset = 1) => {
    const { scrollHeight, clientHeight, scrollTop } = element
    const offsetBottom = Math.abs(scrollHeight - scrollTop - clientHeight)
    return state.deltaY < 0 && offsetBottom <= offset
  }

  onBeforeUnmount(resetTouch)
  onDeactivated(resetTouch)

  return {
    ...toRefs(state),
    resetTouch,
    startTouch,
    moveTouch,
    endTouch,
    isReachTop,
    isReachBottom,
  }
}
