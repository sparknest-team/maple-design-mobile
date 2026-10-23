<template>
  <div :class="classes(n(), n('$--box'), n(`--${shape}`), [mergedDisabled, n('--disabled')])" :style="{ background }">
    <mp-menu
      v-if="!historyPopup && recentSearches.length"
      ref="historyMenu"
      :open="historyMenuVisible"
      :reference="fieldRef"
      :options="historyOptions"
      :auto-fit-popup-width="true"
      :popup-class="n('history-menu')"
      placement="bottom-start"
      trigger="click"
      :close-on-click-reference="false"
      @update:open="handleHistoryMenuVisibleChange"
      @select="handleHistoryMenuSelect"
    />

    <div ref="fieldRef" :class="n('field')" :style="{ background: inputBackground }">
      <mp-select
        v-if="fields.length"
        ref="select"
        :model-value="computedField"
        :options="fields"
        :style="selectStyle"
        :class="n('select')"
        :hint="false"
        :line="false"
        :clearable="false"
        :disabled="searchDisabled"
        placement="bottom-start"
        @change="handleFieldChange"
      />

      <div v-else-if="label || $slots.label" :class="n('label')">
        <slot name="label">{{ label }}</slot>
      </div>

      <mp-input
        ref="input"
        :model-value="computedValue"
        :model-modifiers="modelModifiers"
        :input-attrs="inputAttrs"
        :error="error"
        :type="type"
        :aria-label="ariaLabel"
        :placeholder="searchPlaceholder"
        :max-length="maxLength"
        :readonly="mergedReadonly"
        :disabled="mergedDisabled"
        :autofocus="autofocus"
        :enterkeyhint="enterkeyhint || 'search'"
        :text-color="textColor"
        :focus-color="focusColor"
        :blur-color="blurColor"
        :size="mergedSize"
        :variant="variant"
        :clearable="clearable"
        :hint="false"
        :class="n('input')"
        @focus="handleFocus"
        @blur="handleBlur"
        @update:model-value="updateValue"
        @input="handleInput"
        @change="handleChange"
        @clear="handleClear"
        @press-enter="handleSearch"
        @click="openHistory"
      >
        <template #prefix>
          <slot name="prefix">
            <button
              :class="n('icon-button')"
              type="button"
              :disabled="searchDisabled"
              :aria-label="buttonText || searchText"
              @click="handleSearch"
            >
              <mp-loading v-if="loading" size="sm" />
              <mp-registered-icon
                v-else
                :class="n('search-icon')"
                :name="searchIcon"
                :fallback="searchIcon === 'search' ? IconSearch : undefined"
                aria-hidden="true"
              />
            </button>
          </slot>
        </template>

        <template v-if="$slots['clear-icon']" #clear-icon="{ clear }">
          <slot name="clear-icon" :clear="clear" />
        </template>

        <template v-if="$slots.suffix" #suffix>
          <slot name="suffix" />
        </template>
      </mp-input>
    </div>

    <mp-button
      v-if="effectiveShowAction"
      :class="n('action')"
      variant="text"
      :elevation="false"
      v-bind="buttonProps"
      :disabled="searchDisabled"
      :loading="effectiveActionType === 'search' && loading"
      :aria-label="effectiveActionText || (effectiveActionType === 'search' ? searchText : cancelText)"
      @click="handleAction"
    >
      <template v-if="searchButton && ($slots['button-icon'] || !buttonText)" #icon>
        <slot name="button-icon">
          <mp-registered-icon
            :name="searchIcon"
            :fallback="searchIcon === 'search' ? IconSearch : undefined"
            aria-hidden="true"
          />
        </slot>
      </template>
      <slot v-if="searchButton" name="button-default">{{ buttonText }}</slot>
      <slot v-else name="action">{{ effectiveActionText }}</slot>
    </mp-button>

    <history-presentation
      v-if="historyPopup"
      :open="historyPopupVisible"
      @update:open="handlePopupVisibleChange"
      @closed="handleHistoryPopupClosed"
    >
      <history-content :settings="props" :state="control">
        <template v-if="slots.prefix" #prefix><slot name="prefix" /></template>
        <template v-if="slots.suffix" #suffix><slot name="suffix" /></template>
        <template v-if="slots.label" #label><slot name="label" /></template>
        <template v-if="slots['clear-icon']" #clear-icon="scope"><slot name="clear-icon" v-bind="scope" /></template>
      </history-content>
    </history-presentation>
  </div>
</template>

<script setup lang="ts">
import { nextTick, reactive, ref, shallowRef, watch } from 'vue'
import { IconSearch } from '@maplejs/icons-vue'
import MpButton from '../button'
import MpRegisteredIcon from '../icon/RegisteredIcon.vue'
import MpInput from '../input'
import MpLoading from '../loading'
import MpMenu from '../menu'
import { createNamespace } from '../utils/components'
import MpSelect from './FieldSelect.vue'
import HistoryPresentation from './history-presentation.vue'
import HistoryContent from './HistoryContent.vue'
import { searchProps } from './props'
import type { SearchExpose, SearchSlots } from './types'
import { searchEmits, useSearchControl } from './use-search-control'

defineOptions({ name: createNamespace('search').name })
const props = defineProps(searchProps)
const emit = defineEmits(searchEmits)
const slots = defineSlots<SearchSlots>()
const { n, classes } = createNamespace('search')
const input = shallowRef<{ focus(): void; blur(): void } | null>(null)
const select = shallowRef<{ focus(): void; blur(): void } | null>(null)
const historyMenu = shallowRef<{ resize(): void; setReference(element: HTMLElement): void } | null>(null)
const fieldRef = ref<HTMLElement>()
const core = useSearchControl(props, emit, input)
const control = reactive(core)
const state = control
const {
  searchText,
  cancelText,
  computedField,
  computedValue,
  searchPlaceholder,
  searchDisabled,
  mergedDisabled,
  mergedReadonly,
  mergedSize,
  effectiveShowAction,
  effectiveActionType,
  effectiveActionText,
  historyOptions,
  historyMenuVisible,
  historyPopupVisible,
  updateValue,
  handleInput,
  handleChange,
  handleClear,
  handleSearch,
  handleFieldChange,
  handleFocus,
  handleBlur,
  handleAction,
  handleHistoryMenuVisibleChange,
  handleHistoryMenuSelect,
  handlePopupVisibleChange,
  handleHistoryPopupClosed,
  openHistory,
  focus,
  blur,
} = core
watch(historyMenuVisible, async (open) => {
  if (!open) {
    return
  }
  await nextTick()
  if (fieldRef.value) {
    historyMenu.value?.setReference(fieldRef.value)
  }
  historyMenu.value?.resize()
})
defineExpose<SearchExpose>({ focus, blur })
</script>
