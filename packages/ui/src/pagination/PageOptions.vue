<script setup lang="ts">
import { computed } from 'vue'
import type { PropType } from 'vue'
import { createNamespace } from '../utils/components'
import type { ComponentSize } from '../utils/constants'
import PaginationSelect from './PageSelect.vue'
import { usePaginationLocale } from './platform'
import type { PaginationPageSizeProps } from './types'

defineOptions({ name: createNamespace('pagination-options').name })
const props = defineProps({
  pageSize: Number,
  sizeOptions: { type: Array as PropType<number[]>, required: true },
  size: String as PropType<ComponentSize>,
  disabled: Boolean,
  selectProps: Object as PropType<PaginationPageSizeProps>,
})
const emit = defineEmits<{ (event: 'change', value: number): void }>()
const { n } = createNamespace('pagination')
const text = usePaginationLocale()
const options = computed(() =>
  props.sizeOptions
    .filter((value) => Number.isInteger(value) && value > 0)
    .map((value) => ({ value, label: text.value.count(value) })),
)
function change(value: unknown) {
  if (
    !props.disabled &&
    !props.selectProps?.disabled &&
    typeof value === 'number' &&
    options.value.some((option) => option.value === value)
  ) {
    emit('change', value)
  }
}
</script>
<template>
  <span :class="n('options')"
    ><PaginationSelect
      :config="selectProps"
      :model-value="pageSize"
      :options="options"
      :size="size"
      :disabled="disabled || selectProps?.disabled"
      :label="text.perPage"
      @update:model-value="change"
  /></span>
</template>
