<script setup lang="ts">
import { computed, nextTick } from 'vue'
import type { PropType } from 'vue'
import { createNamespace } from '../utils/components'
import type { ComponentSize } from '../utils/constants'
import PaginationInput from './PageInput.vue'
import { usePaginationLocale } from './platform'
import { getLegalPage } from './utils'

defineOptions({ name: createNamespace('pagination-jumper').name })
const props = defineProps({
  modelValue: { type: String, required: true },
  isMigrating: { type: Function as PropType<() => boolean>, required: true },
  current: { type: Number, required: true },
  pages: { type: Number, required: true },
  simple: Boolean,
  disabled: Boolean,
  size: String as PropType<ComponentSize>,
})
const emit = defineEmits<{ (event: 'change', page: number): void; (event: 'update:modelValue', value: string): void }>()
const { n, classes } = createNamespace('pagination')
const text = usePaginationLocale()
const value = computed({ get: () => props.modelValue, set: (value) => emit('update:modelValue', value) })
const reset = () => {
  value.value = String(props.current)
}
let committing = false
async function commit() {
  if (props.disabled || committing || props.isMigrating()) {
    return
  }
  const raw = value.value.trim()
  if (!/^\d+$/.test(raw) || !Number.isFinite(Number(raw))) {
    reset()
    return
  }
  committing = true
  const page = getLegalPage(Number(raw), { min: 1, max: props.pages })
  if (page !== props.current) {
    emit('change', page)
  }
  await nextTick()
  reset()
  committing = false
}
</script>
<template>
  <span :class="classes(n('jumper'), [simple, n('jumper--simple')])">
    <span v-if="!simple" :class="n('jumper-prepend')"
      ><slot name="jumper-prepend">{{ text.goto }}</slot></span
    >
    <PaginationInput
      v-model="value"
      :class="n('input')"
      :size="size"
      :disabled="disabled || !pages"
      :label="text.goto"
      @commit="commit"
    />
    <span v-if="$slots['jumper-append']" :class="n('jumper-append')"><slot name="jumper-append" /></span>
    <span v-if="simple" :class="n('page-count')">/ {{ pages }}</span>
  </span>
</template>
