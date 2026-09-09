<script setup lang="ts">
import { computed } from 'vue'
import { createNamespace, formatElevation } from '../utils/components'
import { IconNext, IconPrevious, usePaginationLocale } from './platform'
import { getLegalPage } from './utils'

defineOptions({ name: createNamespace('pagination-step').name })
const props = defineProps({
  current: { type: Number, required: true },
  pages: { type: Number, required: true },
  type: { type: String, required: true },
  disabled: Boolean,
  elevation: [Boolean, Number],
})
const emit = defineEmits<{ (event: 'click', page: number): void }>()
const { n, classes } = createNamespace('pagination')
const next = computed(() => props.type === 'next')
const blocked = computed(
  () => props.disabled || props.pages === 0 || (next.value ? props.current >= props.pages : props.current <= 1),
)
const text = usePaginationLocale()
function click() {
  if (!blocked.value) {
    emit('click', getLegalPage(props.current + (next.value ? 1 : -1), { min: 1, max: props.pages }))
  }
}
</script>
<template>
  <button
    type="button"
    :class="classes(n('item'), n(type), formatElevation(elevation, 2))"
    :disabled="blocked"
    :aria-label="next ? text.next : text.previous"
    @click="click"
  >
    <slot :type="next ? 'next' : 'previous'"
      ><IconNext v-if="next" aria-hidden="true" /><IconPrevious v-else aria-hidden="true"
    /></slot>
  </button>
</template>
