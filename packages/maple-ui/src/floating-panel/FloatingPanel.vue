<template>
  <Teleport :to="teleportTarget" :disabled="teleportDisabled || popupContainer === false">
    <div
      v-bind="mergeProps(themeScope, $attrs)"
      :dir="readingDirection"
      :class="classes(n(), [safeArea, n('--safe-area')], formatElevation(elevation, 3))"
      :style="{
        height: `${toSizeUnit(maxAnchor)}`,
        transform: `translateY(calc(100% - ${toSizeUnit(visibleHeight)}))`,
        transition: touching
          ? 'none'
          : `transform ${normalizedDuration}ms var(--mp-floating-panel-transition-timing-function), background-color 0.25s`,
      }"
      @touchstart="handleTouchstart"
      @touchmove="handleTouchmove"
      @touchend="handleTouchend"
      @touchcancel="handleTouchcancel"
    >
      <slot name="header">
        <div :class="n('header')">
          <div :class="n('header-toolbar')"></div>
        </div>
      </slot>
      <div ref="contentRef" :class="n('content')">
        <slot></slot>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts">
import { computed, defineComponent, mergeProps, onActivated, onBeforeUnmount, onDeactivated, ref, watch } from 'vue'
import { preventDefault } from '@maple-design/shared'
import { useTouch, useWindowSize } from '@maple-design/use'
import { useDirection } from '../_utils/direction'
import { useLock } from '../context/lock'
import { useThemeScope } from '../theme-provider/context'
import { createNamespace, formatElevation, useTeleport } from '../utils/components'
import { toSizeUnit } from '../utils/elements'
import { usePopupContainer } from '../utils/popup-container'
import { nearestPanelAnchor, panelAnchors, panelDuration } from './normalize'
import { props } from './props'

const { name, n, classes } = createNamespace('floating-panel')

const OVERFLOW_REDUCE_RATIO = 0.2

export default defineComponent({
  name,
  inheritAttrs: false,
  props,
  emits: { 'height-change': (height: number) => true, 'update:modelValue': (height: number) => true },
  setup(props, { attrs, emit }) {
    const themeScope = useThemeScope()
    const { dir: readingDirection } = useDirection(undefined, () => attrs.dir)
    const draftHeight = ref(0)
    const innerAnchor = ref(props.defaultValue)
    let active = true
    const contentRef = ref<HTMLElement | null>(null)
    const { height: windowHeight } = useWindowSize()
    const anchors = computed(() => panelAnchors(props.anchors, windowHeight.value))
    const anchor = computed(() => nearestPanelAnchor(props.modelValue ?? innerAnchor.value, anchors.value))
    const normalizedDuration = computed(() => panelDuration(props.duration))
    const minAnchor = computed<number>(() => Math.min(...anchors.value))
    const maxAnchor = computed<number>(() => Math.max(...anchors.value))
    const teleportTarget = usePopupContainer(() => props.popupContainer)
    const { disabled: teleportDisabled } = useTeleport()
    const { deltaY, touching, startTouch, moveTouch, endTouch, resetTouch, isReachTop, isReachBottom } = useTouch()

    let startVisibleHeight: number

    useLock(() => touching.value)

    const visibleHeight = computed(() => (touching.value ? draftHeight.value : anchor.value))
    watch(
      () => [props.modelValue, ...anchors.value],
      () => resetTouch(),
      { flush: 'sync' },
    )
    onDeactivated(() => {
      active = false
      resetTouch()
    })
    onActivated(() => {
      active = true
    })
    onBeforeUnmount(() => {
      active = false
      resetTouch()
    })

    function handleTouchstart(event: TouchEvent) {
      if (!active || (!props.contentDraggable && contentRef.value?.contains(event.target as Node))) {
        return
      }
      startVisibleHeight = anchor.value
      draftHeight.value = startVisibleHeight
      startTouch(event)
    }

    function handleTouchmove(event: TouchEvent) {
      if (!active || !touching.value) {
        return
      }
      moveTouch(event)

      const target = event.target as Element
      const eventFromContent = contentRef.value === target || contentRef.value?.contains(target)

      if (eventFromContent && !props.contentDraggable) {
        return
      }

      if (
        eventFromContent &&
        props.contentDraggable &&
        visibleHeight.value >= maxAnchor.value &&
        !isReachTop(contentRef.value!)
      ) {
        if (isReachBottom(contentRef.value!)) {
          preventDefault(event)
        }
        return
      }

      const targetVisibleHeight = startVisibleHeight - deltaY.value
      draftHeight.value = clampVisibleHeight(targetVisibleHeight)
      preventDefault(event)
    }

    function handleTouchend() {
      if (!active || !touching.value) {
        return
      }
      const next = nearestPanelAnchor(draftHeight.value, anchors.value)
      const previous = anchor.value
      endTouch()
      if (next !== previous) {
        if (props.modelValue === undefined) {
          innerAnchor.value = next
        }
        emit('update:modelValue', next)
        emit('height-change', next)
      }
    }

    function handleTouchcancel() {
      resetTouch()
    }

    function clampVisibleHeight(visibleHeight: number): number {
      if (visibleHeight > maxAnchor.value) {
        // overflow top
        const overflowHeight = visibleHeight - maxAnchor.value
        return maxAnchor.value + overflowHeight * OVERFLOW_REDUCE_RATIO
      }

      if (visibleHeight < minAnchor.value) {
        // overflow bottom
        const overflowHeight = minAnchor.value - visibleHeight
        return minAnchor.value - overflowHeight * OVERFLOW_REDUCE_RATIO
      }

      return visibleHeight
    }

    return {
      themeScope,
      mergeProps,
      readingDirection,
      contentRef,
      teleportDisabled,
      teleportTarget,
      touching,
      minAnchor,
      maxAnchor,
      visibleHeight,
      n,
      classes,
      toSizeUnit,
      normalizedDuration,
      formatElevation,
      handleTouchstart,
      handleTouchmove,
      handleTouchend,
      handleTouchcancel,
    }
  },
})
</script>
