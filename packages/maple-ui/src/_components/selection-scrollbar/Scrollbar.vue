<template>
  <div :class="cls" :style="style">
    <ResizeObserver @resize="handleResize">
      <div ref="containerRef" :class="`${prefixCls}-container`" v-bind="$attrs" @scroll="handleScroll">
        <ResizeObserver @resize="handleResize">
          <slot />
        </ResizeObserver>
      </div>
    </ResizeObserver>
    <thumb
      v-if="!hide && hasHorizontalScrollbar"
      ref="horizontalThumbRef"
      :data="horizontalData"
      orientation="horizontal"
      :both="isBoth"
      @scroll="handleHorizontalScroll"
    />
    <thumb
      v-if="!hide && hasVerticalScrollbar"
      ref="verticalThumbRef"
      :data="verticalData"
      orientation="vertical"
      :both="isBoth"
      @scroll="handleVerticalScroll"
    />
  </div>
</template>

<script lang="ts">
import {
  computed,
  CSSProperties,
  defineComponent,
  onActivated,
  onBeforeUnmount,
  onDeactivated,
  onMounted,
  PropType,
  ref,
  StyleValue,
  watch,
} from 'vue'
import { nativeScrollLeft, physicalScrollLeft, useDirection } from '../../_utils/direction'
import { isObject } from '../../_utils/is'
import { createNamespace, getPrefixCls } from '../../utils/components'
import ResizeObserver from '../resize-observer-v2'
import { scrollbarProps } from './props'
import Thumb from './Thumb.vue'
import { ThumbData } from './types'

const THUMB_MIN_SIZE = 20
const TRACK_SIZE = 15

export default defineComponent({
  name: createNamespace('scrollbar').name,
  components: {
    ResizeObserver,
    Thumb,
  },
  inheritAttrs: false,
  props: scrollbarProps,
  emits: {
    /**
     * @zh 滚动时触发
     * @en Triggered when scroll
     */
    scroll: (ev: Event) => true,
  },
  setup(props, { emit }) {
    const prefixCls = getPrefixCls('scrollbar')

    const containerRef = ref<HTMLElement>()
    const { dir } = useDirection(() => containerRef.value)
    const horizontalData = ref<ThumbData>()
    const verticalData = ref<ThumbData>()
    const horizontalThumbRef = ref()
    const verticalThumbRef = ref()
    const _hasHorizontalScrollbar = ref(false)
    const _hasVerticalScrollbar = ref(false)
    const hasHorizontalScrollbar = computed(() => _hasHorizontalScrollbar.value && !props.disableHorizontal)
    const hasVerticalScrollbar = computed(() => _hasVerticalScrollbar.value && !props.disableVertical)
    const isBoth = ref(false)

    let active = true
    let disposed = false
    let operation = 0
    const binding = ref(0)
    const available = () => active && !disposed
    const current = (token: number, element: HTMLElement) =>
      available() && token === operation && containerRef.value === element
    function axisData(client: number, track: number, content: number): ThumbData {
      if (![client, track, content].every(Number.isFinite) || client <= 0 || track <= 0 || content <= client) {
        return { ratio: 1, thumbSize: Number.isFinite(track) ? Math.max(0, track) : 0, max: 0 }
      }
      const thumbSize = Math.min(track, Math.round(track / Math.min(content / client, track / THUMB_MIN_SIZE)))
      const max = Math.max(0, track - thumbSize)
      return { ratio: max > 0 ? (content - client) / max : 1, thumbSize, max }
    }
    const thumbOffset = (value: number, data: ThumbData) =>
      Math.max(0, Math.min(data.max, Math.round((Number.isFinite(value) ? value : 0) / data.ratio)))
    const getContainerSize = () => {
      const element = containerRef.value
      if (!available() || !element) {
        return
      }
      const token = ++operation
      const { clientWidth, clientHeight, offsetWidth, offsetHeight, scrollWidth, scrollHeight, scrollTop, scrollLeft } =
        element
      if (!current(token, element)) {
        return
      }
      const horizontal = clientWidth > 0 && offsetWidth > 0 && scrollWidth > clientWidth
      const vertical = clientHeight > 0 && offsetHeight > 0 && scrollHeight > clientHeight
      const both = horizontal && !props.disableHorizontal && vertical && !props.disableVertical
      const hData = axisData(
        clientWidth,
        props.type === 'embed' && both ? offsetWidth - TRACK_SIZE : offsetWidth,
        scrollWidth,
      )
      const vData = axisData(
        clientHeight,
        props.type === 'embed' && both ? offsetHeight - TRACK_SIZE : offsetHeight,
        scrollHeight,
      )
      _hasHorizontalScrollbar.value = horizontal
      if (!current(token, element)) {
        return
      }
      _hasVerticalScrollbar.value = vertical
      if (!current(token, element)) {
        return
      }
      isBoth.value = both
      if (!current(token, element)) {
        return
      }
      horizontalData.value = hData
      if (!current(token, element)) {
        return
      }
      verticalData.value = vData
      if (!current(token, element)) {
        return
      }
      // Zero is a real position; do not leave a stale thumb at the previous offset.
      verticalThumbRef.value?.setOffset(thumbOffset(scrollTop, vData))
      if (!current(token, element)) {
        return
      }
      const horizontalOffset = physicalScrollLeft(element)
      if (!current(token, element)) {
        return
      }
      horizontalThumbRef.value?.setOffset(thumbOffset(horizontalOffset, hData))
    }
    const handleResize = computed(() => {
      const epoch = binding.value
      return () => {
        if (available() && epoch === binding.value) {
          getContainerSize()
        }
      }
    })
    const handleScroll = computed(() => {
      const epoch = binding.value
      return (event: Event) => {
        const element = containerRef.value
        if (!available() || epoch !== binding.value || !element) {
          return
        }
        const token = ++operation
        if (hasHorizontalScrollbar.value && horizontalData.value) {
          const offset = thumbOffset(physicalScrollLeft(element), horizontalData.value)
          if (!current(token, element)) {
            return
          }
          horizontalThumbRef.value?.setOffset(offset)
        }
        if (!current(token, element)) {
          return
        }
        if (hasVerticalScrollbar.value && verticalData.value) {
          const offset = thumbOffset(element.scrollTop, verticalData.value)
          if (!current(token, element)) {
            return
          }
          verticalThumbRef.value?.setOffset(offset)
        }
        if (current(token, element)) {
          emit('scroll', event)
        }
      }
    })
    const handleHorizontalScroll = computed(() => {
      const epoch = binding.value
      return (offset: number) => {
        if (available() && epoch === binding.value && !props.hide && hasHorizontalScrollbar.value) {
          const token = ++operation
          const element = containerRef.value
          if (!element) {
            return
          }
          const left = nativeScrollLeft(element, offset * (horizontalData.value?.ratio ?? 1))
          if (current(token, element)) {
            element.scrollTo({ left })
          }
        }
      }
    })
    const handleVerticalScroll = computed(() => {
      const epoch = binding.value
      return (offset: number) => {
        if (available() && epoch === binding.value && !props.hide && hasVerticalScrollbar.value) {
          operation++
          containerRef.value?.scrollTo({ top: offset * (verticalData.value?.ratio ?? 1) })
        }
      }
    })
    function scrollTo(options?: number | { left?: number; top?: number }, y?: number) {
      if (!available()) {
        return
      }
      operation++
      if (isObject(options)) {
        containerRef.value?.scrollTo(options)
      } else if (typeof options === 'number' || typeof y === 'number') {
        containerRef.value?.scrollTo(options ?? 0, y ?? 0)
      }
    }
    function scrollTop(top: number) {
      if (available()) {
        operation++
        containerRef.value?.scrollTo({ top })
      }
    }
    function scrollLeft(left: number) {
      if (available()) {
        operation++
        containerRef.value?.scrollTo({ left })
      }
    }
    function suspend() {
      active = false
      operation++
      binding.value++
    }
    watch(dir, getContainerSize, { flush: 'post' })
    onMounted(getContainerSize)
    onDeactivated(suspend)
    onBeforeUnmount(() => {
      disposed = true
      suspend()
    })
    onActivated(() => {
      if (!disposed && !active) {
        active = true
        operation++
        binding.value++
        getContainerSize()
      }
    })

    const style = computed(() => {
      const style: CSSProperties = {}
      if (props.type === 'track') {
        if (hasHorizontalScrollbar.value) {
          style.paddingBottom = `${TRACK_SIZE}px`
        }
        if (hasVerticalScrollbar.value) {
          style.paddingRight = `${TRACK_SIZE}px`
        }
      }
      return [style, props.outerStyle]
    })

    const cls = computed(() => [
      `${prefixCls}`,
      `${prefixCls}-type-${props.type}`,
      {
        [`${prefixCls}-both`]: isBoth.value,
      },
      props.outerClass,
    ])

    return {
      prefixCls,
      cls,
      style,
      containerRef,
      horizontalThumbRef,
      verticalThumbRef,
      horizontalData,
      verticalData,
      isBoth,
      hasHorizontalScrollbar,
      hasVerticalScrollbar,
      handleResize,
      handleScroll,
      handleHorizontalScroll,
      handleVerticalScroll,
      scrollTo,
      scrollTop,
      scrollLeft,
    }
  },
})
</script>
