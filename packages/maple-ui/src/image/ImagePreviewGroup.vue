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
    @long-press="$emit('long-press', mergedCurrent + 1)"
  >
    <template #image="{ scale, rotate, translateX, translateY, moving, previewedImgProps }">
      <div
        ref="trackRef"
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
      <slot name="indicator" :image-number="mergedCurrent + 1" :length="previewImages.length">
        <div v-if="previewImages.length > 1" :class="n('indicator')" dir="ltr">
          {{ mergedCurrent + 1 }} / {{ previewImages.length }}
        </div>
      </slot>
    </template>
    <template v-if="$slots.extra" #extra><slot name="extra" :url="currentUrl" /></template>
    <template v-if="$slots.actions" #actions><slot name="actions" :url="currentUrl" /></template>
  </ImagePreview>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  nextTick,
  onActivated,
  onBeforeUnmount,
  onDeactivated,
  provide,
  ref,
  toRef,
  watch,
} from 'vue'
import { useDirection } from '../_utils/direction'
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
    'update:modelValue',
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
    const previousImageNumber = ref(props.modelValue ?? props.defaultValue)
    const group = useImagePreviewGroupState({
      images: toRef(props, 'images'),
      open: toRef(props, 'open'),
      defaultOpen: props.defaultOpen,
      modelValue: toRef(props, 'modelValue'),
      defaultValue: props.defaultValue,
      onOpenChange: (open) => {
        emit('update:open', open)
        emit('open-change', open)
      },
      onCurrentChange: (imageNumber) => {
        const previous = previousImageNumber.value
        previousImageNumber.value = imageNumber
        emit('update:modelValue', imageNumber)
        emit('change', imageNumber, previous)
      },
    })
    watch(
      () => props.modelValue,
      (value) => {
        if (value !== undefined) {
          previousImageNumber.value = value
        }
      },
      { flush: 'sync' },
    )
    const previewRef = ref<ImagePreviewInstance>()
    const currentUrl = computed(() => group.previewImages.value[group.mergedCurrent.value])
    const visualCurrent = ref(0)
    const trackInstant = ref(false)
    const trackImages = computed(() =>
      props.loop && group.previewImages.value.length > 1
        ? [...group.previewImages.value, ...group.previewImages.value, ...group.previewImages.value]
        : group.previewImages.value,
    )
    const trackRef = ref<HTMLElement>()
    const { isRtl } = useDirection(() => trackRef.value)
    let active = true
    let disposed = false
    let instantGeneration = 0
    let recenterGeneration = 0
    let frameOwner: Window | undefined
    let timerOwner: Window | undefined
    let recenterNode: HTMLElement | undefined
    let recenterStarted: number | undefined
    let recenterTimer: number | undefined
    let releaseFrame: number | undefined
    let paintFrame: number | undefined
    const previewBindings = computed(() => {
      const { images, modelValue, defaultValue, loop, open, defaultOpen, ...shared } = props
      return shared
    })

    provide(PreviewGroupInjectionKey, {
      registerImageUrl: group.registerImageUrl,
      preview: (id: number) => {
        if (available()) {
          group.previewByImageId(id)
        }
      },
    })

    function canonicalVisual(index = group.mergedCurrent.value) {
      const length = group.previewImages.value.length
      return props.loop && length > 1 ? length + index : index
    }
    const available = () => active && !disposed
    function cancelFrames() {
      instantGeneration++
      if (releaseFrame !== undefined) {
        frameOwner?.cancelAnimationFrame(releaseFrame)
      }
      if (paintFrame !== undefined) {
        frameOwner?.cancelAnimationFrame(paintFrame)
      }
      releaseFrame = paintFrame = undefined
      frameOwner = undefined
    }
    function cancelRecenter() {
      recenterGeneration++
      if (recenterTimer !== undefined) {
        timerOwner?.clearTimeout(recenterTimer)
      }
      recenterTimer = undefined
      timerOwner = undefined
      recenterNode = undefined
      recenterStarted = undefined
    }
    function setVisualInstant(index = group.mergedCurrent.value) {
      cancelRecenter()
      cancelFrames()
      visualCurrent.value = canonicalVisual(index)
      trackInstant.value = available() && group.mergedOpen.value
      if (!trackInstant.value) {
        return
      }
      const generation = instantGeneration
      nextTick(() => {
        if (!available() || !group.mergedOpen.value || generation !== instantGeneration) {
          return
        }
        const track = trackRef.value
        const view = track?.ownerDocument.defaultView
        if (!track || !view || typeof view.requestAnimationFrame !== 'function') {
          trackInstant.value = false
          return
        }
        const current = () =>
          available() &&
          group.mergedOpen.value &&
          generation === instantGeneration &&
          trackRef.value === track &&
          track.ownerDocument.defaultView === view
        frameOwner = view
        let released = false
        releaseFrame = view.requestAnimationFrame(() => {
          if (!current() || released) {
            return
          }
          released = true
          releaseFrame = undefined
          let painted = false
          paintFrame = view.requestAnimationFrame(() => {
            if (!current() || painted) {
              return
            }
            painted = true
            trackInstant.value = false
            paintFrame = undefined
            frameOwner = undefined
          })
        })
      })
    }
    function needsRecenter() {
      const length = group.previewImages.value.length
      return props.loop && length > 1 && (visualCurrent.value < length || visualCurrent.value >= length * 2)
    }
    function recenterIfNeeded() {
      if (!available() || !group.mergedOpen.value || !needsRecenter()) {
        return
      }
      setVisualInstant()
    }
    function transitionTime(track: HTMLElement) {
      const style = track.ownerDocument.defaultView?.getComputedStyle(track)
      if (!style?.transitionProperty) {
        return undefined
      }
      const properties = style.transitionProperty.split(',').map((value) => value.trim())
      if (properties.every((value) => value === 'none')) {
        return 0
      }
      const durations = style.transitionDuration.split(',')
      const delays = style.transitionDelay.split(',')
      const time = (value: string) => {
        const match = value.trim().match(/^(-?\d*\.?\d+)(ms|s)$/)
        return match ? Number(match[1]) * (match[2] === 's' ? 1000 : 1) : undefined
      }
      let result = 0
      for (let index = 0; index < properties.length; index++) {
        if (properties[index] !== 'transform' && properties[index] !== 'all') {
          continue
        }
        const duration = time(durations[index % durations.length])
        const delay = time(delays[index % delays.length])
        if (duration === undefined || delay === undefined) {
          return undefined
        }
        result = Math.max(0, duration) + (delay ?? 0)
      }
      return Math.max(0, result)
    }
    function scheduleRecenter() {
      cancelRecenter()
      if (!available() || !group.mergedOpen.value || !needsRecenter()) {
        return
      }
      const generation = recenterGeneration
      const initialTrack = trackRef.value
      let scheduled = false
      recenterNode = initialTrack
      recenterStarted = initialTrack?.ownerDocument.defaultView?.performance.now()
      nextTick(() => {
        if (
          !available() ||
          !group.mergedOpen.value ||
          generation !== recenterGeneration ||
          scheduled ||
          !needsRecenter()
        ) {
          return
        }
        const track = trackRef.value
        const view = track?.ownerDocument.defaultView
        if (!track || !view || (initialTrack && track !== initialTrack)) {
          return
        }
        scheduled = true
        recenterNode = track
        recenterStarted ??= view.performance.now()
        timerOwner = view
        // 400ms is only an unavailable/unresolved-style fallback, not a duration cap.
        recenterTimer = view.setTimeout(
          () => {
            if (
              !available() ||
              !group.mergedOpen.value ||
              generation !== recenterGeneration ||
              trackRef.value !== track ||
              track.ownerDocument.defaultView !== view
            ) {
              return
            }
            recenterGeneration++
            recenterTimer = undefined
            timerOwner = undefined
            recenterIfNeeded()
          },
          transitionTime(track) ?? 400,
        )
      })
    }
    function handleTrackTransitionEnd(event: TransitionEvent) {
      if (
        !available() ||
        !group.mergedOpen.value ||
        event.target !== event.currentTarget ||
        event.propertyName !== 'transform' ||
        (recenterNode && event.target !== recenterNode)
      ) {
        return
      }
      // A previously created event can be delivered after a newer navigation.
      if (recenterStarted !== undefined && event.timeStamp > 0 && event.timeStamp < recenterStarted) {
        return
      }
      recenterIfNeeded()
    }

    watch([group.previewImages, () => props.loop], () => setVisualInstant(), {
      immediate: true,
      deep: true,
      // Child registration mutates the image map inside a watchEffect. Settle
      // content changes after that effect, without subscribing it to track state.
      flush: 'post',
    })
    watch(
      group.mergedCurrent,
      (index) => {
        const length = group.previewImages.value.length
        const represented = length ? ((visualCurrent.value % length) + length) % length : 0
        if (represented !== index) {
          setVisualInstant(index)
        }
      },
      { flush: 'sync' },
    )
    watch(isRtl, () => setVisualInstant(), { flush: 'sync' })
    watch(group.mergedOpen, () => setVisualInstant(), { flush: 'sync' })
    function suspend() {
      active = false
      cancelRecenter()
      cancelFrames()
      trackInstant.value = false
    }
    onDeactivated(suspend)
    onActivated(() => {
      if (!disposed && !active) {
        active = true
        setVisualInstant()
      }
    })
    onBeforeUnmount(() => {
      disposed = true
      suspend()
    })

    function trackStyle(translateX: number, scale: number) {
      const offset = scale <= 1 ? translateX : 0
      return {
        transform: `translate3d(calc(${(isRtl.value ? 1 : -1) * visualCurrent.value * 100}% + ${offset}px), 0, 0)`,
      }
    }
    function slideImageStyle(index: number, scale: number, rotate: number, x: number, y: number) {
      const isCurrent = index === visualCurrent.value
      const panX = isCurrent && scale > 1 ? x : 0
      const panY = isCurrent && scale > 1 ? y : 0
      return { transform: `translate(${panX}px, ${panY}px) rotate(${rotate}deg) scale(${scale})` }
    }

    function toIndex(index: number, direction?: 'prev' | 'next') {
      if (!available()) {
        return
      }
      const length = group.previewImages.value.length
      if (!Number.isInteger(index) || index < 0 || index >= length) {
        return
      }
      if (index === group.mergedCurrent.value) {
        return
      }
      cancelRecenter()
      cancelFrames()
      trackInstant.value = false
      const command = recenterGeneration
      if (props.loop && group.previewImages.value.length > 1 && direction) {
        visualCurrent.value += direction === 'next' ? 1 : -1
      } else {
        visualCurrent.value = index
      }
      group.mergedCurrent.value = index
      if (!available() || !group.mergedOpen.value || command !== recenterGeneration) {
        return
      }
      previewRef.value?.reset()
      if (!available() || !group.mergedOpen.value || command !== recenterGeneration) {
        return
      }
      scheduleRecenter()
    }
    function to(imageNumber: number) {
      toIndex(imageNumber - 1)
    }
    function open(imageNumber = 1) {
      if (
        !available() ||
        !Number.isInteger(imageNumber) ||
        imageNumber < 1 ||
        imageNumber > group.previewImages.value.length
      ) {
        return
      }
      toIndex(imageNumber - 1)
      if (available()) {
        group.mergedOpen.value = true
      }
    }
    function close() {
      if (!available()) {
        return
      }
      group.close()
    }
    function prev() {
      if (!available()) {
        return
      }
      const index = group.mergedCurrent.value - 1
      if (index >= 0) {
        toIndex(index, 'prev')
      } else if (props.loop && group.previewImages.value.length) {
        toIndex(group.previewImages.value.length - 1, 'prev')
      }
    }
    function next() {
      if (!available()) {
        return
      }
      const index = group.mergedCurrent.value + 1
      if (index < group.previewImages.value.length) {
        toIndex(index, 'next')
      } else if (props.loop && group.previewImages.value.length) {
        toIndex(0, 'next')
      }
    }
    function reset() {
      if (!available()) {
        return
      }
      previewRef.value?.reset()
    }
    function zoomTo(scale: number) {
      if (!available()) {
        return
      }
      previewRef.value?.zoomTo(scale)
    }
    function zoomIn() {
      if (!available()) {
        return
      }
      previewRef.value?.zoomIn()
    }
    function zoomOut() {
      if (!available()) {
        return
      }
      previewRef.value?.zoomOut()
    }
    function rotateLeft() {
      if (!available()) {
        return
      }
      previewRef.value?.rotateLeft()
    }
    function rotateRight() {
      if (!available()) {
        return
      }
      previewRef.value?.rotateRight()
    }
    function toggleFullscreen() {
      if (!available()) {
        return
      }
      previewRef.value?.toggleFullscreen()
    }

    return {
      n,
      trackRef,
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
