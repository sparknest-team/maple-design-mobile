<template>
  <SelectionEditor kind="cascader" @keydown="controller.handleKeyDown">
    <CascaderMenu :controller="controller" :searchable="options.filterable || options.multiple"
      ><template v-for="(_, key) in $slots" #[key]="scope"><slot :name="key" v-bind="scope || {}" /></template
    ></CascaderMenu>
  </SelectionEditor>
</template>
<script setup lang="ts">
import { computed, reactive, useSlots, watch, type ExtractPropTypes, type SetupContext } from 'vue'
import SelectionEditor from '../_components/selected-options/SelectionEditor.vue'
import { createNamespace } from '../utils/components'
import CascaderMenu from './CascaderMenu.vue'
import type { cascaderEmits } from './emits'
import type { cascaderProps } from './props'
import { useCascaderController } from './use-cascader-controller'

defineOptions({ name: createNamespace('cascader-editor').name })
const props = defineProps<{ options: Record<string, any>; modelValue?: any }>()
const emit = defineEmits<{
  'update:modelValue': [value: any]
  'update:inputValue': [query: string]
  search: [query: string]
  'input-value-change': [query: string]
}>()
const slots = useSlots()
const editorProps = reactive({
  ...Object.fromEntries(Object.keys(props.options).map((key) => [key, computed(() => props.options[key])])),
  modelValue: computed(() => props.modelValue),
  open: true,
  presentation: 'inline',
})
const forward = ((event: string, ...args: any[]) => {
  if (event === 'update:modelValue') {
    emit('update:modelValue', args[0])
  }
  if (event === 'update:inputValue') {
    emit('update:inputValue', args[0])
  }
  if (event === 'search') {
    emit('search', args[0])
  }
  if (event === 'input-value-change') {
    emit('input-value-change', args[0])
  }
}) as SetupContext<typeof cascaderEmits>['emit']
const controller = reactive(
  useCascaderController(editorProps as Readonly<ExtractPropTypes<typeof cascaderProps>>, { emit: forward, slots }),
)
watch(
  () => [...controller.computedValueMap.keys()],
  (keys) => {
    if (!props.options.multiple && !controller.selectedPath.length && keys.length) {
      controller.setSelectedPath(keys[0])
    }
  },
  { immediate: true },
)
</script>
