<template>
  <div
    ref="root"
    :class="classes(n(), n('$--box'))"
    @click="handleClick('cell', $event)"
    @touchstart="handleTouchstart"
    @touchend="handleTouchend"
    @touchcancel="handleTouchend"
  >
    <div ref="wrapper" :class="n('wrapper')" :style="wrapperStyle">
      <div v-if="$slots.left" ref="leftRef" :class="n('left')" @click.stop="handleClick('left', $event)">
        <slot name="left" />
      </div>
      <div :class="n('content')">
        <slot />
      </div>
      <div v-if="$slots.right" ref="rightRef" :class="n('right')" @click.stop="handleClick('right', $event)">
        <slot name="right" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { call, getRect, preventDefault, toNumber } from '@maplejs/maple-shared'
import { useEventListener, useTouch } from '@maplejs/maple-use'
import { createNamespace } from '../utils/components'
import { props, type SwipeCellPosition, type SwipeCellSide } from './props'

const { name, n, classes } = createNamespace('swipe-cell')

export default defineComponent({
  name,
  props,
  emits: ['click', 'open', 'close'],
  setup(props, { emit, expose }) {
    const root = ref<HTMLElement | null>(null)
    const wrapper = ref<HTMLElement | null>(null)
    const leftRef = ref<HTMLElement | null>(null)
    const rightRef = ref<HTMLElement | null>(null)
    const offset = ref(0)
    const lockClick = ref(false)
    const opened = ref(false)
    const openedSide = ref<SwipeCellSide | null>(null)
    const measureTick = ref(0)
    const { deltaX, offsetX, offsetY, direction, startTouch, moveTouch, endTouch } = useTouch()

    let startOffset = 0
    let isDragging = false

    const leftWidth = computed(() => {
      void measureTick.value
      return getSideWidth('left')
    })
    const rightWidth = computed(() => {
      void measureTick.value
      return getSideWidth('right')
    })

    const wrapperStyle = computed(() => ({
      transform: `translate3d(${offset.value}px, 0, 0)`,
      transitionDuration: isDragging ? '0s' : undefined,
    }))

    useEventListener(() => document, 'touchstart', handleDocumentTouchstart, { passive: true })
    useEventListener(root, 'touchmove', handleTouchmove, { passive: false })

    watch(
      () => props.disabled,
      (disabled) => {
        if (disabled) {
          close('outside')
        }
      },
    )

    onMounted(() => {
      nextTick(measureSides)
    })

    onBeforeUnmount(() => {
      // noop — listeners cleaned by useEventListener
    })

    function getSideWidth(side: SwipeCellSide) {
      const configured = side === 'left' ? props.leftWidth : props.rightWidth
      if (configured !== 'auto' && configured != null && configured !== '') {
        return Math.max(toNumber(configured), 0)
      }
      const el = side === 'left' ? leftRef.value : rightRef.value
      return el ? getRect(el).width : 0
    }

    function measureSides() {
      // invalidate cached side widths so DOM sizes are re-read
      measureTick.value += 1
    }

    function clampOffset(value: number) {
      return Math.min(Math.max(value, -rightWidth.value), leftWidth.value)
    }

    function open(side: SwipeCellSide) {
      if (props.disabled) {
        return
      }
      const next = side === 'left' ? leftWidth.value : -rightWidth.value
      if (!next) {
        return
      }
      offset.value = next
      if (!opened.value || openedSide.value !== side) {
        opened.value = true
        openedSide.value = side
        emit('open', { name: props.name, position: side })
      }
    }

    async function close(position: SwipeCellPosition = 'outside', event?: Event) {
      if (!opened.value && offset.value === 0) {
        return
      }

      if (props.beforeClose) {
        const result = await props.beforeClose({
          name: props.name,
          position,
          event,
        })
        if (result === false) {
          return
        }
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
      if (props.disabled) {
        return
      }
      startTouch(event)
      startOffset = offset.value
      isDragging = false
      lockClick.value = false
      measureSides()
    }

    function handleTouchmove(event: TouchEvent) {
      if (props.disabled) {
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

      isDragging = true
      lockClick.value = true
      if (props.stopPropagation) {
        event.stopPropagation()
      }
      preventDefault(event)

      offset.value = clampOffset(startOffset + deltaX.value)
    }

    function handleTouchend() {
      if (props.disabled) {
        return
      }
      endTouch()

      if (!isDragging) {
        return
      }
      isDragging = false

      const threshold = 0.3
      if (offset.value > leftWidth.value * threshold) {
        open('left')
      } else if (offset.value < -rightWidth.value * threshold) {
        open('right')
      } else {
        close('cell')
      }

      setTimeout(() => {
        lockClick.value = false
      }, 0)
    }

    function handleDocumentTouchstart(event: TouchEvent) {
      if (!opened.value || !root.value) {
        return
      }
      const target = event.target as Node | null
      if (target && root.value.contains(target)) {
        return
      }
      close('outside', event)
    }

    function handleClick(position: SwipeCellPosition, event: Event) {
      if (lockClick.value) {
        return
      }
      emit('click', position)
      if (opened.value && position !== 'left' && position !== 'right') {
        close(position, event)
      } else if (opened.value && (position === 'left' || position === 'right')) {
        close(position, event)
      }
    }

    expose({
      open,
      close: () => close('outside'),
    })

    return {
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

<style lang="less">
@import '../styles/common';
@import './swipeCell.less';
</style>
