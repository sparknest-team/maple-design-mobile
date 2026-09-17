<script setup lang="ts">
import { computed } from 'vue'
import type { CSSProperties, PropType } from 'vue'
import { createNamespace, formatElevation } from '../utils/components'
import { usePaginationLocale } from './platform'

defineOptions({ name: createNamespace('pagination-item').name })
const props = defineProps({
  pageNumber: Number,
  current: Number,
  disabled: Boolean,
  style: Object as PropType<CSSProperties>,
  activeStyle: Object as PropType<CSSProperties>,
  elevation: [Boolean, Number],
})
const emit = defineEmits<{ (event: 'click', page: number): void }>()
const { n, classes } = createNamespace('pagination')
const active = computed(() => props.current === props.pageNumber)
const text = usePaginationLocale()
</script>
<template>
  <button
    type="button"
    :class="classes(n('item'), [active, n('item--active')], formatElevation(elevation, 2))"
    :disabled="disabled"
    :aria-current="active ? 'page' : undefined"
    :aria-label="text.page(pageNumber ?? 1)"
    :style="[style, active ? activeStyle : undefined]"
    @click="!disabled && pageNumber && emit('click', pageNumber)"
  >
    <slot :page="pageNumber">{{ pageNumber }}</slot>
  </button>
</template>
