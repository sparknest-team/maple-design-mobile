<template>
  <Teleport :to="teleport === false ? undefined : teleport" :disabled="disabled || teleport === false">
    <transition :name="`${n()}-fade`" @after-enter="onOpened" @after-leave="onClosed">
      <mp-message-core v-bind="$props" :class="n('transition')">
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
import MpMessageCore from './core.vue'
import { props } from './props'

const { name, n } = createNamespace('message')

export default defineComponent({
  name,
  components: { MpMessageCore },
  props,
  setup() {
    const { disabled } = useTeleport()

    return {
      disabled,
      n,
    }
  },
})
</script>

<style lang="less">
@import '../styles/common';
</style>
