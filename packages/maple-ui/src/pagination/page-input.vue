<script setup lang="ts">
import BaseInput from '../input'
import type { ComponentSize } from '../utils/constants'

defineProps<{ modelValue: string; size?: ComponentSize; disabled?: boolean; label: string }>()
const emit = defineEmits<{ (event: 'update:modelValue', value: string): void; (event: 'commit'): void }>()
</script>
<template>
  <BaseInput
    :model-value="modelValue"
    :size="size"
    :disabled="disabled"
    variant="standard"
    :clearable="false"
    :hint="false"
    :input-attrs="{ inputmode: 'numeric', 'aria-label': label }"
    @update:model-value="emit('update:modelValue', $event)"
    @blur="emit('commit')"
    @keydown.enter.prevent="emit('commit')"
  />
</template>
