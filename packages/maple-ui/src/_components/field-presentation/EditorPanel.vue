<template>
  <section
    ref="panelElement"
    :class="n('panel')"
    :aria-label="label"
    :aria-busy="pending || undefined"
    @keydown.esc.stop="!pending && $emit('cancel')"
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
    <div :class="n('body')" :inert="pending || undefined"><slot /></div>
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
        @click="!pending && $emit('confirm')"
        >{{ confirmText }}</Button
      >
    </footer>
  </section>
</template>
<script setup lang="ts">
import { computed, provide, ref, shallowRef } from 'vue'
import Button from '../../button'
import { t } from '../../locale'
import { injectLocaleProvider } from '../../locale-provider/provide'
import { createNamespace } from '../../utils/components'
import { fieldEditorBoundary } from './context'
import { editorAuxiliaryActions, editorAuxiliaryFeedback } from './editor-actions'
import { isolateEditorForm } from './form-bridge'
import { useFieldTexts } from './texts'

const props = defineProps<{
  clearable?: boolean
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
defineEmits<{ confirm: []; cancel: []; clear: [] }>()
defineOptions({ name: createNamespace('field-editor-panel').name })
const { n } = createNamespace('field-presentation')
const auxiliaryActions = shallowRef<() => import('vue').VNodeChild>()
provide(editorAuxiliaryActions, auxiliaryActions)
const auxiliaryFeedback = shallowRef<string>()
provide(editorAuxiliaryFeedback, auxiliaryFeedback)
provide(fieldEditorBoundary, true)
isolateEditorForm()
const { t: translate } = injectLocaleProvider()
const confirmText = computed(() => translate?.('pickerConfirmButtonText') ?? t('pickerConfirmButtonText'))
const texts = useFieldTexts()
const closeText = texts.close
const clearText = texts.clear
const panelElement = ref<HTMLElement>()
defineExpose({
  focus: () => panelElement.value?.querySelector<HTMLInputElement>('input')?.focus({ preventScroll: true }),
})
void props
</script>
