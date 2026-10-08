<template>
  <PopupPresentation :controller="controller">
    <template #reference><slot name="reference" /></template>
    <Picker
      v-bind="controller.props.pickerProps"
      :field-names="{ label: 'text', value: 'value', children: 'children' }"
      :toolbar="false"
      :cascade="true"
      :columns="columns"
      :model-value="wheel"
      @update:model-value="updateWheel"
    />
    <template #footer>
      <div v-if="controller.props.checkStrictly" :class="n('draft')">
        <button v-for="key in wheel" :key="key" type="button" @click="choose(String(key))">
          {{ controller.optionMap.get(String(key))?.label }}
        </button>
      </div>
      <div v-if="controller.props.multiple" :class="n('draft')">
        <button
          v-for="[key] in controller.computedValueMap"
          :key="key"
          type="button"
          :disabled="controller.optionMap.get(key)?.disabled"
          @click="remove(key)"
        >
          {{ controller.optionMap.get(key)?.label }} ×
        </button>
        <Button :class="n('add')" block @click="add">{{ addText }}</Button>
      </div>
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
import type { PickerColumnOption } from '../../picker/props'
import { createNamespace } from '../../utils/components'
import type { CascaderOptionInfo } from '../types'
import type { CascaderController } from '../use-cascader-controller'

const { controller } = defineProps<{ controller: UnwrapNestedRefs<CascaderController> }>()
const { n } = createNamespace('selection-presentation')
const { t: providerTranslate } = injectLocaleProvider()
const addText = computed(() => providerTranslate?.('cascaderPickerAddButtonText') ?? t('cascaderPickerAddButtonText'))
const wheel = ref<(string | number)[]>([])
const normalize = (options: CascaderOptionInfo[]): PickerColumnOption[] =>
  options.map((option) => ({
    text: option.label,
    value: option.key,
    disabled: option.disabled,
    children: option.children ? normalize(option.children) : undefined,
  }))
const columns = computed(() => normalize(controller.optionInfos))
function choose(key: string) {
  const option = controller.optionMap.get(key)
  if (option) {
    controller.handleClickOption(option, true)
  }
}
function updateWheel(value: (string | number)[]) {
  wheel.value = value
  const key = String(value[value.length - 1] ?? '')
  const option = controller.optionMap.get(key)
  if (option) {
    controller.expandOption(option)
  }
  if (!controller.props.multiple && controller.computedOpen) {
    choose(key)
  }
}
watch(
  () => [controller.computedOpen, controller.optionInfos, controller.props.modelValue],
  () => {
    if (!controller.computedOpen) {
      return
    }
    const selected = [...controller.computedValueMap.keys()].pop()
    const option = selected ? controller.optionMap.get(selected) : undefined
    if (option) {
      updateWheel(option.path.map((node) => node.key))
      return
    }
    const keys: string[] = []
    let nodes = controller.optionInfos
    while (nodes.length) {
      const node = nodes.find((node) => !node.disabled)
      if (!node) {
        break
      }
      keys.push(node.key)
      nodes = node.children ?? []
    }
    updateWheel(keys)
  },
  { immediate: true, flush: 'post' },
)
function add() {
  choose(String(wheel.value[wheel.value.length - 1] ?? ''))
}
function remove(key: string) {
  const option = controller.optionMap.get(key)
  if (option) {
    controller.handleClickOption(option, false)
  }
}
</script>
