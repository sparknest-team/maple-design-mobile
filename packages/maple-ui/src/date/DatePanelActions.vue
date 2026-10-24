<template>
  <div v-if="showNow || showQuick || showConfirm || $slots.default" :class="n()">
    <slot
      v-bind="{
        confirm: () => emit('confirm'),
        disabled: !canConfirm,
        selectNow: () => emit('select-now'),
        nowDisabled,
      }"
    >
      <Button
        v-if="showQuick"
        variant="text"
        status="primary"
        :class="n('quick')"
        :aria-label="quickOpen ? '返回日期时间选择' : '快捷选择'"
        :aria-pressed="Boolean(quickOpen)"
        :disabled="quickDisabled"
        @click="emit('toggle-quick')"
        ><IconThunderbolt :size="20" aria-hidden="true"
      /></Button>
      <Button v-if="showNow" variant="text" :disabled="nowDisabled" @click="emit('select-now')">{{ nowText }}</Button>
      <Button v-if="showConfirm" status="primary" :disabled="!canConfirm" @click="emit('confirm')">{{
        confirmText
      }}</Button>
    </slot>
  </div>
</template>
<script setup lang="ts">
import { IconThunderbolt } from '@maple-design/icons-vue'
import Button from '../button'
import { createNamespace } from '../utils/components'
import { usePanelActionsLocale } from './presentation/use-panel-actions-locale'

defineOptions({ name: createNamespace('date-panel-actions').name })
const { n } = createNamespace('date-panel-actions')
defineProps<{
  showNow: boolean
  showConfirm: boolean
  nowDisabled: boolean
  canConfirm: boolean
  showQuick?: boolean
  quickOpen?: boolean
  quickDisabled?: boolean
}>()
const emit = defineEmits<{ 'select-now': []; confirm: []; 'toggle-quick': [] }>()
const { nowText, confirmText } = usePanelActionsLocale()
</script>
