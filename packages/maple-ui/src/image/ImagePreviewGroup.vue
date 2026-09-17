<template>
  <slot />
  <ImagePreview
    v-if="previewImages.length"
    ref="previewRef"
    v-bind="previewBindings"
    v-model:open="mergedOpen"
    :src="currentUrl"
    @prev="prev"
    @next="next"
    @open="$emit('open')"
    @opened="$emit('opened')"
    @close="$emit('close')"
    @closed="$emit('closed')"
    @key-escape="$emit('key-escape')"
    @long-press="$emit('long-press', mergedCurrent)"
  >
    <template #image="{ scale, rotate, translateX, translateY, moving, previewedImgProps }">
      <div
        :class="[n('track'), { [n('track-moving')]: moving && scale <= 1, [n('track-instant')]: trackInstant }]"
        data-image-preview-track
        :style="trackStyle(translateX, scale)"
        @transitionend="handleTrackTransitionEnd"
      >
        <div
          v-for="(image, index) in trackImages"
          :key="`${index}-${image}`"
          :class="n('slide')"
          data-image-preview-slide
        >
          <img
            v-bind="previewedImgProps"
            role="img"
            data-image-preview-image
            :src="image"
            :alt="previewedImgProps?.alt || image"
            :class="[previewedImgProps?.class, n('image'), { [n('--prevent')]: imagePreventDefault }]"
            :style="[previewedImgProps?.style, slideImageStyle(index, scale, rotate, translateX, translateY)]"
            :draggable="false"
            @click.stop
            @dragstart.prevent
            @contextmenu="imagePreventDefault && $event.preventDefault()"
          />
        </div>
      </div>
    </template>
    <template v-if="$slots['close-icon']" #close-icon><slot name="close-icon" /></template>
    <template #overlay>
      <button
        v-if="previewImages.length > 1"
        type="button"
        :class="n('arrow-left')"
        data-image-preview-arrow-left
        data-image-preview-interactive
        :disabled="!loop && mergedCurrent === 0"
        aria-label="Previous image"
        @click="prev"
      >
        ‹
      </button>
      <button
        v-if="previewImages.length > 1"
        type="button"
        :class="n('arrow-right')"
        data-image-preview-arrow-right
        data-image-preview-interactive
        :disabled="!loop && mergedCurrent === previewImages.length - 1"
        aria-label="Next image"
        @click="next"
      >
        ›
      </button>
      <slot name="indicator" :index="mergedCurrent" :length="previewImages.length">
        <div v-if="previewImages.length > 1" :class="n('indicator')">
          {{ mergedCurrent + 1 }} / {{ previewImages.length }}
        </div>
      </slot>
    </template>
    <template v-if="$slots.extra" #extra><slot name="extra" :url="currentUrl" /></template>
    <template v-if="$slots.actions" #actions><slot name="actions" :url="currentUrl" /></template>
  </ImagePreview>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, onBeforeUnmount, provide, ref, toRef, watch } from 'vue'
import { createNamespace } from '../utils/components'
import type { ImagePreviewInstance } from './api'
import { useImagePreviewGroupState } from './composables/useImagePreviewGroup'
import { PreviewGroupInjectionKey } from './context'
import { imagePreviewGroupProps } from './groupProps'
import ImagePreview from './ImagePreview.vue'

const { name, n } = createNamespace('image-preview')

export default defineComponent({
  name: createNamespace('image-preview-group').name,
  components: { ImagePreview },
  inheritAttrs: false,
  props: imagePreviewGroupProps,
  emits: [
    'update:open',
    'update:current',
    'change',
    'open-change',
    'open',
    'opened',
    'close',
    'closed',
    'key-escape',
    'long-press',
  ],
  setup(props, { emit }) {
    const previousIndex = ref(props.defaultCurrent)
    const group = useImagePreviewGroupState({
      images: toRef(props, 'images'),
      open: toRef(props, 'open'),
      defaultOpen: props.defaultOpen,
      current: toRef(props, 'current'),
      defaultCurrent: props.defaultCurrent,
      onOpenChange: (open) => {
        emit('update:open', open)
        emit('open-change', open)
        props.onOpenChange?.(open)
      },
      onCurrentChange: (index) => {
        const previous = previousIndex.value
        previousIndex.value = index
        emit('update:current', index)
        emit('change', index, previous)
      },
    })
    const previewRef = ref<ImagePreviewInstance>()
    const currentUrl = computed(() => group.previewImages.value[group.mergedCurrent.value])
    const visualCurrent = ref(0)
    const trackInstant = ref(false)
    const trackImages = computed(() =>
      props.loop && group.previewImages.value.length > 1
        ? [...group.previewImages.value, ...group.previewImages.value, ...group.previewImages.value]
        : group.previewImages.value,
    )
    let recenterTimer: ReturnType<typeof setTimeout> | undefined
    let releaseFrame: number | undefined
    let paintFrame: number | undefined
    const previewBindings = computed(() => {
      const { images, current, defaultCurrent, loop, open, defaultOpen, ...shared } = props
      return shared
    })

    provide(PreviewGroupInjectionKey, { registerImageUrl: group.registerImageUrl, preview: group.previewByImageId })

    function canonicalVisual(index = group.mergedCurrent.value) {
      const length = group.previewImages.value.length
      return props.loop && length > 1 ? length + index : index
    }
    function setVisualInstant(index = group.mergedCurrent.value) {
      if (releaseFrame !== undefined) {
        cancelAnimationFrame(releaseFrame)
      }
      if (paintFrame !== undefined) {
        cancelAnimationFrame(paintFrame)
      }
      trackInstant.value = true
      visualCurrent.value = canonicalVisual(index)
      nextTick(() => {
        if (typeof requestAnimationFrame !== 'function') {
          trackInstant.value = false
          return
        }
        releaseFrame = requestAnimationFrame(() => {
          paintFrame = requestAnimationFrame(() => {
            trackInstant.value = false
            releaseFrame = undefined
            paintFrame = undefined
          })
        })
      })
    }
    function needsRecenter() {
      const length = group.previewImages.value.length
      return props.loop && length > 1 && (visualCurrent.value < length || visualCurrent.value >= length * 2)
    }
    function recenterIfNeeded() {
      if (!needsRecenter()) {
        return
      }
      if (recenterTimer) {
        clearTimeout(recenterTimer)
      }
      recenterTimer = undefined
      setVisualInstant()
    }
    function scheduleRecenter() {
      if (recenterTimer) {
        clearTimeout(recenterTimer)
      }
      if (!needsRecenter()) {
        return
      }
      recenterTimer = setTimeout(recenterIfNeeded, 400)
    }
    function handleTrackTransitionEnd(event: TransitionEvent) {
      if (event.target !== event.currentTarget || event.propertyName !== 'transform') {
        return
      }
      recenterIfNeeded()
    }

    watch(
      () => group.previewImages.value.length,
      () => setVisualInstant(),
      { immediate: true },
    )
    watch(group.mergedCurrent, (index) => {
      const length = group.previewImages.value.length
      const represented = length ? ((visualCurrent.value % length) + length) % length : 0
      if (represented !== index) {
        setVisualInstant(index)
      }
    })
    onBeforeUnmount(() => {
      if (recenterTimer) {
        clearTimeout(recenterTimer)
      }
      if (releaseFrame !== undefined) {
        cancelAnimationFrame(releaseFrame)
      }
      if (paintFrame !== undefined) {
        cancelAnimationFrame(paintFrame)
      }
    })

    function trackStyle(translateX: number, scale: number) {
      const offset = scale <= 1 ? translateX : 0
      return { transform: `translate3d(calc(${-visualCurrent.value * 100}% + ${offset}px), 0, 0)` }
    }
    function slideImageStyle(index: number, scale: number, rotate: number, x: number, y: number) {
      const isCurrent = index === visualCurrent.value
      const panX = isCurrent && scale > 1 ? x : 0
      const panY = isCurrent && scale > 1 ? y : 0
      return { transform: `translate(${panX}px, ${panY}px) rotate(${rotate}deg) scale(${scale})` }
    }

    function to(index: number, direction?: 'prev' | 'next') {
      const length = group.previewImages.value.length
      if (!Number.isInteger(index) || index < 0 || index >= length) {
        return
      }
      if (index === group.mergedCurrent.value) {
        return
      }
      if (props.loop && group.previewImages.value.length > 1 && direction) {
        visualCurrent.value += direction === 'next' ? 1 : -1
      } else {
        visualCurrent.value = index
      }
      group.mergedCurrent.value = index
      previewRef.value?.reset()
      scheduleRecenter()
    }
    function open(index = 0) {
      to(index)
      group.open(index)
    }
    function close() {
      group.close()
    }
    function prev() {
      const index = group.mergedCurrent.value - 1
      if (index >= 0) {
        to(index, 'prev')
      } else if (props.loop && group.previewImages.value.length) {
        to(group.previewImages.value.length - 1, 'prev')
      }
    }
    function next() {
      const index = group.mergedCurrent.value + 1
      if (index < group.previewImages.value.length) {
        to(index, 'next')
      } else if (props.loop && group.previewImages.value.length) {
        to(0, 'next')
      }
    }
    function reset() {
      previewRef.value?.reset()
    }
    function zoomTo(scale: number) {
      previewRef.value?.zoomTo(scale)
    }
    function zoomIn() {
      previewRef.value?.zoomIn()
    }
    function zoomOut() {
      previewRef.value?.zoomOut()
    }
    function rotateLeft() {
      previewRef.value?.rotateLeft()
    }
    function rotateRight() {
      previewRef.value?.rotateRight()
    }
    function toggleFullscreen() {
      previewRef.value?.toggleFullscreen()
    }

    return {
      n,
      ...group,
      previewRef,
      currentUrl,
      trackImages,
      trackInstant,
      trackStyle,
      slideImageStyle,
      handleTrackTransitionEnd,
      previewBindings,
      open,
      close,
      prev,
      next,
      to,
      reset,
      zoomTo,
      zoomIn,
      zoomOut,
      rotateLeft,
      rotateRight,
      toggleFullscreen,
    }
  },
})
</script>
