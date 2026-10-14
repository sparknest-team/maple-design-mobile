<template>
  <DateField
    ref="field"
    v-bind="$attrs"
    :field-props="props"
    range
    :root-class="n()"
    @update:model-value="emit('update:modelValue', $event)"
    @update:open="emit('update:open', $event)"
    @update:picker-value="emit('update:pickerValue', $event)"
    @picker-value-change="(value, dates, texts) => emit('picker-value-change', value, dates, texts)"
    @select-shortcut="emit('select-shortcut', $event)"
    @change="(value, dates, texts) => emit('change', value, dates, texts)"
    @select="(value, dates, texts) => emit('select', value, dates, texts)"
    @clear="emit('clear')"
    @click="emit('click', $event)"
    @open-change="emit('open-change', $event)"
    @focus="emit('focus')"
    @blur="emit('blur')"
  >
    <template v-for="(_, name) in $slots" #[name]="scope"><slot :name="name" v-bind="scope || {}" /></template>
  </DateField>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import DateField from '../date/DateField.vue'
import type { DateRangeEmits } from '../date/events'
import { createNamespace } from '../utils/components'
import { props as fieldProps } from './props'

defineOptions({ name: createNamespace('date-range').name, inheritAttrs: false })
const { n } = createNamespace('date-range')
const props = defineProps(fieldProps)
const emit = defineEmits<DateRangeEmits>()
const field = ref<InstanceType<typeof DateField>>()
defineExpose({ focus: (index = 0) => field.value?.focus(index), blur: () => field.value?.blur() })
</script>
