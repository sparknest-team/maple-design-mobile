<template>
  <Trigger
    v-bind="{
      trigger: 'click',
      placement: 'bottom-start',
      animationName: 'slide-dynamic-origin',
      autoFitTransformOrigin: true,
      preventFocus: true,
      popupOffset: 4,
      autoFitPopupWidth: controller.props.autoFitPopupWidth ?? true,
      unmountOnClose: controller.props.unmountOnClose ?? false,
      closeOnClickReference: !(controller.props.filterable || controller.props.creatable),
      ...controller.props.triggerProps,
    }"
    :open="controller.computedOpen"
    :disabled="controller.mergedDisabled || controller.mergedReadonly"
    :popup-container="
      controller.props.popupContainer !== undefined
        ? controller.props.popupContainer
        : controller.props.triggerProps?.popupContainer
    "
    @update:open="controller.handleOpenChange"
  >
    <slot name="reference" />
    <template #content><slot /></template>
  </Trigger>
</template>
<script setup lang="ts">
import Trigger, { type TriggerProps } from '../../trigger'
import { createNamespace } from '../../utils/components'

defineOptions({ name: createNamespace('selection-menu-presentation').name })
defineProps<{
  controller: {
    props: {
      triggerProps?: TriggerProps
      popupContainer?: TriggerProps['popupContainer']
      autoFitPopupWidth?: boolean
      unmountOnClose?: boolean
      filterable?: boolean | object
      creatable?: boolean
    }
    computedOpen: boolean
    mergedDisabled: boolean
    mergedReadonly: boolean
    handleOpenChange: (open: boolean) => void
  }
}>()
</script>
