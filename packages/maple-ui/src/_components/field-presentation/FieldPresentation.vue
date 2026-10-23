<template>
  <div v-if="readPretty" v-bind="$attrs" :class="n('read')">
    <slot name="read">{{ text || '—' }}</slot>
  </div>
  <slot v-else-if="presentation === 'inline'" />
  <template v-else>
    <FieldReference
      v-bind="$attrs"
      ref="reference"
      :label="label || placeholder"
      :text="text"
      :placeholder="placeholder"
      :open="open"
      :disabled="disabled || readonly || pending"
      @open="$emit('open', true)"
    />
    <Popup
      v-if="presentation === 'popup'"
      :aria-label="label || placeholder"
      :open="open"
      :popup-container="popupContainer"
      placement="bottom"
      :overlay-closable="!pending"
      :esc-to-close="!pending"
      @update:open="!$event && $emit('cancel')"
    >
      <EditorPanel ref="panel" v-bind="panelProps" @confirm="$emit('confirm')" @cancel="$emit('cancel')"
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
import type { FieldPresentation } from './context'
import EditorPanel from './EditorPanel.vue'
import FieldReference from './FieldReference.vue'

defineOptions({ name: createNamespace('field-presentation').name, inheritAttrs: false })
const props = defineProps<{
  commit?: () => unknown | Promise<unknown>
  presentation: FieldPresentation
  readPretty?: boolean
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
const emit = defineEmits<{ open: [value: boolean]; confirm: []; cancel: [] }>()
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
  [() => props.open, () => props.presentation, () => props.disabled, () => props.readonly],
  ([open, presentation], previous) => {
    const generation = ++focusGeneration
    if (!open && previous?.[0] && canFocus() && presentation !== 'inline' && !props.readPretty) {
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
          props.presentation === presentation &&
          reference.value === target
        ) {
          target?.focus()
        }
      })
    }
  },
  { flush: 'sync' },
)
defineExpose({
  focus: () => {
    if (canFocus()) {
      reference.value?.focus()
    }
  },
})
void emit
</script>
