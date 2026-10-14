<template>
  <div v-if="showNow || showConfirm" :class="n()">
    <slot
      v-bind="{
        confirm: () => emit('confirm'),
        disabled: !canConfirm,
        selectNow: () => emit('select-now'),
        nowDisabled,
      }"
    >
      <Button v-if="showNow" variant="text" :disabled="nowDisabled" @click="emit('select-now')">{{ nowText }}</Button>
      <Button v-if="showConfirm" :disabled="!canConfirm" @click="emit('confirm')">{{ confirmText }}</Button>
    </slot>
  </div>
</template>
<script setup lang="ts">
import Button from '../button'
import { createNamespace } from '../utils/components'
import { usePanelActionsLocale } from './presentation/use-panel-actions-locale'

defineOptions({ name: createNamespace('date-panel-actions').name })
const { n } = createNamespace('date-panel-actions')
defineProps<{ showNow: boolean; showConfirm: boolean; nowDisabled: boolean; canConfirm: boolean }>()
const emit = defineEmits<{ 'select-now': []; confirm: [] }>()
const { nowText, confirmText } = usePanelActionsLocale()
</script>
