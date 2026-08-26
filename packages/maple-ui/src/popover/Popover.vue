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
    :popup-class="
      classes(
        n('content'),
        n('$--box'),
        popoverClass,
        [defaultStyle, n('--background-color')],
        [defaultStyle, formatElevation(elevation, 3)],
      )
    "
    :close-on-click-reference="closeOnClickReference"
    :esc-to-close="escToClose"
    :align-point="alignPoint"
    :cascade-optimization="cascadeOptimization"
    :animation-name="n()"
    @update:open="$emit('update:open', $event)"
    @open="$emit('open')"
    @opened="$emit('opened')"
    @close="$emit('close')"
    @closed="$emit('closed')"
    @click-outside="$emit('click-outside', $event)"
  >
    <slot />
    <template #content><slot name="content" /></template>
  </mp-trigger>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import MpTrigger, { type TriggerInstance } from '../trigger'
import { createNamespace, formatElevation } from '../utils/components'
import { props } from './props'

const { name, n, classes } = createNamespace('popover')

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
    const allowClose = () => triggerRef.value?.allowClose()

    return {
      triggerRef,
      allowClose,
      formatElevation,
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

<style lang="less">
@import '../styles/elevation';
@import '../styles/common';
@import './popover';
</style>
