<template>
  <div
    ref="root"
    tabindex="-1"
    :class="classes(n(), n('$--box'))"
    :aria-busy="busy || undefined"
    @click="handleClick('cell', $event)"
  >
    <PendingFeedback :loading="busy" />
    <div ref="wrapper" :class="n('wrapper')" :style="wrapperStyle">
      <div
        v-if="$slots.left"
        ref="leftRef"
        :class="n('left')"
        :inert="leftAvailable ? undefined : true"
        :aria-hidden="!leftAvailable || undefined"
        @click.stop="handleClick('left', $event)"
      >
        <slot name="left" />
      </div>
      <div :class="n('content')">
        <slot />
      </div>
      <div
        v-if="$slots.right"
        ref="rightRef"
        :class="n('right')"
        :inert="rightAvailable ? undefined : true"
        :aria-hidden="!rightAvailable || undefined"
        @click.stop="handleClick('right', $event)"
      >
        <slot name="right" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  nextTick,
  onActivated,
  onBeforeUnmount,
  onDeactivated,
  onMounted,
  ref,
  watch,
} from 'vue'
import { call, getRect, preventDefault } from '@maple-design/shared-vue'
import { useTouch } from '@maple-design/use-vue'
import PendingFeedback from '../_components/pending-feedback/PendingFeedback.vue'
import { useActionGuard } from '../_hooks/use-action-guard'
import { createNamespace } from '../utils/components'
import { props, type SwipeCellPosition, type SwipeCellSide } from './props'

const { name, n, classes } = createNamespace('swipe-cell')

export default defineComponent({
  name,
  props,
  components: { PendingFeedback },
  emits: ['click', 'open', 'close', 'guard-error'],
  setup(props, { emit, expose }) {
    const guard = useActionGuard()
    const busy = computed(() => props.loading || guard.pending.value)
    const root = ref<HTMLElement | null>(null)
    const wrapper = ref<HTMLElement | null>(null)
    const leftRef = ref<HTMLElement | null>(null)
    const rightRef = ref<HTMLElement | null>(null)
    const offset = ref(0)
    const lockClick = ref(false)
    const opened = ref(false)
    const openedSide = ref<SwipeCellSide | null>(null)
    const measureTick = ref(0)
    const leftAvailable = computed(() => openedSide.value === 'left' && offset.value > 0)
    const rightAvailable = computed(() => openedSide.value === 'right' && offset.value < 0)
    let returnFocus: HTMLElement | null = null
    let sideObserver: ResizeObserver | undefined
    const { deltaX, offsetX, offsetY, direction, startTouch, moveTouch, endTouch, resetTouch } = useTouch()

    let startOffset = 0
    const isDragging = ref(false)
    let hasTouch = false
    let gestureGeneration = 0
    let unlockGeneration = 0
    let unlockTimer: number | undefined
    let bindingGeneration = 0
    let unbind: (() => void) | undefined
    let active = true
    let disposed = false
    let commandGeneration = 0
    const available = () => active && !disposed

    watch(
      () => [props.beforeClose, props.name, props.loading],
      () => {
        guard.cancel()
        commandGeneration += 1
        if (props.loading) {
          cancelGesture()
        }
      },
      { flush: 'sync' },
    )

    const leftWidth = computed(() => {
      void measureTick.value
      return getSideWidth('left')
    })
    const rightWidth = computed(() => {
      void measureTick.value
      return getSideWidth('right')
    })

    watch(
      [leftAvailable, rightAvailable],
      ([left, right]) => {
        const activeElement = root.value?.ownerDocument.activeElement
        const hidden =
          (!left && leftRef.value?.contains(activeElement ?? null)) ||
          (!right && rightRef.value?.contains(activeElement ?? null))
        if (hidden) {
          const target =
            returnFocus?.isConnected && !leftRef.value?.contains(returnFocus) && !rightRef.value?.contains(returnFocus)
              ? returnFocus
              : root.value
          target?.focus({ preventScroll: true })
          if (root.value?.ownerDocument.activeElement === activeElement) {
            root.value?.focus({ preventScroll: true })
          }
        }
      },
      { flush: 'sync' },
    )

    const wrapperStyle = computed(() => ({
      transform: `translate3d(${offset.value}px, 0, 0)`,
      transitionDuration: isDragging.value ? '0s' : undefined,
    }))

    function clearBindings() {
      bindingGeneration += 1
      unbind?.()
      unbind = undefined
    }

    function bindListeners() {
      clearBindings()
      const element = root.value
      if (!available() || !element) {
        return
      }
      const generation = bindingGeneration
      const current = () => available() && generation === bindingGeneration && root.value === element
      const start = (event: TouchEvent) => {
        if (current()) {
          handleTouchstart(event)
        }
      }
      const move = (event: TouchEvent) => {
        if (current()) {
          handleTouchmove(event)
        }
      }
      const end = () => {
        if (current()) {
          handleTouchend()
        }
      }
      const cancel = () => {
        if (current()) {
          cancelGesture()
        }
      }
      const outside = (event: TouchEvent) => {
        if (current()) {
          handleDocumentTouchstart(event)
        }
      }
      const owner = element.ownerDocument
      element.addEventListener('touchstart', start, { passive: true })
      element.addEventListener('touchmove', move, { passive: false })
      element.addEventListener('touchend', end)
      element.addEventListener('touchcancel', cancel)
      owner.addEventListener('touchstart', outside, { passive: true })
      unbind = () => {
        element.removeEventListener('touchstart', start)
        element.removeEventListener('touchmove', move)
        element.removeEventListener('touchend', end)
        element.removeEventListener('touchcancel', cancel)
        owner.removeEventListener('touchstart', outside)
      }
    }

    watch(root, bindListeners, { flush: 'post' })

    watch(
      () => props.disabled,
      (disabled) => {
        guard.cancel()
        commandGeneration += 1
        if (disabled) {
          cancelGesture()
          close('outside')
        }
      },
      { flush: 'sync' },
    )

    function observeSides() {
      sideObserver?.disconnect()
      sideObserver = undefined
      const Observer = root.value?.ownerDocument.defaultView?.ResizeObserver
      if (!available() || !Observer) {
        return
      }
      sideObserver = new Observer(() => reconcileSides())
      if (leftRef.value) {
        sideObserver.observe(leftRef.value)
      }
      if (rightRef.value) {
        sideObserver.observe(rightRef.value)
      }
    }

    watch([leftRef, rightRef], observeSides, { flush: 'post' })
    watch(
      () => [props.leftWidth, props.rightWidth],
      () => reconcileSides(),
      { flush: 'post' },
    )
    onMounted(() => {
      bindListeners()
      observeSides()
      nextTick(reconcileSides)
    })

    onActivated(() => {
      active = true
      bindListeners()
      observeSides()
      nextTick(reconcileSides)
    })
    onDeactivated(() => {
      active = false
      sideObserver?.disconnect()
      commandGeneration += 1
      cancelGesture()
      clearBindings()
    })
    onBeforeUnmount(() => {
      disposed = true
      sideObserver?.disconnect()
      commandGeneration += 1
      cancelGesture()
      clearBindings()
    })

    function cancelUnlock() {
      unlockGeneration += 1
      if (unlockTimer !== undefined) {
        window.clearTimeout(unlockTimer)
        unlockTimer = undefined
      }
    }

    function cancelGesture() {
      gestureGeneration += 1
      cancelUnlock()
      if (hasTouch) {
        offset.value = startOffset
      }
      hasTouch = false
      isDragging.value = false
      lockClick.value = false
      resetTouch()
    }

    function getSideWidth(side: SwipeCellSide) {
      const configured = side === 'left' ? props.leftWidth : props.rightWidth
      if (configured !== 'auto' && configured != null && configured !== '') {
        const numeric = Number(configured)
        return Number.isFinite(numeric) ? Math.max(numeric, 0) : 0
      }
      const el = side === 'left' ? leftRef.value : rightRef.value
      return el ? getRect(el).width : 0
    }

    function measureSides() {
      if (!available()) {
        return
      }
      // invalidate cached side widths so DOM sizes are re-read
      measureTick.value += 1
    }

    function reconcileSides() {
      if (!available()) {
        return
      }
      measureSides()
      if (!hasTouch && openedSide.value) {
        offset.value = openedSide.value === 'left' ? leftWidth.value : -rightWidth.value
      }
    }

    function clampOffset(value: number) {
      return Math.min(Math.max(value, -rightWidth.value), leftWidth.value)
    }

    function open(side: SwipeCellSide) {
      guard.cancel()
      if (!available() || props.disabled || props.loading) {
        return
      }
      if (hasTouch) {
        cancelGesture()
      }
      const generation = ++commandGeneration
      measureSides()
      const next = side === 'left' ? leftWidth.value : -rightWidth.value
      if (!available() || props.disabled || generation !== commandGeneration || !next) {
        return
      }
      const focused = root.value?.ownerDocument.activeElement
      if (focused instanceof HTMLElement && !leftRef.value?.contains(focused) && !rightRef.value?.contains(focused)) {
        returnFocus = focused
      }
      offset.value = next
      if (!opened.value || openedSide.value !== side) {
        opened.value = true
        openedSide.value = side
        emit('open', { name: props.name, position: side })
      }
    }

    async function close(position: SwipeCellPosition = 'outside', event?: Event) {
      if (!available() || busy.value || (!opened.value && offset.value === 0)) {
        return
      }
      if (hasTouch) {
        cancelGesture()
      }

      const generation = ++commandGeneration

      if (props.beforeClose) {
        const hook = props.beforeClose
        const outcome = await guard.run(
          position,
          (current) => hook({ name: props.name, position: current, event }),
          event,
        )
        if (outcome.status !== 'allowed') {
          if (outcome.status === 'error') {
            emit('guard-error', outcome.error, position)
          }
          return
        }
      }

      if (!available() || generation !== commandGeneration) {
        return
      }

      const prevSide = openedSide.value
      offset.value = 0
      if (opened.value) {
        opened.value = false
        openedSide.value = null
        emit('close', {
          name: props.name,
          position: position === 'cell' || position === 'outside' ? position : (prevSide ?? position),
        })
      }
    }

    function handleTouchstart(event: TouchEvent) {
      if (props.loading) {
        return
      }
      guard.cancel()
      if (!available() || props.disabled || props.loading) {
        return
      }
      commandGeneration += 1
      cancelGesture()
      startTouch(event)
      hasTouch = event.touches.length > 0
      startOffset = offset.value
      isDragging.value = false
      lockClick.value = false
      measureSides()
    }

    function handleTouchmove(event: TouchEvent) {
      if (!available() || props.disabled || props.loading || !hasTouch) {
        return
      }
      moveTouch(event)

      if (!direction.value) {
        return
      }
      if (direction.value === 'vertical') {
        return
      }
      if (offsetX.value < offsetY.value) {
        return
      }

      const generation = gestureGeneration
      isDragging.value = true
      lockClick.value = true
      if (props.stopPropagation) {
        event.stopPropagation()
      }
      preventDefault(event)

      const next = clampOffset(startOffset + deltaX.value)
      if (available() && !props.disabled && hasTouch && generation === gestureGeneration) {
        offset.value = next
      }
    }

    function handleTouchend() {
      if (!available() || props.disabled || props.loading || !hasTouch) {
        return
      }
      const generation = gestureGeneration
      hasTouch = false
      endTouch()

      if (!isDragging.value) {
        return
      }
      isDragging.value = false

      const threshold = 0.3
      const left = leftWidth.value
      const right = rightWidth.value
      if (!available() || props.disabled || generation !== gestureGeneration) {
        return
      }
      if (offset.value > left * threshold) {
        open('left')
      } else if (offset.value < -right * threshold) {
        open('right')
      } else {
        close('cell')
      }

      if (!available() || props.disabled || generation !== gestureGeneration) {
        return
      }
      cancelUnlock()
      const unlock = unlockGeneration
      unlockTimer = window.setTimeout(() => {
        if (!available() || props.disabled || unlock !== unlockGeneration) {
          return
        }
        unlockGeneration += 1
        unlockTimer = undefined
        lockClick.value = false
      }, 0)
    }

    function handleDocumentTouchstart(event: TouchEvent) {
      if (!available() || props.disabled || !opened.value || !root.value) {
        return
      }
      const target = event.target as Node | null
      if (target && root.value.contains(target)) {
        return
      }
      close('outside', event)
    }

    function handleClick(position: SwipeCellPosition, event: Event) {
      if (!available() || lockClick.value) {
        return
      }
      const generation = commandGeneration
      emit('click', position)
      if (!available() || generation !== commandGeneration) {
        return
      }
      if (opened.value && position !== 'left' && position !== 'right') {
        close(position, event)
      } else if (opened.value && (position === 'left' || position === 'right')) {
        close(position, event)
      }
    }

    const publicApi = { open, close: () => close('outside') }
    expose(publicApi)

    return {
      ...publicApi,
      busy,
      leftAvailable,
      rightAvailable,
      root,
      wrapper,
      leftRef,
      rightRef,
      wrapperStyle,
      n,
      classes,
      handleTouchstart,
      handleTouchend,
      handleClick,
    }
  },
})
</script>
