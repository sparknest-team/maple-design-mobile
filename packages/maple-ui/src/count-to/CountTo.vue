<template>
  <div :class="n()">
    <slot :value="displayValue">{{ displayValue }}</slot>
  </div>
</template>

<script lang="ts" setup>
import { computed, onActivated, onDeactivated, onMounted, onUnmounted, watch } from 'vue'
import { floor, toNumber } from '@maple-design/shared'
import { useMotion } from '@maple-design/use'
import { createNamespace } from '../utils/components'
import { countToProps } from './props'

defineOptions({
  name: createNamespace('count-to').name,
})

const { n } = createNamespace('count-to')
const props = defineProps(countToProps)
const emit = defineEmits<{ (event: 'end'): void }>()

const {
  value: motionValue,
  state: motionState,
  reset: resetMotion,
  start,
  pause,
} = useMotion({
  from: () => toNumber(props.from),
  to: () => toNumber(props.to),
  duration: () => toNumber(props.duration),
  timingFunction: props.timingFunction,
  onFinished() {
    emit('end')
  },
})

const displayValue = computed(() => floor(motionValue.value, toNumber(props.precision)))

function reset() {
  resetMotion()
  if (props.autoStart) {
    start()
  }
}

watch(() => [props.from, props.to, props.duration], reset)
onMounted(reset)
let resumeOnActivate = false
onDeactivated(() => {
  resumeOnActivate = motionState.value === 'running'
  pause()
})
onActivated(() => {
  if (resumeOnActivate) {
    resumeOnActivate = false
    start()
  }
})
onUnmounted(pause)

defineExpose({
  start,
  pause,
  reset,
})
</script>
