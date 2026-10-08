<template>
  <span :class="n('reference')" @click="open"><slot name="reference" /></span>
  <Popup
    v-bind="controller.props.popupProps"
    placement="bottom"
    :unmount-on-close="false"
    :open="controller.computedOpen"
    :popup-container="
      controller.props.popupContainer !== undefined
        ? controller.props.popupContainer
        : controller.props.popupProps?.popupContainer
    "
    @update:open="close"
  >
    <div :class="n()" @keydown.esc.stop="controller.session.cancel">
      <div :class="n('toolbar')">
        <Button :class="n('cancel')" variant="text" @click="controller.session.cancel">{{ cancelText }}</Button>
        <span :class="n('title')">{{ title }}</span>
        <Button
          v-if="controller.deferred"
          :class="n('confirm')"
          variant="text"
          :disabled="
            !controller.canConfirm || controller.mergedDisabled || controller.mergedReadonly || controller.props.loading
          "
          @click="controller.session.commit()"
          >{{ confirmText }}</Button
        >
      </div>
      <div :class="n('content')"><slot /></div>
      <slot name="footer" />
    </div>
  </Popup>
</template>
<script setup lang="ts">
import { computed, type UnwrapNestedRefs } from 'vue'
import Button from '../../button'
import type { CascaderController } from '../../cascader/use-cascader-controller'
import { t } from '../../locale'
import { injectLocaleProvider } from '../../locale-provider/provide'
import Popup from '../../popup'
import type { SelectController } from '../../select/use-select-controller'
import { createNamespace } from '../../utils/components'

defineOptions({ name: createNamespace('selection-popup-presentation').name })
const { controller } = defineProps<{ controller: UnwrapNestedRefs<SelectController | CascaderController> }>()
const { n } = createNamespace('selection-presentation')
const { t: providerTranslate } = injectLocaleProvider()
const translate = (key: Parameters<typeof t>[0]) => providerTranslate?.(key) ?? t(key)
const title = computed(() => controller.props.pickerProps?.title ?? translate('pickerTitle'))
const cancelText = computed(() => controller.props.pickerProps?.cancelButtonText ?? translate('pickerCancelButtonText'))
const confirmText = computed(
  () => controller.props.pickerProps?.confirmButtonText ?? translate('pickerConfirmButtonText'),
)
function open() {
  if (!controller.mergedDisabled && !controller.mergedReadonly) {
    controller.handleOpenChange(true)
  }
}
function close(value: boolean) {
  if (!value) {
    controller.session.cancel()
  }
}
</script>
