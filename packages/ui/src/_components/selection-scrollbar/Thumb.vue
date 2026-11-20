<template>
  <div
    ref="trackRef"
    :class="[`${prefixCls}-track`, `${prefixCls}-track-direction-${orientation}`]"
    @mousedown.self="handleTrackClick"
  >
    <div
      ref="thumbRef"
      :class="thumbCls"
      :style="thumbStyle"
      @pointerdown="handleThumbPointerDown"
      @mousedown="handleThumbMouseDown"
    >
      <div :class="`${prefixCls}-thumb-bar`" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onActivated, onBeforeUnmount, onDeactivated, PropType, ref, watch } from 'vue'
import { Orientation } from '../../_utils/constant'
import { createNamespace, getPrefixCls } from '../../utils/components'
import { ThumbData, ThumbMap } from './types'

export default defineComponent({
  name: createNamespace('thumb').name,
  props: {
    data: {
      type: Object as PropType<ThumbData>,
    },
    orientation: {
      type: String as PropType<Orientation>,
      default: 'horizontal',
    },
    alwaysShow: {
      type: Boolean,
      default: false,
    },
    both: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['scroll'],
  setup(props, { emit }) {
    const prefixCls = getPrefixCls('scrollbar')

    const visible = ref(false)
    const trackRef = ref<HTMLElement>()
    const thumbRef = ref<HTMLElement>()

    const thumbMap = computed<ThumbMap>(() => {
      if (props.orientation === 'horizontal') {
        return {
          size: 'width',
          direction: 'left',
          offset: 'offsetWidth',
          client: 'clientX',
        }
      }
      return {
        size: 'height',
        direction: 'top',
        offset: 'offsetHeight',
        client: 'clientY',
      }
    })

    const offset = ref(0)

    const isDragging = ref(false)
    const mouseOffset = ref(0)

    const thumbStyle = computed(() => {
      return {
        [thumbMap.value.size]: `${props.data?.thumbSize ?? 0}px`,
        [thumbMap.value.direction]: `${offset.value}px`,
      }
    })

    let active = true
    let disposed = false
    let generation = 0
    interface DragSession {
      token: number
      view: Window
      track: HTMLElement
      thumb: HTMLElement
      start: number
      map: ThumbMap
      move: (event: MouseEvent) => void
      end: (event?: Event) => void
      pointerId?: number
    }
    let drag: DragSession | undefined
    const available = () => active && !disposed
    const valid = (session: DragSession) =>
      available() &&
      drag === session &&
      generation === session.token &&
      trackRef.value === session.track &&
      thumbRef.value === session.thumb &&
      session.track.ownerDocument.defaultView === session.view &&
      session.thumb.ownerDocument.defaultView === session.view

    function cancelDrag() {
      const previous = drag
      drag = undefined
      const token = ++generation
      if (previous) {
        previous.view.removeEventListener(previous.pointerId === undefined ? 'mousemove' : 'pointermove', previous.move)
        previous.view.removeEventListener(previous.pointerId === undefined ? 'mouseup' : 'pointerup', previous.end)
        if (previous.pointerId !== undefined) {
          previous.view.removeEventListener('pointercancel', previous.end)
        }
        previous.view.removeEventListener('contextmenu', previous.end)
        previous.view.removeEventListener('blur', previous.end)
      }
      // Listener removal or reactive notification can synchronously start new work.
      if (token === generation) {
        mouseOffset.value = 0
        isDragging.value = false
      }
    }
    const getLegalOffset = (value: number) => {
      if (value < 0) {
        return 0
      }
      if (props.data && value > props.data.max) {
        return props.data.max
      }
      return value
    }
    const handleThumbMouseDown = (event: MouseEvent, pointerId?: number) => {
      if (!available() || event.button !== 0) {
        return
      }
      cancelDrag()
      if (!available() || drag) {
        return
      }
      const thumb = thumbRef.value
      const track = trackRef.value
      const view = thumb?.ownerDocument.defaultView
      if (!thumb || !track || !view || track.ownerDocument.defaultView !== view) {
        return
      }
      const token = generation
      const map = thumbMap.value
      event.preventDefault()
      const start = event[map.client] - thumb.getBoundingClientRect()[map.direction]
      if (
        !available() ||
        token !== generation ||
        thumbRef.value !== thumb ||
        trackRef.value !== track ||
        thumb.ownerDocument.defaultView !== view ||
        track.ownerDocument.defaultView !== view
      ) {
        return
      }
      const session: DragSession = { token, view, track, thumb, start, map, pointerId, move: () => {}, end: () => {} }
      session.move = (event: MouseEvent) => {
        if (!valid(session) || (pointerId !== undefined && (event as PointerEvent).pointerId !== pointerId)) {
          return
        }
        const next = getLegalOffset(
          event[session.map.client] - session.track.getBoundingClientRect()[session.map.direction] - session.start,
        )
        if (!valid(session)) {
          return
        }
        if (next !== offset.value) {
          offset.value = next
          if (valid(session)) {
            emit('scroll', next)
          }
        }
      }
      session.end = (event) => {
        if (
          event &&
          (event.type === 'pointerup' || event.type === 'pointercancel') &&
          (event as PointerEvent).pointerId !== pointerId
        ) {
          return
        }
        if (valid(session)) {
          cancelDrag()
        }
      }
      drag = session
      mouseOffset.value = start
      isDragging.value = true
      if (!valid(session)) {
        return
      }
      view.addEventListener(pointerId === undefined ? 'mousemove' : 'pointermove', session.move)
      view.addEventListener(pointerId === undefined ? 'mouseup' : 'pointerup', session.end)
      if (pointerId !== undefined) {
        view.addEventListener('pointercancel', session.end)
      }
      view.addEventListener('contextmenu', session.end)
      view.addEventListener('blur', session.end)
    }
    const handleThumbPointerDown = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' && event.isPrimary) {
        handleThumbMouseDown(event, event.pointerId)
      }
    }
    const handleTrackClick = (event: MouseEvent) => {
      if (!available() || event.button !== 0) {
        return
      }
      cancelDrag()
      if (!available() || drag) {
        return
      }
      const thumb = thumbRef.value
      const track = trackRef.value
      if (!thumb || !track) {
        return
      }
      const token = generation
      const map = thumbMap.value
      event.preventDefault()
      const leading = thumb.getBoundingClientRect()[map.direction]
      const next = getLegalOffset(
        event[map.client] > leading
          ? offset.value + (props.data?.thumbSize ?? 0)
          : offset.value - (props.data?.thumbSize ?? 0),
      )
      if (!available() || token !== generation || thumbRef.value !== thumb || trackRef.value !== track) {
        return
      }
      if (next !== offset.value) {
        offset.value = next
        if (available() && token === generation) {
          emit('scroll', next)
        }
      }
    }
    const setOffset = (value: number) => {
      if (!available() || drag) {
        return
      }
      const token = generation
      const next = getLegalOffset(value)
      if (available() && token === generation && !drag && next !== offset.value) {
        offset.value = next
      }
    }
    watch(
      [() => props.orientation, () => props.data?.max, () => props.data?.thumbSize, () => props.data?.ratio],
      cancelDrag,
      { flush: 'sync' },
    )
    onDeactivated(() => {
      active = false
      cancelDrag()
    })
    onBeforeUnmount(() => {
      disposed = true
      active = false
      cancelDrag()
    })
    onActivated(() => {
      if (!disposed && !active) {
        active = true
        generation++
      }
    })

    const thumbCls = computed(() => [
      `${prefixCls}-thumb`,
      `${prefixCls}-thumb-direction-${props.orientation}`,
      {
        [`${prefixCls}-thumb-dragging`]: isDragging.value,
      },
    ])

    return {
      visible,
      trackRef,
      thumbRef,
      prefixCls,
      thumbCls,
      thumbStyle,
      handleThumbMouseDown,
      handleThumbPointerDown,
      handleTrackClick,
      setOffset,
    }
  },
})
</script>
