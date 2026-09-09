<script setup lang="ts">
import { computed } from 'vue'
import { createNamespace, formatElevation } from '../utils/components'
import { IconMore, usePaginationLocale } from './platform'
import { getLegalPage } from './utils'

defineOptions({ name: createNamespace('pagination-ellipsis').name })
const props = defineProps({
  current: { type: Number, required: true },
  pages: { type: Number, required: true },
  step: { type: Number, default: 5 },
  disabled: Boolean,
  elevation: [Boolean, Number],
})
const emit = defineEmits<{ (event: 'click', page: number): void }>()
const { n, classes } = createNamespace('pagination')
const target = computed(() => getLegalPage(props.current + props.step, { min: 1, max: props.pages }))
const blocked = computed(() => props.disabled || !props.pages || props.current === target.value)
const text = usePaginationLocale()
</script>
<template>
  <button
    type="button"
    :class="classes(n('item'), n('item-ellipsis'), formatElevation(elevation, 2))"
    :disabled="blocked"
    :aria-label="text.page(target)"
    @click="!blocked && emit('click', target)"
  >
    <slot><IconMore aria-hidden="true" /></slot>
  </button>
</template>
