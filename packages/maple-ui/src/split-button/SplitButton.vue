<template>
  <ButtonGroup
    :class="n()"
    :status="status"
    :size="size"
    :variant="variant"
    :color="color"
    :text-color="textColor"
    :disabled="disabled"
    :elevation="elevation"
  >
    <Button
      v-bind="{ ...buttonProps, onClick: clickHandlers }"
      :auto-loading="autoLoading"
      :disabled="disabled || buttonProps?.disabled"
    >
      <slot />
    </Button>

    <DropdownMenu
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
      <Button
        v-bind="triggerButtonProps"
        :disabled="disabled || triggerButtonProps?.disabled"
        icon-container
        :aria-expanded="computedOpen"
        aria-haspopup="menu"
      >
        <template #icon>
          <slot name="icon" :open="computedOpen">
            <IconMenuDown />
          </slot>
        </template>
      </Button>

      <template #content>
        <slot name="content" />
      </template>
    </DropdownMenu>
  </ButtonGroup>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { IconMenuDown } from '@maplejs/icons-vue'
import Button, { ButtonGroup, type ButtonHandler } from '../button'
import DropdownMenu, { type DropdownMenuInstance } from '../dropdown-menu'
import { createNamespace } from '../utils/components'
import { splitButtonProps } from './props'

defineOptions({
  name: createNamespace('split-button').name,
})

const props = defineProps(splitButtonProps)
const emit = defineEmits(['update:open', 'open-change', 'select'])

const { n } = createNamespace('split-button')
const menuRef = ref<DropdownMenuInstance>()
const clickHandlers = computed(() =>
  [props.buttonProps?.onClick, props.onClick]
    .flat()
    .filter((handler): handler is ButtonHandler => typeof handler === 'function'),
)

const uncontrolledOpen = ref(props.defaultOpen)
const computedOpen = computed({
  get: () => props.open ?? uncontrolledOpen.value,
  set: (open: boolean) => {
    uncontrolledOpen.value = open
    emit('update:open', open)
    emit('open-change', open)
  },
})

const handleSelect = (value: unknown, option: Record<string, unknown>, event: Event) =>
  emit('select', value, option, event)

const open = () => {
  if (!props.disabled) {
    menuRef.value?.open()
  }
}
const close = () => menuRef.value?.close()
const resize = () => menuRef.value?.resize()
defineExpose({ open, close, resize })
</script>
