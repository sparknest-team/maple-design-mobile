<template>
  <button
    :id="id"
    ref="button"
    type="button"
    :class="n('reference')"
    :disabled="disabled"
    :aria-label="label"
    :aria-expanded="open"
    aria-haspopup="dialog"
    @click="$emit('open')"
  >
    <span>{{ text || placeholder || '—' }}</span
    ><span aria-hidden="true">›</span>
  </button>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { createNamespace } from '../../utils/components'

defineOptions({ name: createNamespace('field-reference').name })
defineProps<{ id?: string; disabled?: boolean; label?: string; text?: string; placeholder?: string; open?: boolean }>()
defineEmits<{ open: [] }>()
const { n } = createNamespace('field-presentation')
const button = ref<HTMLButtonElement>()
defineExpose({ focus: () => button.value?.focus({ preventScroll: true }) })
</script>
