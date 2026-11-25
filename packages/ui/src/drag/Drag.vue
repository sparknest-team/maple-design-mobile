<template>
  <!-- Keep an inline Teleport inside a fragment for Vue 3.2 hydration. -->
  <template v-if="false" />
  <Teleport :to="teleportTarget" :disabled="teleportDisabled || popupContainer === false">
    <div
      ref="drag"
      :dir="readingDirection"
      :class="
        classes(n(), n('$--box'), [popupContainer === false, n('--local')], [enableTransition, n('--transition')])
      "
      v-bind="mergeProps({ style: { zIndex } }, themeScope, $attrs)"
      :style="
        dragged ? { top: 0, left: 0, right: 'auto', bottom: 'auto', transform: `translate(${x}px, ${y}px)` } : undefined
      "
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
import { defineComponent, mergeProps, onActivated, onBeforeUnmount, onDeactivated, ref, watch } from 'vue'
import { clamp, getRect, preventDefault } from '@maple-design/shared-vue'
import { onSmartMounted, onWindowResize, useTouch } from '@maple-design/use-vue'
import { useDirection } from '../_utils/direction'
import { useThemeScope } from '../theme-provider/context'
import { createNamespace, useTeleport } from '../utils/components'
import { usePopupContainer } from '../utils/popup-container'
import { boundarySides, dragBoundaryValue, isDragAxis } from './normalize'
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
    const boundary = {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    }

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
    function deactivate() {
      active = false
      handleTouchcancel()
    }
    onDeactivated(deactivate)
    onBeforeUnmount(deactivate)
    onActivated(() => {
      active = true
    })

    function refreshBoundary() {
      toPxBoundary()
      resize()
    }

    onWindowResize(refreshBoundary)
    onSmartMounted(refreshBoundary)

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
      const offset = getOffset()
      x.value = offset.left
      y.value = offset.top
      return offset
    }

    function getOffset() {
      const dragRect = getRect(drag.value!)
      const localRoot = props.popupContainer === false ? (drag.value?.offsetParent as HTMLElement | null) : null
      const rootRect = getRect(localRoot ?? window)
      const top = dragRect.top - rootRect.top - (localRoot?.clientTop ?? 0) + (localRoot?.scrollTop ?? 0)
      const left = dragRect.left - rootRect.left - (localRoot?.clientLeft ?? 0) + (localRoot?.scrollLeft ?? 0)
      const containerWidth = localRoot?.clientWidth ?? rootRect.width
      const containerHeight = localRoot?.clientHeight ?? rootRect.height

      return {
        top,
        left,
        minX: boundary.left,
        minY: boundary.top,
        maxX: Math.max(boundary.left, containerWidth - boundary.right - dragRect.width),
        maxY: Math.max(boundary.top, containerHeight - boundary.bottom - dragRect.height),
      }
    }

    function attract() {
      if (!isDragAxis(props.attraction)) {
        return
      }

      const { top, left, minX, minY, maxX, maxY } = getOffset()
      if (props.attraction.includes('x')) {
        x.value = left - minX <= maxX - left ? minX : maxX
      }

      if (props.attraction.includes('y')) {
        y.value = top - minY <= maxY - top ? minY : maxY
      }
    }

    function clampToBoundary({ minX, minY, maxX, maxY } = getOffset()) {
      x.value = clamp(x.value, minX, maxX)
      y.value = clamp(y.value, minY, maxY)
    }

    function toPxBoundary() {
      for (const side of boundarySides) {
        boundary[side] = dragBoundaryValue(props.boundary?.[side])
      }
    }

    // expose
    function resize() {
      if (!active || !dragged.value || !drag.value) {
        return
      }

      clampToBoundary(saveXY())
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
      dragged,
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
