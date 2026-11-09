<template>
  <Teleport :to="teleportTarget" :disabled="teleportDisabled || popupContainer === false">
    <div
      ref="drag"
      :dir="readingDirection"
      :class="
        classes(n(), n('$--box'), [popupContainer === false, n('--local')], [enableTransition, n('--transition')])
      "
      :style="{
        'z-index': zIndex,
      }"
      v-bind="mergeProps(themeScope, getAttrs())"
      @touchstart="handleTouchstart"
      @touchmove="handleTouchmove"
      @touchend="handleTouchend"
      @touchcancel="handleTouchcancel"
      @click="handleClick"
    >
      <slot />
    </div>
  </Teleport>
</template>

<script lang="ts">
import { defineComponent, mergeProps, onActivated, onBeforeUnmount, onDeactivated, reactive, ref, watch } from 'vue'
import { clamp, getRect, preventDefault } from '@maple-design/shared'
import { onSmartMounted, onWindowResize, useTouch } from '@maple-design/use'
import { useDirection } from '../_utils/direction'
import { useThemeScope } from '../theme-provider/context'
import { createNamespace, useTeleport } from '../utils/components'
import { usePopupContainer } from '../utils/popup-container'
import { dragBoundaryValue, isDragAxis } from './normalize'
import { props } from './props'

const { name, n, classes } = createNamespace('drag')

export default defineComponent({
  name,
  inheritAttrs: false,
  props,
  emits: { click: (event: Event) => true },
  setup(props, { attrs, emit }) {
    const themeScope = useThemeScope()
    const { dir: readingDirection } = useDirection(undefined, () => attrs.dir)
    const drag = ref<HTMLElement | null>(null)
    let active = true
    const x = ref(0)
    const y = ref(0)
    const dragged = ref(false)
    const enableTransition = ref(false)
    const { touching, dragging, moveX, moveY, startTouch, moveTouch, endTouch, resetTouch } = useTouch()
    const { disabled: teleportDisabled } = useTeleport()
    const teleportTarget = usePopupContainer(() => props.popupContainer)
    const boundary = reactive({
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    })

    watch(
      () => props.boundary,
      () => {
        handleTouchcancel()
        toPxBoundary()
        if (dragged.value && drag.value) {
          clampToBoundary()
        }
      },
      { deep: true, flush: 'post' },
    )
    watch(() => [props.disabled, props.axis, props.attraction, props.popupContainer], handleTouchcancel, {
      flush: 'sync',
    })
    onDeactivated(() => {
      active = false
      handleTouchcancel()
    })
    onActivated(() => {
      active = true
    })
    onBeforeUnmount(() => {
      active = false
      handleTouchcancel()
    })

    onWindowResize(() => {
      toPxBoundary()
      resize()
    })

    onSmartMounted(() => {
      toPxBoundary()
      resize()
    })

    function handleTouchstart(event: TouchEvent) {
      if (!active || props.disabled) {
        return
      }

      startTouch(event)
      saveXY()
    }

    function handleTouchmove(event: TouchEvent) {
      if (!active || !touching.value || props.disabled) {
        return
      }

      moveTouch(event)
      preventDefault(event)
      enableTransition.value = false
      dragged.value = true

      const axis = isDragAxis(props.axis) ? props.axis : 'xy'
      if (axis.includes('x')) {
        x.value += moveX.value
      }

      if (axis.includes('y')) {
        y.value += moveY.value
      }

      clampToBoundary()
    }

    function handleTouchend() {
      if (!active || props.disabled || !touching.value) {
        handleTouchcancel()
        return
      }
      endTouch()
      enableTransition.value = true
      attract()
    }

    function handleTouchcancel() {
      resetTouch()
      enableTransition.value = false
    }

    function handleClick(event: Event) {
      if (!active || dragging.value) {
        return
      }

      emit('click', event)
    }

    function saveXY() {
      const { left, top } = getOffset()
      x.value = left
      y.value = top
    }

    function getOffset() {
      const dragRect = getRect(drag.value!)
      const localRoot = props.popupContainer === false ? (drag.value?.offsetParent as HTMLElement | null) : null
      const rootRect = getRect(localRoot ?? window)
      const rootScrollTop = localRoot?.scrollTop ?? 0
      const rootScrollLeft = localRoot?.scrollLeft ?? 0
      const rootTop = rootRect.top + (localRoot?.clientTop ?? 0) - rootScrollTop
      const rootLeft = rootRect.left + (localRoot?.clientLeft ?? 0) - rootScrollLeft

      const top = dragRect.top - rootTop
      const left = dragRect.left - rootLeft

      const { width, height } = dragRect
      const containerWidth = localRoot?.clientWidth ?? rootRect.width
      const containerHeight = localRoot?.clientHeight ?? rootRect.height
      const bottom = containerHeight - top - height
      const right = containerWidth - left - width

      return {
        top,
        bottom,
        left,
        right,
        width,
        height,
        halfWidth: width / 2,
        halfHeight: height / 2,
        containerWidth,
        containerHeight,
      }
    }

    function getRange() {
      const offset = getOffset()
      const x1 = boundary.left
      const x2 = offset.containerWidth - boundary.right - offset.width
      const y1 = boundary.top
      const y2 = offset.containerHeight - boundary.bottom - offset.height

      return {
        minX: x1,
        minY: y1,
        // fallback the drag element overflows boundary
        maxX: x1 < x2 ? x2 : x1,
        maxY: y1 < y2 ? y2 : y1,
      }
    }

    function attract() {
      if (!isDragAxis(props.attraction)) {
        return
      }

      const { halfWidth, halfHeight, top, bottom, left, right } = getOffset()
      const { minX, minY, maxX, maxY } = getRange()

      const leftDistance = left + halfWidth - boundary.left
      const rightDistance = right + halfWidth - boundary.right
      const topDistance = top + halfHeight - boundary.top
      const bottomDistance = bottom + halfHeight - boundary.bottom

      const nearLeft = leftDistance <= rightDistance
      const nearTop = topDistance <= bottomDistance

      if (props.attraction.includes('x')) {
        x.value = nearLeft ? minX : maxX
      }

      if (props.attraction.includes('y')) {
        y.value = nearTop ? minY : maxY
      }
    }

    function clampToBoundary() {
      const { minX, minY, maxX, maxY } = getRange()
      x.value = clamp(x.value, minX, maxX)
      y.value = clamp(y.value, minY, maxY)
    }

    function toPxBoundary() {
      const { top = 0, bottom = 0, left = 0, right = 0 } = props.boundary ?? {}

      boundary.top = dragBoundaryValue(top)
      boundary.bottom = dragBoundaryValue(bottom)
      boundary.left = dragBoundaryValue(left)
      boundary.right = dragBoundaryValue(right)
    }

    function getAttrs() {
      const style = (attrs.style as Record<string, any>) ?? {}

      return {
        ...attrs,
        style: {
          ...style,
          // when the drag element is dragged for the first time, the inset should be cleared to avoid affecting translateX and translateY.
          top: dragged.value ? 0 : style.top,
          left: dragged.value ? 0 : style.left,
          right: dragged.value ? 'auto' : style.right,
          bottom: dragged.value ? 'auto' : style.bottom,
          transform: dragged.value ? `translate(${x.value}px, ${y.value}px)` : style.transform,
        },
      }
    }

    // expose
    function resize() {
      if (!active || !dragged.value || !drag.value) {
        return
      }

      saveXY()
      clampToBoundary()
    }

    // expose
    function reset() {
      resetTouch()
      enableTransition.value = false
      dragged.value = false
      x.value = 0
      y.value = 0
    }

    return {
      themeScope,
      mergeProps,
      readingDirection,
      drag,
      x,
      y,
      enableTransition,
      dragging,
      teleportTarget,
      teleportDisabled,
      n,
      classes,
      getAttrs,
      handleTouchstart,
      handleTouchmove,
      handleTouchend,
      handleTouchcancel,
      handleClick,
      resize,
      reset,
    }
  },
})
</script>
