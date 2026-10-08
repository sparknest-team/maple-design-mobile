<template>
  <PopupPresentation :controller="controller">
    <template #reference><slot name="reference" /></template>
    <!-- Slot Options remain registered without displaying a second menu. -->
    <div hidden><slot /></div>
    <Picker
      v-bind="controller.props.pickerProps"
      :field-names="{ label: 'text', value: 'value', children: 'children' }"
      :cascade="false"
      :toolbar="false"
      :columns="columns"
      :model-value="wheel"
      :selected-values="controller.computedValueKeys"
      @update:model-value="updateWheel"
    />
    <template v-if="controller.props.multiple" #footer>
      <div :class="n('draft')">
        <button
          v-for="key in controller.computedValueKeys"
          :key="key"
          type="button"
          :disabled="controller.optionInfoMap.get(key)?.disabled"
          @click="controller.handleSelect(key, $event)"
        >
          {{ controller.optionInfoMap.get(key)?.label }} ×
        </button>
      </div>
      <Button :class="n('add')" block :disabled="!wheel.length || controller.props.loading" @click="add">{{
        addText
      }}</Button>
    </template>
  </PopupPresentation>
</template>
<script setup lang="ts">
import { computed, ref, watch, type UnwrapNestedRefs } from 'vue'
import PopupPresentation from '../../_components/selection-field/PopupPresentation.vue'
import Button from '../../button'
import { t } from '../../locale'
import { injectLocaleProvider } from '../../locale-provider/provide'
import { _PickerComponent as Picker } from '../../picker'
import { createNamespace } from '../../utils/components'
import type { SelectController } from '../use-select-controller'

const { controller } = defineProps<{ controller: UnwrapNestedRefs<SelectController> }>()
const { n } = createNamespace('selection-presentation')
const { t: providerTranslate } = injectLocaleProvider()
const addText = computed(() => providerTranslate?.('cascaderPickerAddButtonText') ?? t('cascaderPickerAddButtonText'))
const wheel = ref<(string | number)[]>([])
const columns = computed(() => [
  controller.validOptionInfos.map((option) => ({ text: option.label, value: option.key, disabled: option.disabled })),
])
function updateWheel(value: (string | number)[]) {
  wheel.value = value
  if (!controller.props.multiple && value.length && controller.computedOpen) {
    controller.handleSelect(String(value[0]), new Event('change'))
  }
}
watch(
  () => [controller.computedOpen, controller.validOptionInfos, controller.props.modelValue],
  () => {
    if (!controller.computedOpen) {
      return
    }
    const selected = controller.computedValueKeys.find((key) => controller.optionInfoMap.has(key))
    const key = selected ?? controller.validOptionInfos.find((option) => !option.disabled)?.key
    updateWheel(key ? [key] : [])
  },
  { immediate: true, flush: 'post' },
)
function add(event: Event) {
  const key = String(wheel.value[0] ?? '')
  if (!controller.computedValueKeys.includes(key)) {
    controller.handleSelect(key, event)
  }
}
</script>
