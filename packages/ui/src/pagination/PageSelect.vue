<script setup lang="ts">
import BaseSelect from '../select/select'
import type { ComponentSize } from '../utils/constants'
import type { PaginationPageSizeProps } from './types'

defineProps<{
  modelValue?: number
  options: { value: number; label: string }[]
  size?: ComponentSize
  disabled?: boolean
  label: string
  config?: PaginationPageSizeProps
}>()
const emit = defineEmits<{ (event: 'update:modelValue', value: unknown): void }>()
</script>
<template>
  <BaseSelect
    edit-mode="direct"
    :auto-fit-popup-width="false"
    :class="config?.class"
    :style="config?.style"
    :model-value="modelValue"
    :options="options"
    :size="size"
    :disabled="disabled"
    :popup-container="config?.popupContainer"
    :trigger-props="{ placement: config?.placement ?? 'bottom-start' }"
    :aria-label="label"
    variant="standard"
    :clearable="false"
    :hint="false"
    @update:model-value="emit('update:modelValue', $event)"
  />
</template>
