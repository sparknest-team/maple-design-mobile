<template>
  <div :class="classes(n())">
    <div v-if="title || $slots.title" :class="n('title')">
      <slot name="title">{{ title }}</slot>
    </div>
    <div :class="n('content')">
      <div :class="valueClass" :style="valueStyle">
        <span v-if="showPlaceholder()">{{ placeholder }}</span>
        <template v-else>
          <span v-if="prefix || $slots.prefix" :class="n('prefix')">
            <slot name="prefix">{{ prefix }}</slot>
          </span>
          <slot v-if="renderDefaultSlot()" />
          <template v-else-if="formatValue.isNumber">
            <span :class="n('value-integer')">{{ formatValue.integer }}</span>
            <span v-if="formatValue.decimal" :class="n('value-decimal')">.{{ formatValue.decimal }}</span>
          </template>
          <template v-else>
            {{ formatValue.value }}
          </template>
          <span v-if="suffix || $slots.suffix" :class="n('suffix')">
            <slot name="suffix">{{ suffix }}</slot>
          </span>
        </template>
      </div>
      <div v-if="extra || $slots.extra" :class="n('extra')">
        <slot name="extra">{{ extra }}</slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onActivated, onDeactivated, onMounted, onUnmounted, useSlots, watch } from 'vue'
import { useMotion } from '@maple-design/use-vue'
import dayjs from 'dayjs'
import { createNamespace } from '../utils/components'
import { statisticProps, type StatisticSlots } from './props'

defineOptions({
  name: createNamespace('statistic').name,
})

const { n, classes } = createNamespace('statistic')
const props = defineProps(statisticProps)
defineSlots<StatisticSlots>()
const slots = useSlots()

function isNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value)
}

function isDate(value: unknown): value is Date {
  return value instanceof Date && !Number.isNaN(value.getTime())
}

function roundTo(value: number, precision: number) {
  const factor = 10 ** precision
  const scaled = value * factor
  return (Number.isFinite(scaled) ? Math.round(scaled) / factor : value).toFixed(precision)
}

const safeFrom = computed(() => (isNumber(props.valueFrom) ? props.valueFrom : 0))
const safeDuration = computed(() =>
  isNumber(props.animationDuration) && props.animationDuration >= 0 ? props.animationDuration : 0,
)
const safePrecision = computed(() =>
  Number.isInteger(props.precision) && props.precision >= 0 && props.precision <= 100 ? props.precision : 0,
)
const canAnimate = computed(
  () => props.animation && isNumber(props.value) && Number.isFinite(props.value - safeFrom.value),
)

const {
  value: motionValue,
  state: motionState,
  reset: resetMotion,
  start: startMotion,
  pause: pauseMotion,
} = useMotion({
  from: () => safeFrom.value,
  to: () => (isNumber(props.value) ? props.value : 0),
  duration: () => safeDuration.value,
})

const showPlaceholder = () => props.value === undefined && !slots.default
const renderDefaultSlot = () => props.value === undefined && Boolean(slots.default)
const valueClass = computed(() => classes(n('value'), [props.tabularNums, n('value--tabular-nums')]))

const innerValue = computed(() => {
  if (canAnimate.value) {
    return motionValue.value
  }
  return props.value
})

function formatInteger(value: string) {
  if (!props.showGroupSeparator) {
    return value
  }
  const grouped = Number(value).toLocaleString('en-US')
  if (props.separator && props.separator !== ',') {
    return grouped.replace(/,/g, props.separator)
  }
  return grouped
}

const formatValue = computed(() => {
  const current = innerValue.value
  if (isNumber(current)) {
    const formatted = roundTo(current, safePrecision.value)
    const [integer, decimal] = formatted.split('.')
    return {
      isNumber: true as const,
      integer: formatInteger(integer),
      decimal,
    }
  }
  if (isDate(current)) {
    return {
      isNumber: false as const,
      value: dayjs(current).format(props.format),
    }
  }
  return {
    isNumber: false as const,
    value: current,
  }
})

function play() {
  if (!canAnimate.value) {
    return
  }
  resetMotion()
  startMotion()
}

let active = true
let resumeOnActivate = false
let synchronizeOnActivate = false
let prepareOnActivate = false

function synchronize(prepare = false) {
  resumeOnActivate = false
  if (!canAnimate.value) {
    pauseMotion()
  } else if (props.start) {
    play()
  } else if (prepare) {
    resetMotion()
  } else {
    pauseMotion()
  }
}

onMounted(() => synchronize(true))
watch(
  () => [props.animation, props.start, props.value, props.valueFrom, props.animationDuration] as const,
  (next, previous) => {
    const prepare = next.some((value, index) => index !== 1 && !Object.is(value, previous[index]))
    if (!active) {
      synchronizeOnActivate = true
      prepareOnActivate = prepareOnActivate || prepare
      return
    }
    synchronize(prepare)
  },
)
onDeactivated(() => {
  active = false
  resumeOnActivate = motionState.value === 'running'
  pauseMotion()
})
onActivated(() => {
  active = true
  if (synchronizeOnActivate) {
    synchronize(prepareOnActivate)
  } else if (resumeOnActivate && props.start && canAnimate.value) {
    startMotion()
  }
  resumeOnActivate = false
  synchronizeOnActivate = false
  prepareOnActivate = false
})
onUnmounted(() => {
  active = false
  pauseMotion()
})
</script>
