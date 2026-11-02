<template>
  <div :class="n('popup-content')">
    <div :class="n('field')">
      <SearchSelect
        v-if="settings.fields.length"
        :model-value="state.computedField"
        :options="settings.fields"
        :style="settings.selectStyle"
        :disabled="state.searchDisabled"
        :class="n('select')"
        @change="state.handleFieldChange"
      />
      <div v-else-if="settings.label || $slots.label" :class="n('label')">
        <slot name="label">{{ settings.label }}</slot>
      </div>
      <SearchInput
        ref="inputRef"
        :loading="settings.loading && settings.loadingMode === 'line'"
        :loading-mode="settings.loadingMode"
        edit-mode="direct"
        v-bind="inputOptions"
        :model-value="state.computedValue"
        :empty-value="settings.emptyValue"
        :input-attrs="settings.inputAttrs"
        :error="settings.error"
        :placeholder="state.searchPlaceholder"
        :class="n('input')"
        :hint="false"
        :line="false"
        autofocus
        @update:model-value="state.updateValue"
        @input="state.handleInput"
        @change="state.handleChange"
        @clear="state.handleClear"
        @press-enter="state.handleSearch"
        @blur="state.handleBlur"
        @focus="state.handlePopupFocus"
      >
        <template v-if="slots.prefix" #prefix><slot name="prefix" /></template>
        <template v-if="slots.suffix" #suffix><slot name="suffix" /></template>
        <template v-if="slots['clear-icon']" #clear-icon="scope"><slot name="clear-icon" v-bind="scope" /></template>
      </SearchInput>
      <SearchButton :class="n('cancel')" variant="text" :disabled="state.searchDisabled" @click="state.handleCancel">
        {{ state.cancelText }}
      </SearchButton>
    </div>
    <div :class="n('history')">
      <button
        v-for="(item, index) in settings.recentSearches"
        :key="index"
        type="button"
        :class="n('history-item')"
        :disabled="state.searchDisabled"
        @click="state.handleHistorySelect(item, $event)"
      >
        {{ item }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import type { UnwrapNestedRefs } from 'vue'
import SearchButton from '../button'
import SearchInput from '../input'
import { createNamespace } from '../utils/components'
import SearchSelect from './FieldSelect.vue'
import type { SearchResolvedProps } from './props'
import type { SearchSlots } from './types'
import type { SearchControl } from './use-search-control'

const props = defineProps<{ settings: SearchResolvedProps; state: UnwrapNestedRefs<SearchControl> }>()
const slots = defineSlots<SearchSlots>()
const { n } = createNamespace('search')
const inputRef = ref<InstanceType<typeof SearchInput>>()
watch(inputRef, (target) => props.state.setPopupInput(target))
onBeforeUnmount(() => props.state.setPopupInput(undefined))
const inputOptions = computed(() => {
  const {
    modelModifiers,
    type,
    ariaLabel,
    maxLength,
    enterkeyhint,
    textColor,
    focusColor,
    blurColor,
    size,
    variant,
    clearable,
  } = props.settings
  return {
    modelModifiers,
    type,
    ariaLabel,
    maxLength,
    readonly: props.state.mergedReadonly,
    disabled: props.state.mergedDisabled,
    enterkeyhint: enterkeyhint || 'search',
    textColor,
    focusColor,
    blurColor,
    size,
    variant,
    clearable,
  }
})
</script>
