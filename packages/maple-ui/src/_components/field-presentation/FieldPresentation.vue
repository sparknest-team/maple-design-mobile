<template>
  <div v-if="readPretty" v-bind="$attrs" :class="n('read')" :aria-busy="loading || undefined">
    <slot name="read">{{ (empty ?? !text) ? (emptyText ?? '-') : text }}</slot>
    <PendingFeedback :loading="loading" />
  </div>
  <slot v-else-if="editMode === 'direct'" />
  <template v-else>
    <slot name="reference"
      ><FieldReference
        v-bind="$attrs"
        ref="reference"
        :label="label || placeholder"
        :text="text"
        :placeholder="placeholder"
        :open="open"
        :loading="loading || pending"
        :open-trigger-target="openTriggerTarget"
        :disabled="disabled || readonly || pending"
        @open="$emit('open', true)"
    /></slot>
    <Popup
      v-if="editMode === 'popup'"
      :aria-label="label || placeholder"
      :open="open"
      :popup-container="popupContainer"
      placement="bottom"
      :overlay-closable="!pending"
      :esc-to-close="!pending"
      :swipe-to-close="!pending"
      @update:open="!$event && $emit('cancel')"
    >
      <EditorPanel
        ref="panel"
        :clearable="clearable"
        v-bind="panelProps"
        @clear="$emit('clear')"
        @confirm="$emit('confirm')"
        @cancel="$emit('cancel')"
        ><slot
      /></EditorPanel>
    </Popup>
  </template>
</template>
<script setup lang="ts">
import { computed, nextTick, onActivated, onBeforeUnmount, onDeactivated, ref, watch } from 'vue'
import Popup from '../../popup'
import { createNamespace } from '../../utils/components'
import type { PopupContainer } from '../../utils/popup-container'
import PendingFeedback from '../pending-feedback/PendingFeedback.vue'
import type { FieldEditMode } from './context'
import EditorPanel from './EditorPanel.vue'
import FieldReference from './FieldReference.vue'

defineOptions({ name: createNamespace('field-presentation').name, inheritAttrs: false })
const props = defineProps<{
  clearable?: boolean
  commit?: () => unknown | Promise<unknown>
  referenceFocus?: () => void
  openTriggerTarget?: 'field' | 'icon'
  editMode: FieldEditMode
  empty?: boolean
  emptyText?: string
  readPretty?: boolean
  loading?: boolean
  text?: string
  placeholder?: string
  intent?: 'input' | 'select'
  label?: string
  open?: boolean
  popupContainer?: PopupContainer
  confirmDisabled?: boolean
  pending?: boolean
  disabled?: boolean
  readonly?: boolean
  needConfirm?: boolean
  error?: string
  count?: number
  limit?: number
}>()
const emit = defineEmits<{ open: [value: boolean]; confirm: []; cancel: []; clear: [] }>()
const { n } = createNamespace('field-presentation')
const reference = ref<InstanceType<typeof FieldReference>>()
const panel = ref<InstanceType<typeof EditorPanel>>()
let active = true
let disposed = false
let focusGeneration = 0
const canFocus = () => active && !disposed
onActivated(() => {
  if (!disposed) {
    active = true
  }
})
onDeactivated(() => {
  active = false
  focusGeneration++
})
onBeforeUnmount(() => {
  disposed = true
  active = false
  focusGeneration++
})
const panelProps = computed(() => ({
  intent: props.intent,
  label: props.label,
  pending: props.pending,
  disabled: props.disabled || props.readonly || props.confirmDisabled,
  needConfirm: props.needConfirm,
  error: props.error,
  count: props.count,
  limit: props.limit,
}))
watch(
  [() => props.open, () => props.editMode, () => props.disabled, () => props.readonly],
  ([open, editMode], previous) => {
    const generation = ++focusGeneration
    if (!open && previous?.[0] && canFocus() && editMode !== 'direct' && !props.readPretty) {
      const target = reference.value
      let pending = true
      nextTick(() => {
        if (!pending) {
          return
        }
        pending = false
        if (
          canFocus() &&
          !props.open &&
          !props.disabled &&
          !props.readonly &&
          generation === focusGeneration &&
          props.editMode === editMode &&
          reference.value === target
        ) {
          if (props.referenceFocus) {
            props.referenceFocus()
          } else {
            target?.focus()
          }
        }
      })
    }
  },
  { flush: 'sync' },
)
defineExpose({
  focus: () => {
    if (canFocus()) {
      if (props.referenceFocus) {
        props.referenceFocus()
      } else {
        reference.value?.focus()
      }
    }
  },
})
void emit
</script>
