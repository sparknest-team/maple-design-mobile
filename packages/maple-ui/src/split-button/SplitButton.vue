<template>
  <mp-button-group
    :class="n()"
    :status="status"
    :size="size"
    :variant="variant"
    :color="color"
    :text-color="textColor"
    :disabled="disabled"
    :elevation="elevation"
  >
    <mp-button v-bind="buttonProps" :auto-loading="autoLoading" @click.stop="handleClick">
      <slot />
    </mp-button>

    <mp-menu
      ref="menuRef"
      v-model:open="computedOpen"
      :disabled="disabled"
      :trigger="trigger"
      :placement="placement"
      :popup-container="popupContainer"
      :popup-max-height="popupMaxHeight"
      :popup-class="popupClass"
      :offset-x="offsetX"
      :offset-y="offsetY"
      :hide-on-select="hideOnSelect"
      @select="handleSelect"
    >
      <mp-button v-bind="triggerButtonProps" icon-container :aria-expanded="computedOpen" aria-haspopup="menu">
        <slot name="icon" :open="computedOpen">
          <m-icon-menu-down />
        </slot>
      </mp-button>

      <template #content>
        <slot name="content" />
      </template>
    </mp-menu>
  </mp-button-group>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { IconMenuDown as MIconMenuDown } from '@maplejs/icons-vue'
import MpButton from '../button'
import MpButtonGroup from '../button-group'
import MpMenu, { type MenuInstance } from '../menu'
import { createNamespace } from '../utils/components'
import { splitButtonProps } from './props'

const { name, n } = createNamespace('split-button')

export default defineComponent({
  name,
  components: { MIconMenuDown, MpButton, MpButtonGroup, MpMenu },
  props: splitButtonProps,
  emits: ['update:open', 'open-change', 'click', 'select'],
  setup(props, { emit }) {
    const uncontrolledOpen = ref(props.defaultOpen)
    const menuRef = ref<MenuInstance>()
    const computedOpen = computed({
      get: () => props.open ?? uncontrolledOpen.value,
      set: (open: boolean) => {
        uncontrolledOpen.value = open
        emit('update:open', open)
        emit('open-change', open)
      },
    })

    const handleClick = (event: Event) => emit('click', event)
    const handleSelect = (value: unknown, option: Record<string, unknown>, event: Event) =>
      emit('select', value, option, event)
    const open = () => menuRef.value?.open()
    const close = () => menuRef.value?.close()
    const resize = () => menuRef.value?.resize()

    return { n, menuRef, computedOpen, handleClick, handleSelect, open, close, resize }
  },
})
</script>

<style lang="less">
@import '../button/button';
@import '../button-group/buttonGroup';
@import '../menu/menu';
@import '../menu-option/menuOption';
</style>
