<template>
  <mp-popup
    v-model:open="mergedOpen"
    mp-image-preview-cover
    :class="n('popup')"
    :transition="n('$-fade')"
    :mask="false"
    :mask-closable="mergedMaskClosable"
    :esc-to-close="mergedEscToClose"
    :lock-scroll="lockScroll"
    :popup-container="popupContainer"
    @open="$emit('open')"
    @close="$emit('close')"
    @closed="$emit('closed')"
    @opened="$emit('opened')"
    @key-escape="$emit('key-escape')"
    @route-change="$emit('route-change')"
  >
    <mp-carousel
      ref="carouselRef"
      :class="n('swipe')"
      mp-image-preview-cover
      :touchable="canSwipe"
      :indicator="indicator && mergedImages.length > 1"
      :current="mergedCurrent"
      :loop="mergedLoop"
      v-bind="$attrs"
      @change="onChange"
    >
      <template #default>
        <mp-carousel-item
          v-for="(image, idx) in mergedImages"
          :key="`${image}-${idx}`"
          :class="n('swipe-item')"
          mp-image-preview-cover
        >
          <div
            :class="n('zoom-container')"
            :style="{
              transform: `scale(${scale}) translate(${translateX}px, ${translateY}px)`,
              transitionTimingFunction,
              transitionDuration,
            }"
            @touchstart="handleTouchstart($event, idx)"
            @touchmove="handleTouchmove"
            @touchend="handleTouchend"
            @touchcancel="handleTouchcancel"
          >
            <img
              role="img"
              :class="classes(n('image'), [isPreventDefault, n('--prevent')])"
              :src="image"
              :alt="image"
            />
          </div>
        </mp-carousel-item>
      </template>

      <template #indicator="{ index, length }">
        <slot name="indicator" :index="index" :length="length">
          <div v-if="indicator && mergedImages.length > 1" :class="n('indicators')">{{ index + 1 }} / {{ length }}</div>
        </slot>
      </template>
    </mp-carousel>

    <slot name="close-icon">
      <mp-icon v-if="mergedCloseable" :class="n('close-icon')" mp-image-preview-cover @click="close"
        ><MIconCloseCircle
      /></mp-icon>
    </slot>

    <div v-if="$slots.extra" :class="n('extra')">
      <slot name="extra" />
    </div>
  </mp-popup>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import { IconCloseCircle as MIconCloseCircle } from '@maplejs/icons-vue'
import { call, clamp, preventDefault, toNumber } from '@maplejs/maple-shared'
import { useEventListener, useTouch } from '@maplejs/maple-use'
import MpCarousel from '../carousel'
import MpCarouselItem from '../carousel-item'
import { type CarouselToOptions } from '../carousel/props'
import MpIcon from '../icon'
import MpPopup from '../popup'
import { createNamespace } from '../utils/components'
import { imagePlatformConfig } from './platform.config'
import { props } from './previewProps'
import { getPreviewCurrent, getPreviewImages } from './utils/previewUtils'

const { name, n, classes } = createNamespace('image-preview')

const DISTANCE_OFFSET = 12
const EVENT_DELAY = 200
const TAP_DELAY = 350
const ANIMATION_DURATION = 200
const LONG_PRESS_DELAY = 500
const BASE_RATIO = 1

export default defineComponent({
  name,
  components: {
    MIconCloseCircle,
    MpCarousel,
    MpCarouselItem,
    MpPopup,
    MpIcon,
  },
  inheritAttrs: false,
  props,
  emits: [
    'update:open',
    'update:current',
    'open-change',
    'open',
    'opened',
    'close',
    'closed',
    'key-escape',
    'route-change',
    'long-press',
    'change',
  ],
  setup(props, { emit }) {
    const mergedOpen = computed({
      get() {
        return props.open ?? false
      },
      set(value: boolean) {
        emit('update:open', value)
        emit('open-change', value)
      },
    })

    const mergedImages = computed(() => getPreviewImages(props))
    const mergedCurrent = ref(getPreviewCurrent(props.current))
    watch(
      () => props.current,
      (current) => {
        mergedCurrent.value = getPreviewCurrent(current)
      },
    )
    const mergedCloseable = computed(() => props.closable ?? imagePlatformConfig.defaultClosable)
    const mergedMaskClosable = computed(() => props.maskClosable ?? imagePlatformConfig.defaultMaskClosable)
    const mergedEscToClose = computed(() => props.escToClose ?? true)
    const mergedLoop = computed(() => props.loop ?? imagePlatformConfig.defaultLoop)

    const scale = ref(1)
    const translateX = ref(0)
    const translateY = ref(0)
    const transitionTimingFunction = ref<string | undefined>()
    const transitionDuration = ref<string | undefined>()
    const canSwipe = ref(true)
    const carouselRef = ref<InstanceType<typeof MpCarousel> | null>(null)
    const { moveX, moveY, distance, startTime, startTouch, moveTouch, endTouch } = useTouch()
    const isPreventDefault = computed(() => {
      const { imagePreventDefault } = props
      return mergedOpen.value && imagePreventDefault
    })

    let closeRunner: number | null = null
    let longPressRunner: number | null = null
    let isLongPress = false
    const targets: Record<string, HTMLElement | null> = {
      start: null,
      prev: null,
    }

    watch(mergedCurrent, (index) => {
      carouselRef.value?.to(index)
    })

    useEventListener(() => document, 'contextmenu', preventImageDefault)

    function zoomIn(ratio: number | string) {
      scale.value = toNumber(ratio)
      canSwipe.value = false
      targets.prev = null

      window.setTimeout(() => {
        transitionTimingFunction.value = 'linear'
        transitionDuration.value = '0s'
      }, ANIMATION_DURATION)
    }

    function zoomOut() {
      scale.value = 1
      translateX.value = 0
      translateY.value = 0
      canSwipe.value = true
      targets.prev = null
      transitionTimingFunction.value = undefined
      transitionDuration.value = undefined
    }

    function isDoubleTouch(target: HTMLElement) {
      if (!targets.prev) {
        return false
      }

      return (
        distance.value <= DISTANCE_OFFSET &&
        performance.now() - startTime.value <= EVENT_DELAY &&
        targets.prev === target
      )
    }

    function isTapTouch(target: HTMLElement) {
      if (!target || !targets.start || !targets.prev) {
        return false
      }

      return (
        distance.value <= DISTANCE_OFFSET &&
        performance.now() - startTime.value < TAP_DELAY &&
        (target === targets.start || target.parentNode === targets.start)
      )
    }

    function handleTouchcancel() {
      endTouch()

      window.clearTimeout(longPressRunner as number)
      isLongPress = false
      targets.start = null
    }

    function handleTouchend(event: TouchEvent) {
      endTouch()

      window.clearTimeout(longPressRunner as number)

      if (isLongPress) {
        isLongPress = false
        return
      }

      const isTap = isTapTouch(event.target as HTMLElement)
      closeRunner = window.setTimeout(() => {
        isTap && close()
        targets.start = null
      }, EVENT_DELAY)
    }

    function handleTouchstart(event: TouchEvent, idx: number) {
      window.clearTimeout(closeRunner as number)
      window.clearTimeout(longPressRunner as number)

      const target = event.currentTarget as HTMLElement
      targets.start = target

      longPressRunner = window.setTimeout(() => {
        isLongPress = true
        emit('long-press', idx)
      }, LONG_PRESS_DELAY)

      if (isDoubleTouch(target)) {
        scale.value > BASE_RATIO ? zoomOut() : zoomIn(props.zoom)
        return
      }

      startTouch(event)
      targets.prev = target
    }

    function getZoom(target: HTMLElement) {
      const { offsetWidth, offsetHeight } = target
      const { naturalWidth, naturalHeight } = target.querySelector(`.${n('image')}`) as HTMLImageElement

      return {
        width: offsetWidth,
        height: offsetHeight,
        imageRadio: naturalHeight / naturalWidth,
        rootRadio: offsetHeight / offsetWidth,
        zoom: toNumber(props.zoom),
      }
    }

    function getLimitX(target: HTMLElement) {
      const { zoom, imageRadio, rootRadio, width, height } = getZoom(target)

      if (!imageRadio) {
        return 0
      }

      const displayWidth = imageRadio > rootRadio ? height / imageRadio : width

      return Math.max(0, (zoom * displayWidth - width) / 2) / zoom
    }

    function getLimitY(target: HTMLElement) {
      const { zoom, imageRadio, rootRadio, width, height } = getZoom(target)

      if (!imageRadio) {
        return 0
      }

      const displayHeight = imageRadio > rootRadio ? height : width * imageRadio

      return Math.max(0, (zoom * displayHeight - height) / 2) / zoom
    }

    function handleTouchmove(event: TouchEvent) {
      if (!targets.prev) {
        return
      }

      moveTouch(event)

      const target = event.currentTarget as HTMLElement

      if (distance.value > DISTANCE_OFFSET) {
        window.clearTimeout(longPressRunner as number)
      }

      if (scale.value > BASE_RATIO) {
        const limitX = getLimitX(target)
        const limitY = getLimitY(target)

        translateX.value = clamp(translateX.value + moveX.value, -limitX, limitX)
        translateY.value = clamp(translateY.value + moveY.value, -limitY, limitY)
      }

      targets.prev = target
    }

    function close() {
      if (scale.value > BASE_RATIO) {
        zoomOut()
        setTimeout(() => {
          mergedOpen.value = false
        }, ANIMATION_DURATION)
        return
      }

      mergedOpen.value = false
      emit('close')
    }

    function preventImageDefault(event: Event) {
      if (isPreventDefault.value) {
        preventDefault(event)
      }
    }

    function onChange(index: number) {
      mergedCurrent.value = index
      emit('update:current', index)
      emit('change', index)
    }

    function prev(options?: CarouselToOptions) {
      carouselRef.value?.prev(options)
    }

    function next(options?: CarouselToOptions) {
      carouselRef.value?.next(options)
    }

    function to(idx: number, options?: CarouselToOptions) {
      carouselRef.value?.to(idx, options)
    }

    function zoom(ratio: number) {
      ratio <= BASE_RATIO ? zoomOut() : zoomIn(ratio)
    }

    return {
      carouselRef,
      isPreventDefault,
      mergedOpen,
      mergedImages,
      mergedCurrent,
      mergedCloseable,
      mergedMaskClosable,
      mergedEscToClose,
      mergedLoop,
      scale,
      translateX,
      translateY,
      canSwipe,
      transitionTimingFunction,
      transitionDuration,
      n,
      classes,
      toNumber,
      handleTouchstart,
      handleTouchmove,
      handleTouchend,
      handleTouchcancel,
      close,
      onChange,
      prev,
      next,
      to,
      zoom,
    }
  },
})
</script>

<style lang="less">
@import '../styles/common';
@import '../icon/icon';
@import '../carousel/carousel';
@import '../carousel-item/carouselItem';
@import '../popup/popup';
@import './imagePreview';
</style>
