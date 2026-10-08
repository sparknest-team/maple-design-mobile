<template>
  <component :is="presentations[presentation].component" :controller="controller">
    <template #reference>
      <SelectionField
        ref="fieldRef"
        :show-tags="showTags"
        :separator="separator"
        :text-align="textAlign"
        :hint="mergedHint"
        :line="line"
        :text-color="textColor"
        :focus-color="focusColor"
        :blur-color="blurColor"
        :items="fieldItems"
        :input-value="computedInputValue"
        :disabled="mergedDisabled"
        :readonly="mergedReadonly"
        :error="mergedError"
        :multiple="multiple"
        :clearable="clearable"
        :searchable="filterable"
        :size="mergedSize"
        :variant="mergedVariant"
        :open="computedOpen"
        :placeholder="placeholder"
        :loading="loading"
        :max-tag-count="maxTagCount"
        :tag-nowrap="tagNowrap"
        v-bind="$attrs"
        @update:input-value="handleInputValueChange"
        @clear="handleClear"
        @focus="handleFocus"
        @blur="handleBlur"
        @remove="handleRemove"
        @keydown="handleKeyDown"
      >
        <template v-if="$slots.label" #label="data">
          <slot name="label" v-bind="data" />
        </template>
        <template v-if="$slots.prefix" #prefix>
          <slot name="prefix" />
        </template>
        <template v-if="$slots.selected" #selected><slot name="selected" /></template>
        <template v-if="$slots.suffix" #suffix><slot name="suffix" /></template>
        <template v-if="$slots['clear-icon']" #clear-icon="scope"><slot name="clear-icon" v-bind="scope" /></template>
        <template v-if="$slots['arrow-icon']" #arrow-icon>
          <slot name="arrow-icon" />
        </template>
        <template v-if="$slots['loading-icon']" #loading-icon>
          <slot name="loading-icon" />
        </template>
        <template v-if="$slots['search-icon']" #search-icon>
          <slot name="search-icon" />
        </template>
      </SelectionField>
    </template>
    <CascaderMenu :controller="controller">
      <template v-for="(_, slotName) in $slots" #[slotName]="scope"
        ><slot :name="slotName" v-bind="scope || {}"
      /></template>
    </CascaderMenu>
  </component>
</template>
<script setup lang="ts">
import { reactive, ref, toRefs, useSlots } from 'vue'
import SelectionField from '../_components/selection-field/SelectionField.vue'
import { createNamespace } from '../utils/components'
import CascaderMenu from './CascaderMenu.vue'
import { cascaderEmits } from './emits'
import { presentations } from './presentations'
import { cascaderProps } from './props'
import { useCascaderController } from './use-cascader-controller'

defineOptions({ name: createNamespace('cascader').name, inheritAttrs: false })
const props = defineProps(cascaderProps)
const emit = defineEmits(cascaderEmits)
const controller = reactive(useCascaderController(props, { emit, slots: useSlots() }))
const {
  fieldItems,
  computedInputValue,
  mergedDisabled,
  mergedReadonly,
  mergedError,
  mergedSize,
  mergedVariant,
  mergedHint,
  computedOpen,
  handleInputValueChange,
  handleClear,
  handleFocus,
  handleBlur,
  handleRemove,
  handleKeyDown,
} = toRefs(controller)
const fieldRef = ref<InstanceType<typeof SelectionField>>()
defineExpose({ focus: () => fieldRef.value?.focus(), blur: () => fieldRef.value?.blur() })
</script>
