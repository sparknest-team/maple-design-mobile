<template>
  <Teleport :to="popupTarget" :disabled="disabled || popupContainer === false">
    <transition :name="`${n()}-fade`" @after-enter="$emit('opened')" @after-leave="$emit('closed')">
      <mp-message-core
        v-bind="$props"
        :class="n('transition')"
        @update:open="$emit('update:open', $event)"
        @open="$emit('open')"
        @close="$emit('close')"
      >
        <slot />
        <template v-if="$slots.icon" #icon>
          <slot name="icon" />
        </template>
        <template v-if="$slots.action" #action>
          <slot name="action" />
        </template>
      </mp-message-core>
    </transition>
  </Teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { createNamespace, useTeleport } from '../utils/components'
import { usePopupContainer } from '../utils/popup-container'
import MpMessageCore from './Core.vue'
import { props } from './props'

const { name, n } = createNamespace('message')

export default defineComponent({
  name,
  components: { MpMessageCore },
  props,
  emits: ['update:open', 'open', 'opened', 'close', 'closed'],
  setup(props) {
    const popupTarget = usePopupContainer(() => props.popupContainer)
    const { disabled } = useTeleport()

    return {
      popupTarget,
      disabled,
      n,
    }
  },
})
</script>
