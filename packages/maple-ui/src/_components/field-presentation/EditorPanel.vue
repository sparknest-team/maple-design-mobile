<template>
  <section
    ref="panelElement"
    :class="n('panel')"
    :aria-label="label"
    :aria-busy="pending || undefined"
    @keydown="handleKeydown"
  >
    <header :class="n('toolbar')" data-popup-swipe-handle>
      <span role="heading" aria-level="2">{{
        title || (intent === 'input' ? texts.input.value : texts.select.value)
      }}</span>
      <button
        type="button"
        :class="n('close')"
        :aria-label="closeText"
        :disabled="pending"
        @click="!pending && $emit('cancel')"
      >
        ×
      </button>
    </header>
    <div ref="bodyElement" :class="n('body')" :inert="pending || undefined"><slot /></div>
    <p v-if="count !== undefined" role="status">
      {{ texts.selected.value }} {{ count }}{{ limit ? ` / ${limit}` : '' }}
    </p>
    <p v-if="error || auxiliaryFeedback" role="alert" :class="n('error')">{{ error || auxiliaryFeedback }}</p>
    <footer v-if="needConfirm || auxiliaryActions" :class="n('footer')">
      <div :class="n('auxiliary')"><component :is="auxiliaryActions" v-if="auxiliaryActions" /></div>
      <Button v-if="clearable" variant="text" :disabled="disabled || pending" @click="$emit('clear')">{{
        clearText
      }}</Button>
      <Button
        v-if="needConfirm"
        status="primary"
        :loading="pending"
        :disabled="disabled"
        @mousedown.prevent
        @click="!pending && $emit('confirm', $event)"
        >{{ confirmText }}</Button
      >
    </footer>
  </section>
</template>
<script setup lang="ts">
import { computed, provide, ref, shallowRef } from 'vue'
import Button from '../../button'
import { injectLocaleProvider } from '../../locale-provider/provide'
import { createNamespace } from '../../utils/components'
import { fieldEditorBoundary, fieldEditorPanel } from './context'
import { fieldGlobalText as t } from './default-texts'
import { editorAuxiliaryActions, editorAuxiliaryFeedback } from './editor-actions'
import { isolateEditorForm } from './form-bridge'
import { useFieldTexts } from './texts'

const props = defineProps<{
  clearable?: boolean
  deferEscape?: boolean
  title?: string
  intent?: 'input' | 'select'
  label?: string
  pending?: boolean
  disabled?: boolean
  needConfirm?: boolean
  error?: string
  count?: number
  limit?: number
}>()
const emit = defineEmits<{ confirm: [event?: Event]; cancel: []; clear: [] }>()
function handleKeydown(event: KeyboardEvent) {
  if (event.key !== 'Escape') {
    return
  }
  if (event.defaultPrevented || event.isComposing || event.keyCode === 229 || props.pending) {
    event.stopPropagation()
    return
  }
  if (props.deferEscape) {
    return
  }
  event.stopPropagation()
  emit('cancel')
}
defineOptions({ name: createNamespace('field-editor-panel').name })
const { n } = createNamespace('field-presentation')
const auxiliaryActions = shallowRef<() => import('vue').VNodeChild>()
provide(editorAuxiliaryActions, auxiliaryActions)
const auxiliaryFeedback = shallowRef<string>()
provide(editorAuxiliaryFeedback, auxiliaryFeedback)
provide(fieldEditorBoundary, true)
provide(fieldEditorPanel, true)
isolateEditorForm()
const { t: translate } = injectLocaleProvider()
const confirmText = computed(() => translate?.('pickerConfirmButtonText') ?? t('pickerConfirmButtonText'))
const texts = useFieldTexts()
const closeText = texts.close
const clearText = texts.clear
const panelElement = ref<HTMLElement>()
const bodyElement = ref<HTMLElement>()
defineExpose({
  focus: () => {
    const selector =
      'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), [tabindex="0"]:not([disabled]), button:not([disabled])'
    const target =
      bodyElement.value?.querySelector<HTMLElement>(selector) ??
      panelElement.value?.querySelector<HTMLElement>(selector)
    target?.focus({ preventScroll: true })
  },
  blur: () => {
    const panel = panelElement.value
    const active = panel?.ownerDocument.activeElement
    if (active && panel?.contains(active)) {
      ;(active as HTMLElement).blur?.()
    }
  },
})
void props
</script>
