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
      <div
        v-if="!hideEmpty || hasContent()"
        v-bind="contentBindings"
        :id="contentId"
        role="group"
        :aria-labelledby="title || $slots.title ? titleId : undefined"
      >
        <div v-if="title || $slots.title" :id="titleId" :class="titleClass">
          <slot name="title">{{ title }}</slot>
        </div>
        <div :class="bodyClass">
          <slot name="content">{{ content }}</slot>
        </div>
      </div>
    </template>
  </Trigger>
</template>

<script setup lang="ts">
import { Comment, Fragment, Text, useAttrs, useId, useSlots, type VNode } from 'vue'
import Trigger from '../trigger'
import type { TriggerReferenceAttrs } from '../trigger'
import { useTriggerWrapper } from '../trigger/wrapper'
import { createNamespace } from '../utils/components'
import { useAppearance } from './platform'
import { popoverProps } from './props'

defineOptions({ name: createNamespace('popover').name, inheritAttrs: false })

const props = defineProps(popoverProps)
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

// Keep Vue's slot fallback semantics: comment-only slots fall back to props,
// while whitespace text is a valid slot but does not make an empty panel useful.
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
function hasContent() {
  const title = slotState(slots.title?.() ?? [])
  const body = slotState(slots.content?.() ?? [])
  return (
    (title.valid ? title.meaningful : Boolean(props.title?.trim())) ||
    (body.valid ? body.meaningful : Boolean(props.content?.trim()))
  )
}
const uid = useId()
const contentId = `${createNamespace('popover').n()}-${uid}`
const titleId = `${contentId}-title`
const appearance = useAppearance(props)
const controls = useTriggerWrapper(props, attrs, () => appearance.triggerBindings.value)
const { triggerRef, triggerBindings } = controls
const { contentBindings, titleClass, bodyClass } = appearance

function semanticReferenceAttrs(open: boolean): TriggerReferenceAttrs {
  const custom = typeof props.referenceAttrs === 'function' ? props.referenceAttrs(open) : props.referenceAttrs
  return {
    ...custom,
    'aria-controls': contentId,
    'aria-expanded': open,
  }
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
