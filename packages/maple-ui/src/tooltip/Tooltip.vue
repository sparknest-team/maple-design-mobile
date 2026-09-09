<template>
  <Trigger
    ref="triggerRef"
    v-bind="triggerBindings"
    :trigger="trigger"
    :unmount-on-close="unmountOnClose"
    @update:open="$emit('update:open', $event)"
    @open-change="$emit('open-change', $event)"
    @open="$emit('open')"
    @opened="$emit('opened')"
    @close="$emit('close')"
    @closed="$emit('closed')"
    @click-outside="$emit('click-outside', $event)"
  >
    <slot />
    <template #content>
      <div v-bind="contentBindings" role="tooltip">
        <slot name="content">{{ content }}</slot>
      </div>
    </template>
  </Trigger>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Trigger from '../trigger'
import { useTriggerWrapper } from '../trigger/wrapper'
import { createNamespace } from '../utils/components'
import { useAppearance } from './platform'
import { tooltipProps } from './props'

export default defineComponent({
  name: createNamespace('tooltip').name,
  inheritAttrs: false,
  components: { Trigger },
  props: tooltipProps,
  emits: ['update:open', 'open-change', 'open', 'opened', 'close', 'closed', 'click-outside'],
  setup(props, { attrs }) {
    const appearance = useAppearance(props)
    return {
      ...appearance,
      ...useTriggerWrapper(props, attrs, () => appearance.triggerBindings.value),
    }
  },
})
</script>
