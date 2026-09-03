<!-- @sync-with: cedar-ui/src/countdown/countdown.vue -->
<template>
  <div :class="n()">
    <slot v-bind="timeData">{{ showTime }}</slot>
  </div>
</template>

<script lang="ts" setup>
import { createNamespace } from '../utils/components'
import { countdownProps, type TimeData } from './props'
import { useCountdown } from './use-countdown'

defineOptions({
  name: createNamespace('countdown').name,
})

const { n } = createNamespace('countdown')
const props = defineProps(countdownProps)
const emit = defineEmits<{
  (event: 'change', time: TimeData): void
  (event: 'end'): void
}>()

const { showTime, timeData, start, pause, reset } = useCountdown(props, emit)

defineExpose({
  start,
  pause,
  reset,
})
</script>
