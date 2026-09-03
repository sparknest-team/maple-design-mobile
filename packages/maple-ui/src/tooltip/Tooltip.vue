<template>
  <mp-trigger
    ref="triggerRef"
    :open="$props.open"
    :disabled="disabled"
    :trigger="trigger"
    :reference="reference"
    :placement="placement"
    :strategy="strategy"
    :offset-x="offsetX"
    :offset-y="offsetY"
    :popup-container="popupContainer"
    :same-width="sameWidth"
    :close-on-click-reference="closeOnClickReference"
    :esc-to-close="escToClose"
    :popup-class="classes(n('tooltip'), n('$--box'))"
    :animation-name="n()"
    @update:open="$emit('update:open', $event)"
    @open="$emit('open')"
    @opened="$emit('opened')"
    @close="$emit('close')"
    @closed="$emit('closed')"
    @click-outside="$emit('click-outside', $event)"
  >
    <slot />
    <template #content>
      <div
        :style="{ background: color, color: textColor }"
        :class="classes(n('content-container'), n(`--${type}`))"
        role="tooltip"
      >
        <slot name="content">{{ content }}</slot>
      </div>
    </template>
  </mp-trigger>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import MpTrigger, { type TriggerInstance } from '../trigger'
import { createNamespace } from '../utils/components'
import { props } from './props'

const { name, n, classes } = createNamespace('tooltip')

export default defineComponent({
  name,
  props,
  emits: ['update:open', 'open', 'opened', 'close', 'closed', 'click-outside'],
  components: { MpTrigger },
  setup() {
    const triggerRef = ref<TriggerInstance>()
    const open = () => triggerRef.value?.open()
    const close = () => triggerRef.value?.close()
    const resize = () => triggerRef.value?.resize()
    const setReference = (...args: Parameters<TriggerInstance['setReference']>) =>
      triggerRef.value?.setReference(...args)

    return {
      triggerRef,
      n,
      classes,
      resize,
      open,
      close,
      setReference,
    }
  },
})
</script>
