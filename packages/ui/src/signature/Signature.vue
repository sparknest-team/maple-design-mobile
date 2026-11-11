<template>
  <div ref="root" :class="n()">
    <canvas ref="canvas" width="0" height="0"></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent, onActivated, onBeforeUnmount, onDeactivated, onMounted, ref } from 'vue'
import { getRect, getStyle, toNumber } from '@maple-design/shared-vue'
import { onWindowResize, useEventListener } from '@maple-design/use-vue'
import { createNamespace } from '../utils/components'
import { props } from './props'

const { name, n } = createNamespace('signature')

export default defineComponent({
  name,
  props,
  emits: ['start', 'signing', 'end'],
  setup(props, { emit }) {
    const root = ref<HTMLElement>()
    const canvas = ref<HTMLCanvasElement>()
    const canvasWidth = ref(0)
    const canvasHeight = ref(0)
    let pixelRatio = 1
    let previousX = 0
    let previousY = 0
    let strokeMoved = false
    let resizeObserver: ResizeObserver | undefined
    let isSigning = false
    let active = true
    let touchId: number | undefined
    let startedAt = 0
    let ctx: CanvasRenderingContext2D | null = null

    useEventListener(canvas, 'touchstart', handleTouchstart)
    useEventListener(canvas, 'touchmove', handleTouchmove)
    useEventListener(canvas, 'touchend', handleTouchend)
    useEventListener(canvas, 'touchcancel', handleTouchend)
    useEventListener(
      () => canvas.value?.ownerDocument.defaultView,
      'blur',
      () => finishStroke(),
    )
    useEventListener(
      () => canvas.value?.ownerDocument,
      'visibilitychange',
      () => {
        if (canvas.value?.ownerDocument.visibilityState === 'hidden') {
          finishStroke()
        }
      },
    )

    onWindowResize(resize)
    function observeSize() {
      resizeObserver?.disconnect()
      const Observer = root.value?.ownerDocument.defaultView?.ResizeObserver
      if (root.value && Observer && active) {
        resizeObserver = new Observer(resize)
        resizeObserver.observe(root.value)
      }
    }
    onMounted(() => {
      resize()
      observeSize()
    })
    onActivated(() => {
      active = true
      resize()
      observeSize()
    })
    onDeactivated(() => {
      active = false
      resizeObserver?.disconnect()
      finishStroke()
    })
    onBeforeUnmount(() => {
      active = false
      resizeObserver?.disconnect()
      finishStroke()
    })

    function resize() {
      if (!active || !canvas.value || !root.value) {
        return
      }
      finishStroke()
      if (!active || !canvas.value || !root.value) {
        return
      }
      const element = canvas.value
      ctx = element.getContext('2d')
      if (!ctx) {
        return
      }
      const width = root.value.offsetWidth
      const height = root.value.offsetHeight
      if (width <= 0 || height <= 0) {
        return
      }
      const rawRatio = root.value.ownerDocument.defaultView?.devicePixelRatio ?? 1
      const ratio = Number.isFinite(rawRatio) && rawRatio > 0 ? rawRatio : 1
      const pixelWidth = Math.max(1, Math.round(width * ratio))
      const pixelHeight = Math.max(1, Math.round(height * ratio))
      if (
        element.width === pixelWidth &&
        element.height === pixelHeight &&
        canvasWidth.value === width &&
        canvasHeight.value === height &&
        pixelRatio === ratio
      ) {
        return
      }
      let snapshot: HTMLCanvasElement | undefined
      if (canvasWidth.value > 0 && canvasHeight.value > 0) {
        snapshot = element.ownerDocument.createElement('canvas')
        snapshot.width = element.width
        snapshot.height = element.height
        const snapshotContext = snapshot.getContext('2d')
        if (!snapshotContext) {
          return
        }
        snapshotContext.drawImage(element, 0, 0)
      }
      element.width = pixelWidth
      element.height = pixelHeight
      canvasWidth.value = width
      canvasHeight.value = height
      pixelRatio = ratio
      ctx.setTransform(pixelWidth / width, 0, 0, pixelHeight / height, 0, 0)
      if (snapshot) {
        ctx.drawImage(snapshot, 0, 0, snapshot.width, snapshot.height, 0, 0, width, height)
      }
    }

    function touchPoint(touch: Touch) {
      const rect = getRect(canvas.value!)
      const scaleX = rect.width > 0 && canvasWidth.value > 0 ? canvasWidth.value / rect.width : 1
      const scaleY = rect.height > 0 && canvasHeight.value > 0 ? canvasHeight.value / rect.height : 1
      return { x: (touch.clientX - rect.left) * scaleX, y: (touch.clientY - rect.top) * scaleY }
    }

    function handleTouchstart(event: TouchEvent) {
      if (!active || isSigning || !ctx || !root.value || event.touches.length !== 1) {
        return
      }

      if (event.cancelable) {
        event.preventDefault()
      }
      isSigning = true
      touchId = event.touches[0].identifier
      startedAt = event.timeStamp

      ctx.beginPath()
      const width = toNumber(props.lineWidth)
      ctx.lineWidth = Number.isFinite(width) && width > 0 ? width : 2
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.strokeStyle = props.strokeStyle === 'currentColor' ? getStyle(root.value).color : props.strokeStyle
      const point = touchPoint(event.touches[0])
      previousX = point.x
      previousY = point.y
      strokeMoved = false
      ctx.moveTo(previousX, previousY)

      emit('start')
    }

    function handleTouchmove(event: TouchEvent) {
      if (!active || !canvas.value || !ctx || !isSigning || event.timeStamp < startedAt) {
        return
      }
      const touch = Array.from(event.touches).find((point) => point.identifier === touchId)
      if (!touch) {
        return
      }
      if (event.cancelable) {
        event.preventDefault()
      }
      const { x, y } = touchPoint(touch)
      if (x !== previousX || y !== previousY) {
        ctx.beginPath()
        ctx.moveTo(previousX, previousY)
        ctx.lineTo(x, y)
        ctx.stroke()
        previousX = x
        previousY = y
        strokeMoved = true
      }
      emit('signing')
    }

    function finishStroke(beforeNotify?: () => void) {
      const started = isSigning
      isSigning = false
      touchId = undefined
      startedAt = 0
      try {
        beforeNotify?.()
      } finally {
        if (started) {
          emit('end')
        }
      }
    }

    function handleTouchend(event: TouchEvent) {
      if (!isSigning || event.timeStamp < startedAt) {
        return
      }
      if (event.touches.length && !Array.from(event.changedTouches).some((point) => point.identifier === touchId)) {
        return
      }
      if (event.cancelable) {
        event.preventDefault()
      }
      if (event.type === 'touchend' && !strokeMoved && ctx) {
        ctx.beginPath()
        ctx.fillStyle = ctx.strokeStyle
        ctx.arc(previousX, previousY, ctx.lineWidth / 2, 0, Math.PI * 2)
        ctx.fill()
      }
      finishStroke()
    }

    function isCanvasEmpty(element: HTMLCanvasElement) {
      if (!element.width || !element.height) {
        return true
      }
      const context = element.getContext('2d')
      if (!context) {
        return true
      }
      const pixels = context.getImageData(0, 0, element.width, element.height).data
      for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] !== 0) {
          return false
        }
      }
      return true
    }

    // expose
    function reset() {
      finishStroke(() => {
        ctx?.clearRect(0, 0, canvasWidth.value, canvasHeight.value)
        ctx?.closePath()
      })
    }

    // expose
    function confirm() {
      if (!canvas.value) {
        return
      }

      if (isCanvasEmpty(canvas.value)) {
        return ''
      }

      if (props.dataUrlType !== 'jpg') {
        return canvas.value.toDataURL('image/png')
      }
      const output = canvas.value.ownerDocument.createElement('canvas')
      output.width = canvas.value.width
      output.height = canvas.value.height
      const outputContext = output.getContext('2d')
      if (!outputContext) {
        return ''
      }
      outputContext.fillStyle = '#fff'
      outputContext.fillRect(0, 0, output.width, output.height)
      outputContext.drawImage(canvas.value, 0, 0)
      return output.toDataURL('image/jpeg')
    }

    return {
      root,
      canvas,
      canvasWidth,
      canvasHeight,
      n,
      confirm,
      reset,
    }
  },
})
</script>
