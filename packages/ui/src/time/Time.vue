<template>
  <TimeField
    v-bind="$attrs"
    ref="field"
    :field-props="props"
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
import { createNamespace } from '../utils/components'
import { props as timeProps } from './props'
import type { TimeEmits } from './public-types'
import TimeField from './TimeField.vue'

const { n } = createNamespace('time')
defineOptions({ name: createNamespace('time').name, inheritAttrs: false })
const props = defineProps(timeProps)
const emit = defineEmits<TimeEmits>()
const field = ref<InstanceType<typeof TimeField>>()
defineExpose({
  focus: (index = 0) => field.value?.focus(index),
  blur: () => field.value?.blur(),
})
</script>
