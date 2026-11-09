<template>
  <div :class="n()">
    <slot v-bind="timeData">{{ showTime }}</slot>
  </div>
</template>

<script lang="ts" setup>
import { createNamespace } from '../utils/components'
import { countdownProps, type CountdownEvents, type CountdownExpose, type CountdownSlots } from './props'
import { useCountdown } from './use-countdown'

defineOptions({
  name: createNamespace('countdown').name,
})

const { n } = createNamespace('countdown')
const props = defineProps(countdownProps)
const emit = defineEmits<CountdownEvents>()
defineSlots<CountdownSlots>()

const { showTime, timeData, start, pause, reset } = useCountdown(props, emit)

defineExpose<CountdownExpose>({
  start,
  pause,
  reset,
})
</script>
