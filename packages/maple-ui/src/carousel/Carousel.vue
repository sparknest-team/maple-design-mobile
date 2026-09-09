<template>
  <div
    ref="carouselEl"
    v-hover="handleHovering"
    :class="
      classes(
        n(),
        [effect === 'fade', n('--fade')],
        [effect === 'card', n('--card')],
        [height, n('--custom-height')],
        [indicator && indicatorPosition === 'outer' && !vertical, n('--outer')],
        [indicator && indicatorPosition === 'outer' && vertical, n('--outer-vertical')],
      )
    "
    :style="height ? { height: toSizeUnit(height) } : undefined"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- Track (only for slide/card effect) -->
    <div
      v-if="effect !== 'fade'"
      :class="classes(n('track'), [vertical, n('--vertical')])"
      :style="{
        width: !vertical ? toSizeUnit(trackSize) : undefined,
        height: vertical ? toSizeUnit(trackSize) : undefined,
        transform: `translate${vertical ? 'Y' : 'X'}(${toSizeUnit(trackTranslate)})`,
        transitionDuration: lockDuration ? '0ms' : `${toNumber(moveSpeed)}ms`,
        transitionTimingFunction: transitionTimingFunction,
        gap: spaceBetween ? toSizeUnit(spaceBetween) : undefined,
      }"
      @touchstart="handleTouchstart"
      @touchmove="handleTouchmove"
      @touchend="handleTouchend"
      @mousedown="handleMousedown"
      @wheel="handleWheel"
    >
      <slot />
    </div>

    <!-- Fade container -->
    <div
      v-if="effect === 'fade'"
      :class="n('fade-container')"
      @touchstart="handleTouchstart"
      @touchmove="handleTouchmove"
      @touchend="handleTouchend"
      @mousedown="handleMousedown"
      @wheel="handleWheel"
    >
      <slot />
    </div>

    <!-- Prev Navigation -->
    <slot
      v-if="showArrow !== 'never'"
      name="prev"
      v-bind="{
        index,
        length,
        prev,
        next,
        to,
        hovering,
      }"
    >
      <transition :name="getNavigationAnimation('prev')">
        <div
          v-if="showArrow === 'always' || hovering"
          :class="classes(n('navigation'), n('navigation-prev'), [vertical, n('--navigation-vertical-prev')])"
        >
          <button
            type="button"
            :disabled="!loop && index === 0"
            :class="classes(n('navigation-button'), n('navigation-prev-button'), arrowClass)"
            @click="prev({ event: true, isManual: true })"
          >
            <MIconChevronUp v-if="vertical" />
            <MIconChevronLeft v-else />
          </button>
        </div>
      </transition>
    </slot>

    <!-- Next Navigation -->
    <slot
      v-if="showArrow !== 'never'"
      name="next"
      v-bind="{
        index,
        length,
        prev,
        next,
        to,
        hovering,
      }"
    >
      <transition :name="getNavigationAnimation('next')">
        <div
          v-if="showArrow === 'always' || hovering"
          :class="classes(n('navigation'), n('navigation-next'), [vertical, n('--navigation-vertical-next')])"
        >
          <button
            type="button"
            :disabled="!loop && index === length - 1"
            :class="classes(n('navigation-button'), n('navigation-next-button'), arrowClass)"
            @click="next({ event: true, isManual: true })"
          >
            <MIconChevronDown v-if="vertical" />
            <MIconChevronRight v-else />
          </button>
        </div>
      </transition>
    </slot>

    <!-- Indicator -->
    <slot
      name="indicator"
      v-bind="{
        index,
        length,
        hovering,
        prev,
        next,
        to,
      }"
    >
      <div
        v-if="indicator && length"
        :class="
          classes(
            n('indicators'),
            indicatorClass,
            [vertical || indicatorPosition === 'left' || indicatorPosition === 'right', n('--indicators-vertical')],
            [indicatorPosition === 'top', n('--indicators-top')],
            [indicatorPosition === 'left', n('--indicators-left')],
            [indicatorPosition === 'right', n('--indicators-right')],
            [indicatorPosition === 'outer', n('--indicators-outer')],
          )
        "
      >
        <div
          v-for="(l, idx) in length"
          :key="l"
          :class="
            classes(
              n('indicator'),
              [indicatorType === 'line', n('--indicator-line')],
              [index === idx, n('--indicator-active')],
              [vertical || indicatorPosition === 'left' || indicatorPosition === 'right', n('--indicator-vertical')],
            )
          "
          :style="{
            background: indicatorColor,
            ...(indicatorType === 'slider' && index === idx ? { width: '16px' } : {}),
          }"
          @click="trigger === 'click' && to(idx)"
          @mouseenter="trigger === 'hover' && to(idx)"
        ></div>
      </div>
    </slot>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onActivated, onMounted, ref, watch } from 'vue'
import {
  IconChevronDown as MIconChevronDown,
  IconChevronLeft as MIconChevronLeft,
  IconChevronRight as MIconChevronRight,
  IconChevronUp as MIconChevronUp,
} from '@maplejs/icons-vue'
import { call, clamp, doubleRaf, isNumber, preventDefault, toNumber } from '@maplejs/maple-shared'
import { onSmartUnmounted, onWindowResize, useEventListener, useTouch, useVModel } from '@maplejs/maple-use'
import Hover from '../hover'
import { usePopup } from '../popup/provide'
import { createNamespace } from '../utils/components'
import { toSizeUnit } from '../utils/elements'
import { type CarouselItemProvider } from './item-provide'
import { props, type CarouselToOptions } from './props'
import { useCarouselItems, useCarouselResizeListeners, type CarouselProvider } from './provide'

const SWIPE_DELAY = 250
const SWIPE_OFFSET = 20

const { name, n, classes } = createNamespace('carousel')

export default defineComponent({
  name,
  directives: { Hover },
  components: {
    MIconChevronUp,
    MIconChevronLeft,
    MIconChevronDown,
    MIconChevronRight,
  },
  props,
  emits: ['change', 'update:current'],
  setup(props, { emit }) {
    const carouselEl = ref<HTMLElement | null>(null)
    const size = ref(0)
    const vertical = computed(() => props.direction === 'vertical')
    const trackSize = ref(0)
    const trackTranslate = ref(0)
    const lockDuration = ref(false)
    const index = ref(0)
    const hovering = ref(false)
    const isDragging = ref(false)
    const dragStartX = ref(0)
    const dragStartY = ref(0)
    const dragTranslate = ref(0)
    const { carouselItems, bindCarouselItems, length } = useCarouselItems()
    const { carouselResizeListeners, bindCarouselResizeListeners } = useCarouselResizeListeners()
    const { popup, bindPopup } = usePopup()
    const {
      deltaX,
      deltaY,
      moveX,
      moveY,
      offsetX,
      offsetY,
      touching,
      direction,
      startTime,
      startTouch,
      moveTouch,
      endTouch,
    } = useTouch()
    const isExpectDirection = computed(() => direction.value === props.direction)

    const showArrow = computed(() => props.showArrow)

    const slideSize = computed(() => {
      if (props.slidesPerView === 'auto') {
        return size.value
      }
      return size.value / Math.max(1, toNumber(props.slidesPerView))
    })

    const currentIndexModel = useVModel(props, 'current', { emit, eventName: 'update:current' })

    const activeIndex = computed({
      get: () => currentIndexModel.value ?? index.value,
      set: (val: number) => {
        if (props.current !== undefined) {
          currentIndexModel.value = val
        }
        index.value = val
      },
    })

    let initializedIndex = false
    let timer = -1
    const carouselProvider: CarouselProvider = {
      size,
      currentIndex: activeIndex,
      vertical,
      effect: computed(() => props.effect),
      loop: computed(() => props.loop),
      length,
    }

    bindCarouselItems(carouselProvider)

    useEventListener(() => window, 'keydown', handleKeydown)

    call(bindPopup, null)
    call(bindCarouselResizeListeners, null)

    watch(
      () => length.value,
      async () => {
        await doubleRaf()

        initIndex()
        resize()
      },
    )

    if (popup) {
      watch(
        () => popup.open.value,
        async (show) => {
          if (show) {
            await doubleRaf()
            resize()
          } else {
            stopAutoplay()
          }
        },
      )
    }

    onActivated(resize)
    onMounted(resize)
    onSmartUnmounted(stopAutoplay)
    onWindowResize(resize)

    function findCarouselItem(idx: number) {
      return carouselItems.find(({ index }) => index.value === idx) as CarouselItemProvider
    }

    function getItemOffset(idx: number) {
      const sp = toNumber(props.spaceBetween)
      const sv = props.slidesPerView === 'auto' ? size.value : slideSize.value
      let offset = idx * (sv + sp)

      if (props.centeredSlides && props.slidesPerView !== 'auto') {
        const totalVisible = toNumber(props.slidesPerView)
        const visibleWidth = totalVisible * sv + (totalVisible - 1) * sp
        offset = idx * (sv + sp) - (size.value - visibleWidth) / 2
      }

      return offset
    }

    function dispatchCarouselItems() {
      if (!props.loop || length.value <= 1) {
        return
      }

      const sp = toNumber(props.spaceBetween)
      const sv = props.slidesPerView === 'auto' ? size.value : slideSize.value
      const totalSlideSize = length.value * (sv + sp) - sp

      if (trackTranslate.value >= 0) {
        findCarouselItem(length.value - 1).setTranslate(-trackSize.value)
      }

      if (trackTranslate.value <= -(trackSize.value - size.value)) {
        findCarouselItem(0).setTranslate(trackSize.value)
      }

      if (trackTranslate.value > -(trackSize.value - size.value) && trackTranslate.value < 0) {
        findCarouselItem(length.value - 1).setTranslate(0)
        findCarouselItem(0).setTranslate(0)
      }
    }

    function getCarouselIndex(targetCarouselIndex?: number) {
      const sv = props.slidesPerView === 'auto' ? size.value : slideSize.value
      const sp = toNumber(props.spaceBetween)
      const carouselIndex = isNumber(targetCarouselIndex)
        ? targetCarouselIndex
        : Math.floor((trackTranslate.value - (sv + sp) / 2) / -(sv + sp))

      const { loop } = props

      if (carouselIndex <= -1) {
        return loop ? -1 : 0
      }

      if (carouselIndex >= length.value) {
        return loop ? length.value : length.value - 1
      }

      return carouselIndex
    }

    function carouselIndexToIndex(carouselIndex: number) {
      const { loop } = props

      if (carouselIndex === -1) {
        return loop ? length.value - 1 : 0
      }

      if (carouselIndex === length.value) {
        return loop ? 0 : length.value - 1
      }

      return carouselIndex
    }

    function clampIndex(index: number) {
      if (props.loop) {
        if (index < 0) {
          return length.value + index
        }

        if (index >= length.value) {
          return index - length.value
        }

        return index
      }

      return clamp(index, 0, length.value - 1)
    }

    async function fixPosition() {
      const sv = props.slidesPerView === 'auto' ? size.value : slideSize.value
      const sp = toNumber(props.spaceBetween)
      const overLeft = trackTranslate.value >= sv + sp
      const overRight = trackTranslate.value <= -trackSize.value
      const leftTranslate = 0
      const rightTranslate = -(trackSize.value - size.value)

      lockDuration.value = true

      if (overLeft || overRight) {
        trackTranslate.value = overRight ? leftTranslate : rightTranslate
        findCarouselItem(0).setTranslate(0)
        findCarouselItem(length.value - 1).setTranslate(0)
      }

      await doubleRaf()
      lockDuration.value = false
    }

    function initIndex() {
      if (initializedIndex) {
        return
      }

      const startIndex = props.current !== undefined ? toNumber(props.current) : toNumber(props.defaultCurrent)
      index.value = clampIndex(startIndex)
      initializedIndex = true
    }

    const computedAutoPlay = computed(() => {
      const { autoPlay } = props
      if (!autoPlay) {
        return { interval: 0, hoverToPause: false }
      }
      if (typeof autoPlay === 'object') {
        return { interval: toNumber(autoPlay.interval) || 3000, hoverToPause: autoPlay.hoverToPause ?? true }
      }
      const num = toNumber(autoPlay)
      return num && num > 0 ? { interval: num, hoverToPause: false } : { interval: 3000, hoverToPause: true }
    })

    function startAutoplay() {
      const { interval } = computedAutoPlay.value

      if (!interval || interval <= 0 || length.value <= 1) {
        return
      }

      stopAutoplay()

      timer = window.setTimeout(() => {
        next({ event: true, isManual: false })
        startAutoplay()
      }, interval)
    }

    function stopAutoplay() {
      timer && clearTimeout(timer)
      timer = -1
    }

    function handleMouseEnter() {
      if (computedAutoPlay.value.hoverToPause) {
        stopAutoplay()
      }
    }

    function handleMouseLeave() {
      if (computedAutoPlay.value.hoverToPause) {
        startAutoplay()
      }
    }

    async function handleTouchstart(event: TouchEvent) {
      if (length.value <= 1 || !props.touchable) {
        return
      }

      startTouch(event)
      stopAutoplay()
      await fixPosition()
      lockDuration.value = true
    }

    function handleTouchmove(event: TouchEvent) {
      const { touchable } = props

      if (!touching.value || !touchable) {
        return
      }

      moveTouch(event)

      if (!isExpectDirection.value) {
        return
      }

      preventDefault(event)
      trackTranslate.value += vertical.value ? moveY.value : moveX.value
      dispatchCarouselItems()
    }

    function handleTouchend() {
      if (!touching.value) {
        return
      }

      endTouch()

      if (!isExpectDirection.value) {
        return
      }

      const { onChange } = props
      const sv = props.slidesPerView === 'auto' ? size.value : slideSize.value
      const sp = toNumber(props.spaceBetween)

      const positive = vertical.value ? deltaY.value < 0 : deltaX.value < 0
      const offset = vertical.value ? offsetY.value : offsetX.value
      const quickSwiping = performance.now() - startTime.value <= SWIPE_DELAY && offset >= SWIPE_OFFSET
      const swipeIndex = quickSwiping
        ? positive
          ? getCarouselIndex(index.value + 1)
          : getCarouselIndex(index.value - 1)
        : getCarouselIndex()

      const targetIdx = carouselIndexToIndex(swipeIndex)
      const prevIdx = index.value
      index.value = targetIdx

      lockDuration.value = false

      if (swipeIndex === length.value && props.loop) {
        // Forward wrap: last → first — offset item 0 to end of track for seamless loop
        carouselItems.forEach((item) => item.setTranslate(0))
        findCarouselItem(0)?.setTranslate(trackSize.value)
        trackTranslate.value = length.value * -(sv + sp)
      } else if (swipeIndex === -1 && props.loop) {
        // Backward wrap: first → last — offset last item to start of track
        carouselItems.forEach((item) => item.setTranslate(0))
        findCarouselItem(length.value - 1)?.setTranslate(-trackSize.value)
        trackTranslate.value = sv + sp
      } else {
        trackTranslate.value = targetIdx * -(sv + sp)
        carouselItems.forEach((item) => item.setTranslate(0))
      }

      startAutoplay()

      if (prevIdx !== index.value) {
        emit('update:current', index.value)
        emit('change', index.value, prevIdx, true)
      }
    }

    function handleMousedown(event: MouseEvent) {
      if (length.value <= 1 || !props.draggable || props.touchable) {
        return
      }

      isDragging.value = true
      dragStartX.value = event.clientX
      dragStartY.value = event.clientY
      dragTranslate.value = trackTranslate.value
      stopAutoplay()

      const handleMousemove = (e: MouseEvent) => {
        if (!isDragging.value) {
          return
        }

        const diff = vertical.value ? e.clientY - dragStartY.value : e.clientX - dragStartX.value
        trackTranslate.value = dragTranslate.value + diff
        dispatchCarouselItems()
      }

      const handleMouseup = () => {
        if (!isDragging.value) {
          return
        }

        isDragging.value = false
        const diff = vertical.value
          ? (event as unknown as MouseEvent).clientY - dragStartY.value
          : (event as unknown as MouseEvent).clientX - dragStartX.value

        document.removeEventListener('mousemove', handleMousemove)
        document.removeEventListener('mouseup', handleMouseup)

        const sv = props.slidesPerView === 'auto' ? size.value : slideSize.value
        const sp = toNumber(props.spaceBetween)
        const { onChange } = props
        const positive = diff < 0
        const absDiff = Math.abs(diff)
        const quickSwiping = absDiff >= SWIPE_OFFSET
        const swipeIndex = quickSwiping
          ? positive
            ? getCarouselIndex(index.value + 1)
            : getCarouselIndex(index.value - 1)
          : getCarouselIndex()

        const targetIdx = carouselIndexToIndex(swipeIndex)
        const prevIdx = index.value
        index.value = targetIdx

        lockDuration.value = false
        trackTranslate.value = targetIdx * -(sv + sp)

        // Reset carousel item translates after drag to prevent blank on next drag
        carouselItems.forEach((item) => item.setTranslate(0))

        startAutoplay()

        if (prevIdx !== index.value) {
          emit('update:current', index.value)
          emit('change', index.value, prevIdx, true)
        }
      }

      document.addEventListener('mousemove', handleMousemove)
      document.addEventListener('mouseup', handleMouseup)
    }

    function handleWheel(event: WheelEvent) {
      if (!props.mousewheel || length.value <= 1) {
        return
      }

      preventDefault(event)

      const delta = event.deltaY

      if (Math.abs(delta) < 10) {
        return
      }

      if (delta > 0) {
        next()
      } else {
        prev()
      }
    }

    function handleHovering(value: boolean) {
      if (showArrow.value === 'hover') {
        hovering.value = value
      }
    }

    function getNavigationAnimation(type: 'prev' | 'next') {
      if (showArrow.value !== 'hover') {
        return ''
      }

      return n(`--navigation${vertical.value ? '-vertical' : ''}-${type}-animation`)
    }

    function handleKeydown(event: KeyboardEvent) {
      if (!props.keyboard || !carouselItems.length) {
        return
      }

      const focusingCarouselItemIndex = carouselItems.findIndex(({ isFocusing }) => isFocusing.value)
      if (focusingCarouselItemIndex === -1) {
        return
      }

      const { key } = event

      preventDefault(event)

      if (key === 'ArrowLeft' || key === 'ArrowUp') {
        prev()
      }

      if (key === 'ArrowRight' || key === 'ArrowDown') {
        next()
      }
    }

    // expose
    function resize() {
      if (!carouselEl.value) {
        return
      }

      lockDuration.value = true

      size.value = vertical.value ? carouselEl.value.offsetHeight : carouselEl.value.offsetWidth
      const sv = props.slidesPerView === 'auto' ? size.value : slideSize.value
      const sp = toNumber(props.spaceBetween)
      trackSize.value = length.value * (sv + sp) - sp
      trackTranslate.value = index.value * -(sv + sp)

      carouselItems.forEach((carouselItem) => {
        carouselItem.setTranslate(0)
      })

      startAutoplay()

      setTimeout(() => {
        lockDuration.value = false
      })

      carouselResizeListeners.forEach(({ onResize }) => {
        onResize()
      })
    }

    // expose
    async function next(options?: CarouselToOptions) {
      if (length.value <= 1) {
        return
      }

      initIndex()

      const { loop } = props
      const currentIndex = index.value
      index.value = clampIndex(currentIndex + 1)
      const sv = props.slidesPerView === 'auto' ? size.value : slideSize.value
      const sp = toNumber(props.spaceBetween)

      if (options?.event !== false) {
        emit('update:current', index.value)
        emit('change', index.value, currentIndex, options?.isManual ?? false)
      }

      await fixPosition()

      if (currentIndex === length.value - 1 && loop) {
        findCarouselItem(0).setTranslate(trackSize.value)
        trackTranslate.value = length.value * -(sv + sp)
        return
      }

      if (currentIndex !== length.value - 1) {
        trackTranslate.value = index.value * -(sv + sp)
      }
    }

    // expose
    async function prev(options?: CarouselToOptions) {
      if (length.value <= 1) {
        return
      }

      initIndex()

      const { loop } = props
      const currentIndex = index.value
      index.value = clampIndex(currentIndex - 1)
      const sv = props.slidesPerView === 'auto' ? size.value : slideSize.value
      const sp = toNumber(props.spaceBetween)

      if (options?.event !== false) {
        emit('update:current', index.value)
        emit('change', index.value, currentIndex, options?.isManual ?? false)
      }

      await fixPosition()

      if (currentIndex === 0 && loop) {
        findCarouselItem(length.value - 1).setTranslate(-trackSize.value)
        trackTranslate.value = sv + sp
        return
      }

      if (currentIndex !== 0) {
        trackTranslate.value = index.value * -(sv + sp)
      }
    }

    // expose
    function to(idx: number, options?: CarouselToOptions) {
      if (length.value <= 1 || idx === index.value) {
        return
      }

      idx = idx < 0 ? 0 : idx
      idx = idx >= length.value ? length.value : idx

      const task = idx > index.value ? next : prev
      const count = Math.abs(idx - index.value)

      Array.from({ length: count }).forEach((_, index) => {
        task({ event: index === count - 1 ? options?.event : false })
      })
    }

    return {
      length,
      index,
      activeIndex,
      vertical,
      carouselEl,
      trackSize,
      trackTranslate,
      lockDuration,
      hovering,
      showArrow,
      n,
      toSizeUnit,
      classes,
      handleTouchstart,
      handleTouchmove,
      handleTouchend,
      handleMousedown,
      handleWheel,
      handleMouseEnter,
      handleMouseLeave,
      next,
      prev,
      to,
      resize,
      toNumber,
      handleHovering,
      getNavigationAnimation,
    }
  },
})
</script>
