<template>
  <span
    v-if="openTriggerTarget === 'icon'"
    :aria-busy="loading || undefined"
    :class="[n('reference'), n('reference--icon')]"
  >
    <PendingFeedback :loading="loading" /><span>{{ text || placeholder || '—' }}</span>
    <button
      :id="id"
      ref="button"
      :class="n('open-trigger')"
      type="button"
      :disabled="disabled"
      :aria-label="label || placeholder || t('pickerTitle')"
      :aria-expanded="open"
      aria-haspopup="dialog"
      @click="$emit('open')"
    >
      ›
    </button>
  </span>
  <button
    v-else
    :id="id"
    ref="button"
    type="button"
    :aria-busy="loading || undefined"
    :class="n('reference')"
    :disabled="disabled"
    :aria-label="label"
    :aria-expanded="open"
    aria-haspopup="dialog"
    @click="$emit('open')"
  >
    <PendingFeedback :loading="loading" /><span>{{ text || placeholder || '—' }}</span
    ><span aria-hidden="true">›</span>
  </button>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { t } from '../../locale'
import { createNamespace } from '../../utils/components'
import PendingFeedback from '../pending-feedback/PendingFeedback.vue'

defineOptions({ name: createNamespace('field-reference').name })
defineProps<{
  openTriggerTarget?: 'field' | 'icon'
  id?: string
  disabled?: boolean
  loading?: boolean
  label?: string
  text?: string
  placeholder?: string
  open?: boolean
}>()
defineEmits<{ open: [] }>()
const { n } = createNamespace('field-presentation')
const button = ref<HTMLButtonElement>()
defineExpose({ focus: () => button.value?.focus({ preventScroll: true }) })
</script>
