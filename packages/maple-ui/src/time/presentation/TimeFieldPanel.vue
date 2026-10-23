<template>
  <section :class="n('panel')">
    <div class="mp-time-field-panel__body"><slot /></div>
    <div v-if="!disableConfirm || auxiliaryActions" class="mp-time-field-panel__actions">
      <component :is="auxiliaryActions" v-if="auxiliaryActions" />
      <mp-button
        v-if="!disableConfirm"
        :class="n('confirm-button')"
        status="primary"
        :disabled="!canConfirm"
        @click="$emit('confirm')"
      >
        {{ confirmText }}
      </mp-button>
    </div>
  </section>
</template>
<script setup lang="ts">
import { provide, shallowRef, type VNodeChild } from 'vue'
import { editorAuxiliaryActions } from '../../_components/field-presentation/editor-actions'
import MpButton from '../../button'
import { createNamespace } from '../../utils/components'

defineOptions({ name: createNamespace('time-field-panel').name })
const props = defineProps<{ range?: boolean; disableConfirm?: boolean; canConfirm?: boolean; confirmText?: string }>()
defineEmits<{ confirm: [] }>()
const auxiliaryActions = shallowRef<() => VNodeChild>()
provide(editorAuxiliaryActions, auxiliaryActions)
const n = (element: string) => createNamespace(props.range ? 'time-range' : 'time').n(element)
</script>
