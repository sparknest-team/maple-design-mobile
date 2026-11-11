<template>
  <TimeField
    v-bind="$attrs"
    ref="field"
    :field-props="props"
    range
    :root-class="n()"
    @update:model-value="emit('update:modelValue', $event)"
    @update:open="emit('update:open', $event)"
    @change="(value, date) => emit('change', value, date)"
    @select="(value, date) => emit('select', value, date)"
    @clear="emit('clear')"
    @click="emit('click', $event)"
    @focus="emit('focus')"
    @blur="emit('blur')"
    @open-change="emit('open-change', $event)"
  >
    <template v-for="(_, name) in $slots" #[name]="scope"><slot :name="name" v-bind="scope || {}" /></template>
  </TimeField>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { TimeRangeEmits } from '../time/public-types'
import TimeField from '../time/TimeField.vue'
import { createNamespace } from '../utils/components'
import { props as timeRangeProps } from './props'

const { n } = createNamespace('time-range')
defineOptions({
  name: createNamespace('time-range').name,
  inheritAttrs: false,
})
const props = defineProps(timeRangeProps)
const emit = defineEmits<TimeRangeEmits>()
const field = ref<InstanceType<typeof TimeField>>()
defineExpose({
  focus: (index = 0) => field.value?.focus(index),
  blur: () => field.value?.blur(),
})
</script>
