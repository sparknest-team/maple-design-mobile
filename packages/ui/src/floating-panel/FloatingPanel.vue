<template>
  <!-- Keep an inline Teleport inside a fragment for Vue 3.2 hydration. -->
  <template v-if="false" />
  <Teleport :to="teleportTarget" :disabled="teleportDisabled || popupContainer === false">
    <div
      v-bind="mergeProps(themeScope, $attrs)"
      :dir="readingDirection"
      :class="classes(n(), [safeArea, n('--safe-area')], formatElevation(elevation, 3))"
      :style="{
        height: toSizeUnit(maxAnchor),
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
import { computed, defineComponent, mergeProps, ref, shallowRef, watch } from 'vue'
import { preventDefault } from '@maple-design/shared-vue'
import { useTouch } from '@maple-design/use-vue'
import { useDirection } from '../_utils/direction'
import { useThemeScope } from '../theme-provider/context'
import { createNamespace, formatElevation, useTeleport } from '../utils/components'
import { toSizeUnit } from '../utils/elements'
import { usePopupContainer } from '../utils/popup-container'
import { useScrollLock } from '../utils/scroll-lock'
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
    const contentRef = ref<HTMLElement | null>(null)
    const windowHeight = ref(0)
    const panelDocument = shallowRef<Document>()
    const anchors = computed(() => panelAnchors(props.anchors, () => windowHeight.value))
    const anchor = computed(() => nearestPanelAnchor(props.modelValue ?? innerAnchor.value, anchors.value))
    const normalizedDuration = computed(() => panelDuration(props.duration))
    const minAnchor = computed<number>(() => Math.min(...anchors.value))
    const maxAnchor = computed<number>(() => Math.max(...anchors.value))
    const teleportTarget = usePopupContainer(() => props.popupContainer)
    const { disabled: teleportDisabled } = useTeleport()
    const { deltaY, touching, startTouch, moveTouch, endTouch, resetTouch, isReachTop, isReachBottom } = useTouch()

    let startVisibleHeight: number

    // A Teleport can move the same content node between documents.
    watch(
      [contentRef, teleportTarget, teleportDisabled, () => props.popupContainer],
      (_, __, cleanup) => {
        const doc = teleportDisabled.value ? undefined : contentRef.value?.ownerDocument
        panelDocument.value = doc
        const view = doc?.defaultView
        if (!view) {
          return
        }
        const resize = () => {
          windowHeight.value = view.innerHeight
        }
        resize()
        view.addEventListener('resize', resize)
        view.addEventListener('orientationchange', resize)
        cleanup(() => {
          view.removeEventListener('resize', resize)
          view.removeEventListener('orientationchange', resize)
        })
      },
      { flush: 'post' },
    )
    useScrollLock(
      () => panelDocument.value?.body,
      () => touching.value,
      { className: n('$--lock'), reserveScrollBar: true },
    )

    const visibleHeight = computed(() => (touching.value ? draftHeight.value : anchor.value))
    watch(() => [props.modelValue, ...anchors.value], resetTouch, { flush: 'sync' })
    function handleTouchstart(event: TouchEvent) {
      if (
        !contentRef.value ||
        teleportDisabled.value ||
        (!props.contentDraggable && contentRef.value?.contains(event.target as Node))
      ) {
        return
      }
      startVisibleHeight = anchor.value
      draftHeight.value = startVisibleHeight
      startTouch(event)
    }

    function handleTouchmove(event: TouchEvent) {
      if (!touching.value) {
        return
      }
      moveTouch(event)

      const content = contentRef.value
      if (content?.contains(event.target as Node)) {
        if (!props.contentDraggable) {
          return
        }
        if (visibleHeight.value >= maxAnchor.value && !isReachTop(content)) {
          if (isReachBottom(content)) {
            preventDefault(event)
          }
          return
        }
      }

      const height = startVisibleHeight - deltaY.value
      const limit = Math.max(minAnchor.value, Math.min(maxAnchor.value, height))
      draftHeight.value = limit + (height - limit) * OVERFLOW_REDUCE_RATIO
      preventDefault(event)
    }

    function handleTouchend() {
      if (!touching.value) {
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
      handleTouchcancel: resetTouch,
    }
  },
})
</script>
