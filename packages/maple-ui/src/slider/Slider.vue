<template>
  <div
    :class="
      classes(
        n(),
        n(`--${orientation}`),
        [isDisabled, n('--disabled')],
        [mergedReadonly, n('--readonly')],
        [mergedError, n('--error')],
        [marks, n('--marks')],
      )
    "
    :style="customStyle"
  >
    <div ref="track" :class="n('track')" @pointerdown="pointerDown($event)" @click="clickTrack">
      <div :class="n('rail')"></div>
      <div :class="n('fill')" :style="fillStyle"></div>
      <span
        v-for="tick in ticks"
        :key="tick"
        :class="classes(n('tick'), [tick >= values[0] && tick <= values[1], n('tick--active')])"
        :style="position(tick)"
        aria-hidden="true"
      ></span>
      <span
        v-for="mark in markList"
        :key="mark.value"
        :class="n('mark')"
        :style="position(mark.value)"
        aria-hidden="true"
        >{{ mark.label }}</span
      >
      <div
        v-for="index in indices"
        :key="index"
        :class="classes(n('thumb'), [dragIndex === index, n('thumb--dragging')])"
        :style="position(values[index])"
        role="slider"
        :tabindex="isDisabled ? undefined : 0"
        :aria-label="thumbLabel(index)"
        :aria-valuemin="index === 1 && range ? values[0] : bounds.min"
        :aria-valuemax="index === 0 ? values[1] : bounds.max"
        :aria-valuenow="values[index]"
        :aria-valuetext="String(format(values[index]))"
        :aria-orientation="orientation"
        :aria-disabled="isDisabled || undefined"
        :aria-readonly="mergedReadonly || undefined"
        :aria-invalid="mergedError || undefined"
        :aria-describedby="tooltipVisible(index) ? `${tooltipId}-${index}` : undefined"
        @pointerdown.stop="pointerDown($event, index)"
        @keydown="keydown($event, index)"
        @focus="onFocus(index)"
        @blur="onBlur"
        @mouseenter="hovered = index"
        @mouseleave="hovered = -1"
      >
        <slot name="button" :current-value="values[index]" :index="index"><span :class="n('handle')"></span></slot>
        <span v-if="tooltipVisible(index)" :id="`${tooltipId}-${index}`" :class="n('tooltip')" role="tooltip">{{
          format(values[index])
        }}</span>
      </div>
    </div>
    <slider-input
      v-if="showInput"
      :model-value="values"
      :min="bounds.min"
      :max="bounds.max"
      :step="bounds.step"
      :range="range"
      :disabled="isDisabled"
      :readonly="mergedReadonly"
      :error="mergedError"
      :aria-label="ariaLabel"
      @change="inputChange"
      @focus="eventHandlers?.onFocus?.()"
      @blur="eventHandlers?.onBlur?.()"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onDeactivated, ref, useId, watch } from 'vue'
import { useDirection } from '../_utils/direction'
import { createNamespace } from '../utils/components'
import { positiveLength } from '../utils/size-length'
import { sliderBounds, sliderValues, snap, stepValue } from './model'
import { sliderProps } from './props'
import type { SliderEmits, SliderExpose, SliderSlots, SliderValue } from './props'
import SliderInput from './SliderInput.vue'
import { useSliderForm } from './use-slider-form'

defineOptions({ name: createNamespace('slider').name })
const { n, classes } = createNamespace('slider')
const props = defineProps(sliderProps)
const emit = defineEmits<SliderEmits>()
defineSlots<SliderSlots>()
const { mergedDisabled, mergedReadonly, mergedError, eventHandlers } = useSliderForm(props)
const bounds = computed(() => sliderBounds(props.min, props.max, props.step))
const internal = ref<SliderValue>(props.defaultValue)
const values = computed(() =>
  sliderValues(props.modelValue === undefined ? internal.value : props.modelValue, props.range, bounds.value),
)
const isDisabled = computed(() => mergedDisabled.value || bounds.value.min === bounds.value.max)
const blocked = computed(() => isDisabled.value || mergedReadonly.value)
const indices = computed(() => (props.range ? [0, 1] : [1]))
const track = ref<HTMLElement>()
const { isRtl } = useDirection(() => track.value)
const hovered = ref(-1)
const focused = ref(-1)
const dragIndex = ref(-1)
const tooltipId = `${n('tooltip')}-${useId()}`
const format = (value: number) => props.formatTooltip?.(value) ?? value
const thumbLabel = (index: number) => (Array.isArray(props.ariaLabel) ? props.ariaLabel[index] : props.ariaLabel)
const tooltipVisible = (index: number) =>
  !isDisabled.value &&
  props.showTooltip !== false &&
  (props.showTooltip === 'always' || focused.value === index || hovered.value === index || dragIndex.value === index)
const percent = (value: number) =>
  bounds.value.max === bounds.value.min ? 0 : ((value - bounds.value.min) / (bounds.value.max - bounds.value.min)) * 100
const position = (value: number) =>
  props.orientation === 'vertical'
    ? { bottom: percent(value) + '%' }
    : { left: (isRtl.value ? 100 - percent(value) : percent(value)) + '%' }
const fillStyle = computed(() =>
  props.orientation === 'vertical'
    ? { bottom: percent(values.value[0]) + '%', height: percent(values.value[1]) - percent(values.value[0]) + '%' }
    : {
        left: (isRtl.value ? 100 - percent(values.value[1]) : percent(values.value[0])) + '%',
        width: percent(values.value[1]) - percent(values.value[0]) + '%',
      },
)
const ticks = computed(() => {
  if (!props.showTicks) {
    return []
  }
  const count = Math.floor((bounds.value.max - bounds.value.min) / bounds.value.step)
  if (!Number.isFinite(count) || count >= 1000) {
    return []
  }
  return Array.from({ length: count + 1 }, (_, index) =>
    snap(bounds.value.min + index * bounds.value.step, bounds.value),
  )
})
const markList = computed(() =>
  Object.entries(props.marks ?? {})
    .map(([value, label]) => ({ value: Number(value), label }))
    .filter((mark) => Number.isFinite(mark.value) && mark.value >= bounds.value.min && mark.value <= bounds.value.max),
)
const customStyle = computed(() => ({
  '--mp-slider-active-color': props.activeColor,
  '--mp-slider-track-color': props.trackColor,
  '--mp-slider-thumb-color': props.thumbColor,
  '--mp-slider-tooltip-background': props.labelColor,
  '--mp-slider-tooltip-color': props.labelTextColor,
  '--mp-slider-track-height':
    props.trackHeight == null ? undefined : positiveLength(props.trackHeight, '') || undefined,
  '--mp-slider-thumb-size': props.thumbSize == null ? undefined : positiveLength(props.thumbSize, '') || undefined,
}))
const publicValue = (pair = values.value): SliderValue => (props.range ? ([...pair] as [number, number]) : pair[1])
let lastProposal: SliderValue | undefined
function same(a: SliderValue | undefined, b: SliderValue) {
  return JSON.stringify(a) === JSON.stringify(b)
}
function update(index: number, value: number) {
  if (blocked.value) {
    return
  }
  const pair = [...values.value] as [number, number]
  pair[index] =
    index === 0 ? Math.min(snap(value, bounds.value), pair[1]) : Math.max(snap(value, bounds.value), pair[0])
  const next = publicValue(pair)
  if (same(next, publicValue())) {
    lastProposal = next
    return
  }
  if (same(lastProposal, next)) {
    return
  }
  lastProposal = next
  if (props.modelValue === undefined) {
    internal.value = next
  }
  emit('update:modelValue', next)
  emit('change', next)
  eventHandlers.value?.onChange?.()
}
function onFocus(index: number) {
  focused.value = index
  eventHandlers.value?.onFocus?.()
}
function onBlur() {
  focused.value = -1
  eventHandlers.value?.onBlur?.()
}
function focus(index = 0) {
  track.value?.querySelectorAll<HTMLElement>('[role="slider"]')[index]?.focus()
}
function blur() {
  track.value?.querySelectorAll<HTMLElement>('[role="slider"]').forEach((el) => el.blur())
}
defineExpose<SliderExpose>({ focus, blur })

let pointerId: number | undefined
let owner: Document | undefined
let capture: HTMLElement | undefined
let rect: DOMRect | undefined
function coordinate(event: PointerEvent | MouseEvent) {
  if (!rect) {
    return bounds.value.min
  }
  const length = props.orientation === 'vertical' ? rect.height : rect.width
  if (length <= 0) {
    return undefined
  }
  const ratio =
    props.orientation === 'vertical'
      ? (rect.bottom - event.clientY) / length
      : (isRtl.value ? rect.right - event.clientX : event.clientX - rect.left) / length
  return bounds.value.min + Math.min(1, Math.max(0, ratio)) * (bounds.value.max - bounds.value.min)
}
function nearest(value: number) {
  if (!props.range) {
    return 1
  }
  if (values.value[0] === values.value[1]) {
    return value < values.value[0] ? 0 : 1
  }
  return Math.abs(value - values.value[0]) < Math.abs(value - values.value[1]) ? 0 : 1
}
function cleanup() {
  owner?.removeEventListener('pointermove', pointerMove)
  owner?.removeEventListener('pointerup', pointerEnd)
  owner?.removeEventListener('pointercancel', pointerEnd)
  capture?.removeEventListener('lostpointercapture', pointerEnd)
  if (pointerId !== undefined && capture?.hasPointerCapture?.(pointerId)) {
    capture.releasePointerCapture(pointerId)
  }
  owner = undefined
  capture = undefined
  pointerId = undefined
  dragIndex.value = -1
  lastProposal = undefined
}
function pointerMove(event: PointerEvent) {
  if (event.pointerId !== pointerId || blocked.value || dragIndex.value < 0) {
    return
  }
  event.preventDefault()
  const value = coordinate(event)
  if (value !== undefined) {
    update(dragIndex.value, value)
  }
}
function pointerEnd(event: PointerEvent) {
  if (event.pointerId !== pointerId || dragIndex.value < 0) {
    return
  }
  if (event.type === 'pointerup') {
    pointerMove(event)
  }
  const value = lastProposal ?? publicValue()
  cleanup()
  emit('end', value)
}
function pointerDown(event: PointerEvent, index?: number) {
  if (blocked.value || dragIndex.value >= 0 || event.button > 0 || event.isPrimary === false || !track.value) {
    return
  }
  rect = track.value.getBoundingClientRect()
  const value = coordinate(event)
  if (value === undefined) {
    return
  }
  event.preventDefault()
  dragIndex.value = index ?? nearest(value)
  lastProposal = undefined
  pointerId = event.pointerId
  owner = track.value.ownerDocument
  capture = event.currentTarget as HTMLElement
  capture.setPointerCapture?.(event.pointerId)
  capture.addEventListener('lostpointercapture', pointerEnd)
  owner.addEventListener('pointermove', pointerMove, { passive: false })
  owner.addEventListener('pointerup', pointerEnd)
  owner.addEventListener('pointercancel', pointerEnd)
  track.value.querySelectorAll<HTMLElement>('[role="slider"]')[props.range ? dragIndex.value : 0]?.focus()
  emit('start')
  if (index === undefined) {
    update(dragIndex.value, value)
  }
}
function clickTrack(event: MouseEvent) {
  if (event.detail !== 0 || blocked.value || (event.target as HTMLElement).closest('[role="slider"]')) {
    return
  }
  rect = track.value?.getBoundingClientRect()
  const value = coordinate(event)
  if (value === undefined) {
    return
  }
  lastProposal = undefined
  emit('start')
  update(nearest(value), value)
  emit('end', lastProposal ?? publicValue())
  lastProposal = undefined
}
function keydown(event: KeyboardEvent, index: number) {
  if (blocked.value || event.target !== event.currentTarget || event.altKey || event.ctrlKey || event.metaKey) {
    return
  }
  const delta: Record<string, number> = {
    ArrowRight: props.orientation === 'horizontal' && isRtl.value ? -1 : 1,
    ArrowUp: 1,
    ArrowLeft: props.orientation === 'horizontal' && isRtl.value ? 1 : -1,
    ArrowDown: -1,
    PageUp: 10,
    PageDown: -10,
  }
  let value: number
  if (event.key === 'Home') {
    value = bounds.value.min
  } else if (event.key === 'End') {
    value = bounds.value.max
  } else if (event.key in delta) {
    value = stepValue(values.value[index], delta[event.key], bounds.value)
  } else {
    return
  }
  event.preventDefault()
  event.stopPropagation()
  lastProposal = undefined
  emit('start')
  update(index, value)
  emit('end', lastProposal ?? publicValue())
  lastProposal = undefined
}
function inputChange(index: number, value?: number) {
  if (blocked.value) {
    return
  }
  lastProposal = undefined
  emit('start')
  update(index, value ?? bounds.value.min)
  emit('end', lastProposal ?? publicValue())
  lastProposal = undefined
}
watch(blocked, (value) => {
  if (value) {
    cleanup()
  }
})
watch(() => [props.range, props.orientation, props.min, props.max, props.step], cleanup)
onBeforeUnmount(cleanup)
onDeactivated(cleanup)
</script>
