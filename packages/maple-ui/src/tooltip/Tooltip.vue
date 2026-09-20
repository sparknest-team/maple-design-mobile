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
      <div v-bind="contentBindings" :id="contentId" role="tooltip">
        <slot name="content">{{ content }}</slot>
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
const contentId = `${createNamespace('tooltip').n()}-${useId()}`
const appearance = useAppearance(props)
const controls = useTriggerWrapper(props, attrs, () => appearance.triggerBindings.value)
const { triggerRef, triggerBindings } = controls
const { contentBindings } = appearance

function semanticReferenceAttrs(open: boolean): TriggerReferenceAttrs {
  const custom = typeof props.referenceAttrs === 'function' ? props.referenceAttrs(open) : props.referenceAttrs
  return { ...custom, 'aria-describedby': open ? contentId : undefined }
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
