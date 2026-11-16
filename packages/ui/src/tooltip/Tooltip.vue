<template>
  <Trigger
    ref="triggerRef"
    v-bind="triggerBindings"
    :reference-attrs="semanticReferenceAttrs"
    @update:open="emit('update:open', $event)"
    @open-change="emit('open-change', $event)"
    @open="emit('open')"
    @opened="emit('opened')"
    @close="emit('close')"
    @closed="emit('closed')"
    @click-outside="emit('click-outside', $event)"
  >
    <slot />
    <template #content>
      <div v-if="!hideEmpty || updateContent()" v-bind="contentBindings" :id="contentId" role="tooltip">
        <slot name="content">{{ content }}</slot>
      </div>
    </template>
  </Trigger>
</template>

<script setup lang="ts">
import { Comment, Fragment, ref, Text, useAttrs, useSlots, type VNode } from 'vue'
import Trigger from '../trigger'
import type { TriggerReferenceAttrs } from '../trigger'
import { useTriggerWrapper } from '../trigger/wrapper'
import { createNamespace } from '../utils/components'
import { useId } from '../utils/vue-compat'
import { useAppearance } from './platform'
import { tooltipProps } from './props'

defineOptions({ name: createNamespace('tooltip').name, inheritAttrs: false })

const props = defineProps(tooltipProps)
const emit = defineEmits<{
  'update:open': [open: boolean]
  'open-change': [open: boolean]
  open: []
  opened: []
  close: []
  closed: []
  'click-outside': [event: Event]
}>()
const attrs = useAttrs()
const slots = useSlots()
function slotState(nodes: VNode[]): { valid: boolean; meaningful: boolean } {
  let valid = false
  let meaningful = false
  for (const node of nodes) {
    if (typeof node === 'string' || typeof node === 'number') {
      valid = true
      meaningful ||= Boolean(String(node).trim())
      continue
    }
    if (!node || node.type === Comment) {
      continue
    }
    if (node.type === Fragment && Array.isArray(node.children)) {
      const child = slotState(node.children as VNode[])
      valid ||= child.valid
      meaningful ||= child.meaningful
    } else {
      valid = true
      meaningful ||= node.type !== Text || Boolean(String(node.children ?? '').trim())
    }
  }
  return { valid, meaningful }
}
const contentAvailable = ref(false)
function updateContent() {
  const content = slotState(slots.content?.() ?? [])
  const available = content.valid ? content.meaningful : Boolean(props.content?.trim())
  contentAvailable.value = available
  return available
}
const contentId = `${createNamespace('tooltip').n()}-${useId()}`
const appearance = useAppearance(props)
const controls = useTriggerWrapper(props, attrs, () => appearance.triggerBindings.value)
const { triggerRef, triggerBindings } = controls
const { contentBindings } = appearance

function semanticReferenceAttrs(open: boolean): TriggerReferenceAttrs {
  const custom = typeof props.referenceAttrs === 'function' ? props.referenceAttrs(open) : props.referenceAttrs
  const explicit = custom?.['aria-describedby']
  const ids = [
    typeof explicit === 'string' ? explicit : '',
    open && (!props.hideEmpty || contentAvailable.value) ? contentId : '',
  ].filter(Boolean)
  return { ...custom, 'aria-describedby': ids.join(' ') || undefined }
}

defineExpose({
  open: controls.open,
  close: controls.close,
  resize: controls.resize,
  allowClose: controls.allowClose,
  getReference: controls.getReference,
  focusReference: controls.focusReference,
  setReference: controls.setReference,
})
</script>
