<template>
  <div
    :class="classes(n(), n(`--${mode}`), n(`--${orientation}`), n(`--${size}`))"
    :data-orientation="mode === 'line' ? orientation : undefined"
  >
    <div v-if="mode === 'line' && (status || $slots.status)" :class="n('status')" :style="statusStyle">
      <slot name="status" :percent="totalPercent" :value="totalValue" :max="normalizedMax">{{ totalPercent }}%</slot>
    </div>
    <div v-if="mode === 'line'" :class="n('track-wrap')">
      <div :class="n('track')">
        <div
          v-for="(item, index) in normalizedItems"
          :key="index"
          :class="n('segment')"
          :style="segmentStyle(item.percent, item.color)"
          role="progressbar"
          aria-valuemin="0"
          :aria-valuemax="normalizedMax"
          :aria-valuenow="item.value"
          :aria-label="item.label"
          :tabindex="tooltip ? 0 : undefined"
          @mouseenter="activeIndex = index"
          @mouseleave="activeIndex = -1"
          @focus="activeIndex = index"
          @blur="activeIndex = -1"
        ></div>
      </div>
      <span v-if="activeLineItem" :class="n('active-segment')" :style="activeSegmentStyle"></span>
      <span v-if="tooltip && activeLineItem" :class="n('tooltip')" :style="lineTooltipStyle" role="tooltip">
        <slot name="tooltip" :item="activeLineItem" :index="activeIndex" :percent="activeLineItem.percent">{{
          getTip(activeLineItem)
        }}</slot>
      </span>
    </div>
    <div
      v-else
      :class="n('circle')"
      :style="circleStyle"
      role="progressbar"
      aria-valuemin="0"
      :aria-valuemax="normalizedMax"
      :aria-valuenow="Math.min(totalValue, normalizedMax)"
    >
      <svg :class="n('circle-svg')" viewBox="0 0 100 100" aria-hidden="true">
        <circle
          :class="n('circle-track')"
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
          cx="50"
          cy="50"
          :r="circleRadius"
          fill="none"
          :stroke="item.color"
          :stroke-width="normalizedStrokeWidth"
          pathLength="100"
          :stroke-dasharray="`${item.percent} ${100 - item.percent}`"
          :stroke-dashoffset="-item.offset"
          transform="rotate(-90 50 50)"
          @mouseenter="activeIndex = index"
          @mouseleave="activeIndex = -1"
        />
        <circle
          v-if="activeCircleItem"
          :class="n('circle-active-segment')"
          cx="50"
          cy="50"
          :r="circleRadius"
          fill="none"
          :stroke="activeCircleItem.color"
          :stroke-width="normalizedStrokeWidth + 2"
          pathLength="100"
          :stroke-dasharray="`${activeCircleItem.percent} ${100 - activeCircleItem.percent}`"
          :stroke-dashoffset="-activeCircleItem.offset"
          transform="rotate(-90 50 50)"
        />
      </svg>
      <div v-if="status || $slots.status" :class="n('circle-status')">
        <slot name="status" :percent="totalPercent" :value="totalValue" :max="normalizedMax">{{ totalPercent }}%</slot>
      </div>
      <span v-if="tooltip && activeCircleItem" :class="classes(n('tooltip'), n('circle-tooltip'))" role="tooltip">
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

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { createNamespace } from '../utils/components'
import { progressGroupProps } from './props'

const { name, n, classes } = createNamespace('progress-group')
export default defineComponent({
  name,
  props: progressGroupProps,
  setup(props, { slots }) {
    const activeIndex = ref(-1)
    const normalizedMax = computed(() => (Number.isFinite(props.max) && props.max > 0 ? props.max : 100))
    const normalizedItems = computed(() =>
      props.items.map((item) => {
        const value = Math.min(Math.max(Number(item.value) || 0, 0), normalizedMax.value)
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
      width: typeof props.circleSize === 'number' ? `${props.circleSize}px` : props.circleSize,
      height: typeof props.circleSize === 'number' ? `${props.circleSize}px` : props.circleSize,
    }))
    const circleSegments = computed(() => {
      let offset = 0
      return normalizedItems.value.map((item) => {
        const percent = Math.min(item.percent, Math.max(100 - offset, 0))
        const segment = { ...item, percent, offset }
        offset += percent
        return segment
      })
    })
    const activeCircleItem = computed(() => circleSegments.value[activeIndex.value])
    const activeLineItem = computed(() => normalizedItems.value[activeIndex.value])
    const lineTooltipStyle = computed(() => {
      const before = normalizedItems.value.slice(0, activeIndex.value).reduce((sum, item) => sum + item.percent, 0)
      const middle = before + (activeLineItem.value?.percent || 0) / 2
      return props.orientation === 'vertical' ? { top: `${middle}%` } : { left: `${middle}%` }
    })
    const activeSegmentStyle = computed(() => {
      const before = normalizedItems.value.slice(0, activeIndex.value).reduce((sum, item) => sum + item.percent, 0)
      const item = activeLineItem.value
      if (!item) {
        return undefined
      }
      return props.orientation === 'vertical'
        ? { top: `${before}%`, height: `${item.percent}%`, backgroundColor: item.color }
        : { left: `${before}%`, width: `${item.percent}%`, backgroundColor: item.color }
    })
    const getTip = (item: { label?: string; value: number; percent: number; tip?: string }) =>
      item.tip || `${item.label ? `${item.label}: ` : ''}${item.value} (${Math.round(item.percent)}%)`
    const segmentStyle = (percent: number, color: string) =>
      props.orientation === 'vertical'
        ? { height: `${percent}%`, backgroundColor: color }
        : { width: `${percent}%`, backgroundColor: color }
    return {
      n,
      classes,
      activeIndex,
      normalizedMax,
      normalizedItems,
      totalValue,
      totalPercent,
      hasLegend,
      statusStyle,
      segmentStyle,
      normalizedStrokeWidth,
      circleRadius,
      circleStyle,
      circleSegments,
      activeCircleItem,
      activeLineItem,
      lineTooltipStyle,
      activeSegmentStyle,
      getTip,
    }
  },
})
</script>
