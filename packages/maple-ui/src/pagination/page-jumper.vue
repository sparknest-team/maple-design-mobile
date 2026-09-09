<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import type { PropType } from 'vue'
import { createNamespace } from '../utils/components'
import type { ComponentSize } from '../utils/constants'
import PaginationInput from './page-input.vue'
import { usePaginationLocale } from './platform'
import { getLegalPage } from './utils'

defineOptions({ name: createNamespace('pagination-jumper').name })
const props = defineProps({
  current: { type: Number, required: true },
  pages: { type: Number, required: true },
  simple: Boolean,
  disabled: Boolean,
  size: String as PropType<ComponentSize>,
})
const emit = defineEmits<{ (event: 'change', page: number): void }>()
const { n, classes } = createNamespace('pagination')
const text = usePaginationLocale()
const value = ref(props.simple ? String(props.current) : '')
const reset = () => {
  value.value = props.simple ? String(props.current) : ''
}
let committing = false
async function commit() {
  if (props.disabled || committing) {
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
watch(() => [props.current, props.simple], reset)
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
