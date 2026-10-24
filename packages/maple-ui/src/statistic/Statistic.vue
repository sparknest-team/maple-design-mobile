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
import { useMotion } from '@maple-design/use'
import dayjs from 'dayjs'
import { createNamespace } from '../utils/components'
import { statisticProps } from './props'

defineOptions({
  name: createNamespace('statistic').name,
})

const { n, classes } = createNamespace('statistic')
const props = defineProps(statisticProps)
const slots = useSlots()

function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !Number.isNaN(value)
}

function isDate(value: unknown): value is Date {
  return value instanceof Date && !Number.isNaN(value.getTime())
}

function roundTo(value: number, precision: number) {
  const factor = 10 ** precision
  return (Math.round(value * factor) / factor).toFixed(precision)
}

const {
  value: motionValue,
  state: motionState,
  reset: resetMotion,
  start: startMotion,
  pause: pauseMotion,
} = useMotion({
  from: () => props.valueFrom ?? 0,
  to: () => (isNumber(props.value) ? props.value : 0),
  duration: () => props.animationDuration,
})

const showPlaceholder = () => props.value === undefined && !slots.default
const renderDefaultSlot = () => props.value === undefined && Boolean(slots.default)
const valueClass = computed(() => classes(n('value'), [props.tabularNums, n('value--tabular-nums')]))

const innerValue = computed(() => {
  if (props.animation && isNumber(props.value)) {
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
    const formatted = isNumber(props.precision) ? roundTo(current, props.precision) : String(current)
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
  if (!props.animation || !isNumber(props.value)) {
    return
  }
  resetMotion()
  startMotion()
}

onMounted(() => {
  if (props.start) {
    play()
  }
})

watch(
  () => props.start,
  (started) => {
    if (started) {
      play()
      return
    }
    pauseMotion()
  },
)

watch(
  () => props.value,
  () => {
    if (props.animation && props.start) {
      play()
    }
  },
)
let resumeOnActivate = false
onDeactivated(() => {
  resumeOnActivate = motionState.value === 'running'
  pauseMotion()
})
onActivated(() => {
  if (resumeOnActivate && props.start && props.animation) {
    resumeOnActivate = false
    startMotion()
  }
})
onUnmounted(pauseMotion)
</script>
