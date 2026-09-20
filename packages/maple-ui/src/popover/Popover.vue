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
import { useAttrs, useId } from 'vue'
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
    'aria-haspopup': 'true',
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
