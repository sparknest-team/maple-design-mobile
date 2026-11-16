<template>
  <div
    :class="
      classes(
        n(),
        n(`--${mode}`),
        n(`--${dimensions.preset}`),
        n(`--${resolvedStatus}`),
        [stepCount > 0, n('--steps')],
        [indeterminate, n('--indeterminate')],
      )
    "
    role="progressbar"
    aria-valuemin="0"
    aria-valuemax="100"
    :aria-valuenow="indeterminate ? undefined : normalizedPercent"
    :aria-busy="indeterminate || undefined"
  >
    <div v-if="mode === 'line'" :class="n('line')">
      <div v-if="stepCount" :class="n('steps')" :style="{ height: resolvedStroke }">
        <div
          v-for="index in stepCount"
          :key="index"
          :class="classes(n('step'), [index <= activeSteps, n('step--active')])"
          :style="
            index <= activeSteps
              ? { background: background(color) }
              : { background: track ? trackColor : 'transparent' }
          "
        ></div>
      </div>
      <div
        v-else
        :class="n('track')"
        :style="{ height: resolvedStroke, background: track ? trackColor : 'transparent' }"
      >
        <div v-if="track && bufferColor" :class="n('buffer')" :style="{ background: background(bufferColor) }"></div>
        <div v-if="indeterminate" :class="n('indeterminate')">
          <div :style="{ background: background(color) }"></div>
          <div :style="{ background: background(color) }"></div>
        </div>
        <div
          v-else
          :class="classes(n('bar'), [animation, n('bar--animated')])"
          :style="{ width: normalizedPercent + '%', background: background(color) }"
        ></div>
      </div>
      <span v-if="showText" :class="classes(n('text'), textClass)">
        <slot name="text" :percent="normalizedPercent"
          ><slot :percent="normalizedPercent">{{ indeterminate ? '…' : normalizedPercent + '%' }}</slot></slot
        >
      </span>
    </div>
    <div v-else ref="circleEl" :class="n('circle')" :style="{ width: dimensions.diameter, aspectRatio: '1' }">
      <svg :class="n('svg')" :viewBox="`0 0 ${diameter} ${diameter}`" aria-hidden="true">
        <defs v-if="gradient">
          <linearGradient :id="gradientId" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop v-for="(stopColor, offset) in gradient" :key="offset" :offset="offset" :stop-color="stopColor" />
          </linearGradient>
        </defs>
        <circle
          v-if="track"
          :class="n('circle-track')"
          :cx="diameter / 2"
          :cy="diameter / 2"
          :r="radius"
          fill="none"
          :stroke-width="circleStroke"
          :style="{ stroke: trackColor }"
        />
        <circle
          :class="n('circle-bar')"
          :cx="diameter / 2"
          :cy="diameter / 2"
          :r="radius"
          fill="none"
          :stroke-width="circleStroke"
          :stroke-dasharray="perimeter"
          :stroke-dashoffset="perimeter * (1 - (indeterminate ? 25 : normalizedPercent) / 100)"
          :style="{
            stroke: gradient ? `url(#${gradientId})` : (color as string),
            transform: `rotate(${rotation - 90}deg)`,
          }"
        />
      </svg>
      <span
        v-if="showText && (dimensions.preset !== 'xs' || resolvedStatus === 'success' || resolvedStatus === 'danger')"
        :class="classes(n('text'), n('circle-text'), textClass)"
      >
        <slot name="text" :percent="normalizedPercent">
          <slot :percent="normalizedPercent">
            <svg
              v-if="!indeterminate && (resolvedStatus === 'success' || resolvedStatus === 'danger')"
              :class="n('status-icon')"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path v-if="resolvedStatus === 'success'" d="m5 12 4 4L19 6" />
              <path v-else d="M12 4v11m0 3v2" />
            </svg>
            <template v-else>{{ indeterminate ? '…' : normalizedPercent + '%' }}</template>
          </slot>
        </slot>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { createNamespace } from '../utils/components'
import { useId } from '../utils/vue-compat'
import { normalizePercent } from './percent'
import { progressProps } from './props'
import type { ProgressColor } from './props'
import { positiveLength, resolveProgressSize } from './size'
import { useCircleSize } from './use-circle-size'
import { useProgressSize } from './use-progress-size'

defineOptions({ name: createNamespace('progress').name })
const { n, classes } = createNamespace('progress')
const props = defineProps(progressProps)
const normalizedPercent = computed(() => normalizePercent(props.percent))
const resolvedStatus = computed(() =>
  props.status === 'default' && !props.indeterminate && normalizedPercent.value === 100 ? 'success' : props.status,
)
const size = useProgressSize(() => props.size)
const dimensions = computed(() => resolveProgressSize(size.value, props.mode))
const resolvedStroke = computed(() => positiveLength(props.strokeWidth, dimensions.value.stroke))
const stepCount = computed(() =>
  props.mode === 'line' && !props.indeterminate && Number.isFinite(props.steps)
    ? Math.min(1000, Math.max(0, Math.floor(props.steps)))
    : 0,
)
const activeSteps = computed(() => Math.ceil((normalizedPercent.value / 100) * stepCount.value))
const circleEl = ref<HTMLElement>()
const { diameter, strokeWidth: circleStroke } = useCircleSize(
  circleEl,
  () => dimensions.value.diameter,
  () => resolvedStroke.value,
)
const radius = computed(() => (diameter.value - circleStroke.value) / 2)
const perimeter = computed(() => 2 * Math.PI * radius.value)
const rotation = computed(() => (Number.isFinite(props.rotate) ? props.rotate : 0))
const gradientId = `${n('gradient')}-${useId()}`
const gradient = computed(() => (typeof props.color === 'object' && props.color ? props.color : undefined))
function background(color?: ProgressColor) {
  if (!color || typeof color === 'string') {
    return color
  }
  return `linear-gradient(to right, ${Object.entries(color)
    .map(([offset, value]) => `${value} ${offset}`)
    .join(', ')})`
}
</script>
