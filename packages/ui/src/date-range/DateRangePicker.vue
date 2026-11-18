<template>
  <DatePanel
    v-bind="$attrs"
    :options="props"
    range
    @update:model-value="emit('update:modelValue', $event)"
    @change="(value, dates, texts) => emit('change', value, dates, texts)"
    @select="(value, dates, texts) => emit('select', value, dates, texts)"
    @confirm="(value, dates, texts) => emit('confirm', value, dates, texts)"
    @update:picker-value="emit('update:pickerValue', $event)"
    @picker-value-change="(value, dates, texts) => emit('picker-value-change', value, dates, texts)"
    @select-shortcut="emit('select-shortcut', $event)"
  >
    <template v-for="(_, name) in $slots" #[name]="scope"><slot :name="name" v-bind="scope || {}" /></template>
  </DatePanel>
</template>
<script setup lang="ts">
import DatePanel from '../date/DatePanel.vue'
import type { DateRangePickerEmits } from '../date/events'
import { provideRangeRenderer } from '../date/range-renderer'
import { createNamespace } from '../utils/components'
import { props as pickerProps } from './picker-props'
import RangeContent from './presentation/RangeContent.vue'

provideRangeRenderer(RangeContent)

defineOptions({ name: createNamespace('date-range-picker').name, inheritAttrs: false })
const props = defineProps(pickerProps)
const emit = defineEmits<DateRangePickerEmits>()
</script>
