<template>
  <div
    :class="classes(n(), n(`--${mode}`), n(`--${orientation}`), n(`--${size}`))"
    role="group"
    :aria-label="ariaLabel"
    :data-orientation="mode === 'line' ? orientation : undefined"
    @keydown.esc="dismissed = true"
  >
    <div v-if="mode === 'line' && (showText || $slots.text)" :class="n('status')" :style="statusStyle">
      <slot name="text" :percent="totalPercent" :value="totalValue" :max="normalizedMax">{{ totalPercent }}%</slot>
    </div>
    <div v-if="mode === 'line'" :class="n('track-wrap')">
      <div :class="n('track')">
        <div
          v-for="(item, index) in circleSegments"
          :key="index"
          :class="n('segment')"
          :style="segmentStyle(item.displayPercent, item.color)"
          role="progressbar"
          aria-valuemin="0"
          :aria-valuemax="normalizedMax"
          :aria-valuenow="item.value"
          :aria-label="item.label"
          :tabindex="tooltip && item.displayPercent > 0 ? 0 : undefined"
          :aria-describedby="tooltip && !dismissed && activeIndex === index ? tooltipId : undefined"
          @mouseenter="activateHover(index)"
          @mouseleave="hoveredIndex = -1"
          @focus="activateFocus(index)"
          @blur="focusedIndex = -1"
        ></div>
      </div>
      <span v-if="activeLineItem" :class="n('active-segment')" :style="activeSegmentStyle"></span>
      <span
        v-if="tooltip && !dismissed && activeLineItem"
        :id="tooltipId"
        :class="n('tooltip')"
        :style="lineTooltipStyle"
        role="tooltip"
      >
        <slot name="tooltip" :item="activeLineItem" :index="activeIndex" :percent="activeLineItem.percent">{{
          getTip(activeLineItem)
        }}</slot>
      </span>
    </div>
    <div v-else :class="n('circle')" :style="circleStyle">
      <svg :class="n('circle-svg')" viewBox="0 0 100 100">
        <circle
          :class="n('circle-track')"
          aria-hidden="true"
          cx="50"
          cy="50"
          :r="circleRadius"
          fill="none"
          :stroke-width="normalizedStrokeWidth"
          pathLength="100"
        />
        <circle
          v-for="(item, index) in circleSegments"
          :key="index"
          :class="n('circle-segment')"
          role="progressbar"
          aria-valuemin="0"
          :aria-valuemax="normalizedMax"
          :aria-valuenow="item.value"
          :aria-label="item.label"
          :tabindex="tooltip && item.displayPercent > 0 ? 0 : undefined"
          :aria-describedby="tooltip && !dismissed && activeIndex === index ? tooltipId : undefined"
          cx="50"
          cy="50"
          :r="circleRadius"
          fill="none"
          :stroke="item.color"
          :stroke-width="normalizedStrokeWidth"
          pathLength="100"
          :stroke-dasharray="`${item.displayPercent} ${100 - item.displayPercent}`"
          :stroke-dashoffset="-item.offset"
          transform="rotate(-90 50 50)"
          @focus="activateFocus(index)"
          @blur="focusedIndex = -1"
          @mouseenter="activateHover(index)"
          @mouseleave="hoveredIndex = -1"
        />
        <circle
          v-if="activeCircleItem"
          :class="n('circle-active-segment')"
          aria-hidden="true"
          cx="50"
          cy="50"
          :r="circleRadius"
          fill="none"
          :stroke="activeCircleItem.color"
          :stroke-width="normalizedStrokeWidth + 2"
          pathLength="100"
          :stroke-dasharray="`${activeCircleItem.displayPercent} ${100 - activeCircleItem.displayPercent}`"
          :stroke-dashoffset="-activeCircleItem.offset"
          transform="rotate(-90 50 50)"
        />
      </svg>
      <div v-if="showText || $slots.text" :class="n('circle-status')">
        <slot name="text" :percent="totalPercent" :value="totalValue" :max="normalizedMax">{{ totalPercent }}%</slot>
      </div>
      <span
        v-if="tooltip && !dismissed && activeCircleItem"
        :id="tooltipId"
        :class="classes(n('tooltip'), n('circle-tooltip'))"
        role="tooltip"
      >
        <slot name="tooltip" :item="activeCircleItem" :index="activeIndex" :percent="activeCircleItem.percent">{{
          getTip(activeCircleItem)
        }}</slot>
      </span>
    </div>
    <ul v-if="hasLegend" :class="n('legend')">
      <li v-for="(item, index) in normalizedItems" :key="index" :class="classes(n('item'), item.class)">
        <slot :name="item.slot || 'item'" :item="item" :index="index" :percent="item.percent">
          <slot
            :name="item.slot ? `${item.slot}-leading` : 'item-leading'"
            :item="item"
            :index="index"
            :percent="item.percent"
          >
            <component :is="item.icon" v-if="item.icon" :class="n('icon')" :style="{ color: item.color }" />
            <span v-else :class="n('dot')" :style="{ backgroundColor: item.color }"></span>
          </slot>
          <span :class="n('label')"
            ><slot
              :name="item.slot ? `${item.slot}-label` : 'item-label'"
              :item="item"
              :index="index"
              :percent="item.percent"
              >{{ item.label }}</slot
            ></span
          >
          <span :class="n('value')"
            ><slot
              :name="item.slot ? `${item.slot}-trailing` : 'item-trailing'"
              :item="item"
              :index="index"
              :percent="item.percent"
              >{{ Math.round(item.percent) }}%</slot
            ></span
          >
        </slot>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useId, useSlots } from 'vue'
import { positiveLength } from '../progress/size'
import { createNamespace } from '../utils/components'
import { progressGroupProps } from './props'

defineOptions({ name: createNamespace('progress-group').name })
const { n, classes } = createNamespace('progress-group')
const props = defineProps(progressGroupProps)
const slots = useSlots()
const hoveredIndex = ref(-1)
const focusedIndex = ref(-1)
const dismissed = ref(false)
const activeIndex = computed(() => (hoveredIndex.value >= 0 ? hoveredIndex.value : focusedIndex.value))
function activateHover(index: number) {
  hoveredIndex.value = index
  dismissed.value = false
}
function activateFocus(index: number) {
  focusedIndex.value = index
  dismissed.value = false
}
const tooltipId = `${n('tooltip')}-${useId()}`
const normalizedMax = computed(() => (Number.isFinite(props.max) && props.max > 0 ? props.max : 100))
const normalizedItems = computed(() =>
  props.items.map((item) => {
    const value = Number.isFinite(item.value) ? Math.min(Math.max(item.value ?? 0, 0), normalizedMax.value) : 0
    return {
      ...item,
      value,
      color: item.color || props.color || 'var(--mp-sys-color-content-brand)',
      percent: (value / normalizedMax.value) * 100,
    }
  }),
)
const totalValue = computed(() => normalizedItems.value.reduce((sum, item) => sum + item.value, 0))
const totalPercent = computed(() => Math.min(100, Math.round((totalValue.value / normalizedMax.value) * 100)))
const hasLegend = computed(
  () => normalizedItems.value.some((item) => item.label || item.icon || item.slot) || !!slots.item,
)
const statusStyle = computed(() => ({ '--mp-progress-group-percent': `${totalPercent.value}%` }))
const normalizedStrokeWidth = computed(() => Math.min(Math.max(Number(props.strokeWidth) || 8, 1), 48))
const circleRadius = computed(() => 50 - normalizedStrokeWidth.value / 2)
const circleStyle = computed(() => ({
  width: positiveLength(props.circleSize, '120px'),
  aspectRatio: '1',
}))
const circleSegments = computed(() => {
  let offset = 0
  return normalizedItems.value.map((item) => {
    const percent = Math.min(item.percent, Math.max(100 - offset, 0))
    const segment = { ...item, displayPercent: percent, offset }
    offset += percent
    return segment
  })
})
const activeCircleItem = computed(() => circleSegments.value[activeIndex.value])
const activeLineItem = computed(() => circleSegments.value[activeIndex.value])
const lineTooltipStyle = computed(() => {
  const before = circleSegments.value.slice(0, activeIndex.value).reduce((sum, item) => sum + item.displayPercent, 0)
  const middle = before + (activeLineItem.value?.displayPercent || 0) / 2
  return props.orientation === 'vertical' ? { top: `${middle}%` } : { left: `${middle}%` }
})
const activeSegmentStyle = computed(() => {
  const before = circleSegments.value.slice(0, activeIndex.value).reduce((sum, item) => sum + item.displayPercent, 0)
  const item = activeLineItem.value
  if (!item) {
    return undefined
  }
  return props.orientation === 'vertical'
    ? { top: `${before}%`, height: `${item.displayPercent}%`, backgroundColor: item.color }
    : { left: `${before}%`, width: `${item.displayPercent}%`, backgroundColor: item.color }
})
const getTip = (item: { label?: string; value: number; percent: number; tip?: string }) =>
  item.tip || `${item.label ? `${item.label}: ` : ''}${item.value} (${Math.round(item.percent)}%)`
const segmentStyle = (percent: number, color: string) =>
  props.orientation === 'vertical'
    ? { height: `${percent}%`, backgroundColor: color }
    : { width: `${percent}%`, backgroundColor: color }
</script>
