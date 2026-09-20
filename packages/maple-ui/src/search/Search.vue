<template>
  <div :class="classes(n(), n('$--box'), n(`--${shape}`), [disabled, n('--disabled')])" :style="{ background }">
    <mp-dropdown-menu
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
        :disabled="disabled || readonly"
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
        :type="type"
        :aria-label="ariaLabel"
        :placeholder="searchPlaceholder"
        :max-length="maxLength"
        :readonly="readonly"
        :disabled="disabled"
        :autofocus="autofocus"
        :enterkeyhint="enterkeyhint || 'search'"
        :text-color="textColor"
        :focus-color="focusColor"
        :placeholder-focus-color="searchPlaceholderFocusColor"
        :blur-color="blurColor"
        :size="size"
        :variant="variant"
        :clearable="clearable"
        :hint="false"
        :line="false"
        :class="n('input')"
        @focus="handleFocus"
        @blur="handleBlur"
        @input="handleInput"
        @change="handleChange"
        @clear="handleClear"
        @press-enter="handleSearch"
        @click="handleInputClick"
      >
        <template #prefix>
          <slot name="prefix">
            <button
              :class="n('icon-button')"
              type="button"
              :disabled="searchDisabled"
              :aria-label="buttonText || '搜索'"
              @click="handleSearch"
            >
              <mp-loading v-if="loading" size="mini" />
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

        <template #clear-icon="{ clear }">
          <slot name="clear-icon" :clear="clear">
            <mp-icon
              :class="classes(n('clear-icon'), 'mp-field-decorator__clear-icon')"
              mp-field-decorator-cover
              @click="handleClearIconClick(clear, $event)"
              ><MIconCloseCircleFill
            /></mp-icon>
          </slot>
        </template>

        <template v-if="$slots.suffix" #suffix>
          <slot name="suffix" />
        </template>
      </mp-input>
    </div>

    <mp-button
      v-if="effectiveShowAction"
      v-bind="buttonProps"
      :class="n('action')"
      variant="text"
      :elevation="false"
      :disabled="disabled || readonly"
      :loading="effectiveActionType === 'search' && loading"
      :aria-label="effectiveActionText || (effectiveActionType === 'search' ? '搜索' : '取消')"
      @click="handleAction"
    >
      <template v-if="searchButton && !buttonText" #icon>
        <slot name="button-icon">
          <mp-registered-icon
            :name="searchIcon"
            :fallback="searchIcon === 'magnify' ? IconMagnify : undefined"
            aria-hidden="true"
          />
        </slot>
      </template>
      <slot v-if="searchButton" name="button-default">{{ buttonText }}</slot>
      <slot v-else name="action">{{ effectiveActionText }}</slot>
    </mp-button>

    <mp-popup
      v-if="historyPopup"
      :open="historyPopupVisible"
      :class="n('popup')"
      :style="popupStyle"
      position="top"
      transition="mp-fade"
      :overlay="false"
      safe-area-top
      @update:open="handlePopupVisibleChange"
      @closed="handleHistoryPopupClosed"
    >
      <div :class="n('popup-content')">
        <mp-search
          :model-value="computedValue"
          :model-modifiers="modelModifiers"
          :label="label"
          :model-field="computedField"
          :default-field="defaultField"
          :model="model"
          :select-style="selectStyle"
          :fields="fields"
          :shape="shape"
          :background="background"
          :input-background="inputBackground"
          :action-text="popupActionText"
          action-type="cancel"
          show-action
          :clearable="clearable"
          :search-icon="searchIcon"
          :type="type"
          :aria-label="ariaLabel"
          :placeholder="placeholder"
          :max-length="maxLength"
          :readonly="readonly"
          :disabled="disabled"
          :loading="loading"
          autofocus
          :enterkeyhint="enterkeyhint || 'search'"
          :text-color="textColor"
          :focus-color="focusColor"
          :placeholder-focus-color="searchPlaceholderFocusColor"
          :blur-color="blurColor"
          :size="size"
          :variant="variant"
          :recent-searches="[]"
          :max-search-history-count="maxSearchHistoryCount"
          :history-popup="false"
          @update:model-field="handlePopupFieldUpdate"
          @input="handleInput"
          @change="handleChange"
          @clear="handleClear"
          @cancel="closeHistoryPopup"
          @search="handlePopupSearch"
        >
          <template v-if="$slots.prefix" #prefix>
            <slot name="prefix" />
          </template>
          <template v-if="$slots.label" #label>
            <slot name="label" />
          </template>
          <template #clear-icon="{ clear }">
            <slot name="clear-icon" :clear="clear">
              <mp-icon
                :class="classes(n('clear-icon'), 'mp-field-decorator__clear-icon')"
                mp-field-decorator-cover
                @click="handleClearIconClick(clear, $event)"
                ><MIconCloseCircleFill
              /></mp-icon>
            </slot>
          </template>
        </mp-search>

        <div v-if="recentSearches.length" :class="n('history')">
          <button
            v-for="item in recentSearches"
            :key="item"
            :class="n('history-item')"
            type="button"
            @click="handleHistorySelect(item, $event)"
          >
            {{ item }}
          </button>
        </div>
      </div>
    </mp-popup>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, ref, shallowRef, watch } from 'vue'
import { IconSearch, IconCloseCircleFill as MIconCloseCircleFill } from '@maplejs/icons-vue'
import { call } from '@maplejs/maple-shared'
import MpButton from '../button'
import MpDropdownMenu from '../dropdown-menu'
import MpIcon from '../icon'
import MpRegisteredIcon from '../icon/RegisteredIcon.vue'
import MpInput from '../input'
import MpLoading from '../loading'
import MpPopup from '../popup'
import MpSelect from '../select'
import { createNamespace } from '../utils/components'
import { props } from './props'
import type { SearchField } from './props'
import type { SearchResult } from './result'

const { name, n, classes } = createNamespace('search')

type RegisteredComponents = {
  MIconCloseCircleFill: typeof MIconCloseCircleFill
  MpButton: typeof MpButton
  MpIcon: typeof MpIcon
  MpLoading: typeof MpLoading
  MpRegisteredIcon: typeof MpRegisteredIcon
  MpInput: typeof MpInput
  MpDropdownMenu: typeof MpDropdownMenu
  MpPopup: typeof MpPopup
  MpSelect: typeof MpSelect
}
const registeredComponents: RegisteredComponents = {
  MIconCloseCircleFill,
  MpButton,
  MpIcon,
  MpLoading,
  MpRegisteredIcon,
  MpInput,
  MpDropdownMenu,
  MpPopup,
  MpSelect,
}

export default defineComponent({
  name,
  components: registeredComponents,
  props,
  emits: [
    'focus',
    'blur',
    'input',
    'change',
    'clear',
    'search',
    'update:modelField',
    'update:modelValue',
    'update:model',
    'cancel',
  ],
  setup(props, { emit }) {
    const input = shallowRef<{ focus(): void; blur(): void } | null>(null)
    const select = shallowRef<{ focus(): void; blur(): void } | null>(null)
    const historyMenu = shallowRef<{ resize(): void; close(): void; setReference(element: HTMLElement): void } | null>(
      null,
    )
    const fieldRef = ref<HTMLElement>()
    const value = ref(props.defaultValue)
    const field = ref(props.defaultField || props.fields[0]?.value)
    const historyPopupVisible = ref(false)
    const historyMenuVisible = ref(false)
    const historyPopupClosing = ref(false)

    const computedValue = computed(() => props.modelValue ?? value.value)
    const computedField = computed(() => props.modelField ?? field.value)
    const searchPlaceholder = computed(() => {
      const selected = props.fields.find((item: SearchField) => item.value === computedField.value)

      return selected?.placeholder || props.placeholder
    })
    const popupActionText = computed(() => '取消')
    const searchPlaceholderFocusColor = computed(
      () => props.focusColor || props.blurColor || 'var(--mp-field-placeholder-text-color, var(--mp-field-blur-color))',
    )
    const effectiveShowAction = computed(() => props.showAction || props.searchButton)
    const effectiveActionType = computed(() => (props.searchButton ? 'search' : props.actionType))
    const effectiveActionText = computed(() => (props.searchButton ? props.buttonText || '' : props.actionText))
    const searchDisabled = computed(() => Boolean(props.disabled || props.readonly || props.loading))
    const historyOptions = computed(() => props.recentSearches.map((item: string) => ({ label: item, value: item })))
    const popupStyle = {
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      background: 'var(--mp-search-background)',
    }

    watch(
      () => props.fields,
      () => {
        if (!props.modelField) {
          field.value = props.defaultField || props.fields[0]?.value
        }
      },
      { deep: true },
    )

    function handleFocus(e: FocusEvent) {
      openHistory()
      emit('focus', e)
    }

    function handleBlur(e: FocusEvent) {
      emit('blur', e)
    }

    function handleInput(nextValue: string, e: Event) {
      updateValue(nextValue)
      emit('input', nextValue, e)
    }

    function handleChange(nextValue: string, e: Event) {
      emit('change', nextValue, e)
    }

    function handleClear(e: Event) {
      updateValue('')
      emit('clear', e)
      keepHistoryVisible()
    }

    function handleClearIconClick(clear: (event?: Event) => void, e: Event) {
      e.stopPropagation()
      clear(e)
      keepHistoryVisible()
    }

    function handleFieldChange(nextField: string, e: Event = new Event('change')) {
      field.value = nextField
      emit('update:modelField', nextField)
      updateValue('')
      emit('change', '', e)
      nextTick(() => input.value?.focus())
    }

    function handleSearch(e: Event = new Event('search')) {
      if (searchDisabled.value) {
        return
      }

      closeHistoryMenu()
      emit('search', getResult(), e)
    }

    function handleAction(e: Event) {
      if (props.disabled || props.readonly) {
        return
      }

      if (effectiveActionType.value === 'search') {
        handleSearch(e)
        return
      }

      closeHistoryMenu()
      updateValue('')
      emit('cancel', e)
      emit('change', '', e)
      input.value?.blur()
    }

    function handleInputClick() {
      openHistory()
    }

    function openHistory() {
      if (searchDisabled.value || !props.recentSearches.length) {
        return
      }

      if (props.historyPopup) {
        historyPopupVisible.value = true
        return
      }

      historyMenuVisible.value = true
      nextTick(() => {
        if (fieldRef.value) {
          historyMenu.value?.setReference(fieldRef.value)
        }

        historyMenu.value?.resize()
      })
    }

    function closeHistoryPopup() {
      historyPopupClosing.value = true
      historyPopupVisible.value = false
      closeHistoryMenu()
    }

    function handleHistoryPopupClosed() {
      input.value?.blur()
      historyPopupClosing.value = false
    }

    function closeHistoryMenu() {
      historyMenuVisible.value = false
      historyMenu.value?.close()
    }

    function keepHistoryVisible() {
      if (!props.recentSearches.length || searchDisabled.value) {
        return
      }

      requestAnimationFrame(openHistory)
    }

    function handlePopupVisibleChange(open: boolean) {
      if (!open) {
        historyPopupClosing.value = true
      }
      historyPopupVisible.value = open
    }

    function handleHistoryMenuVisibleChange(open: boolean) {
      historyMenuVisible.value = open
    }

    function handlePopupFieldUpdate(nextField: string) {
      handleFieldChange(nextField)
    }

    function handlePopupSearch(result: SearchResult, e: Event = new Event('search')) {
      historyPopupVisible.value = false
      emit(
        'search',
        {
          ...result,
          recentSearches: getRecentSearches(result.modelValue),
        },
        e,
      )
    }

    function handleHistorySelect(nextValue: string, e: Event = new Event('select')) {
      updateValue(nextValue)
      historyPopupVisible.value = false
      historyMenuVisible.value = false
      emit('search', getResult(nextValue), e)
    }

    function handleHistoryMenuSelect(nextValue: string, _option?: unknown, e?: Event) {
      handleHistorySelect(nextValue, e)
    }

    function updateValue(nextValue: string) {
      value.value = nextValue
      emit('update:modelValue', nextValue)
      updateModel(nextValue)
    }

    function clearModel() {
      if (!props.model || !props.fields.length) {
        return false
      }

      props.fields.forEach((item: SearchField) => {
        props.model![item.value] = undefined
      })
      return true
    }

    function updateModel(nextValue: string) {
      if (!clearModel()) {
        return
      }

      if (computedField.value) {
        props.model![computedField.value] = nextValue
      }
      emit('update:model', props.model!)
    }

    function getRecentSearches(nextValue: string) {
      const keyword = nextValue.trim()
      const searches = props.recentSearches.filter((item: string) => item !== keyword)

      if (keyword) {
        searches.unshift(keyword)
      }

      return searches.slice(0, Math.max(0, props.maxSearchHistoryCount))
    }

    function getResult(nextValue = computedValue.value || ''): SearchResult {
      const currentValue = nextValue
      return {
        modelField: computedField.value,
        modelValue: currentValue,
        model: props.model,
        recentSearches: getRecentSearches(currentValue),
      }
    }

    function focus() {
      input.value?.focus()
    }

    function blur() {
      input.value?.blur()
    }

    return {
      input,
      select,
      historyMenu,
      fieldRef,
      computedValue,
      computedField,
      searchPlaceholder,
      popupActionText,
      searchPlaceholderFocusColor,
      effectiveShowAction,
      effectiveActionType,
      effectiveActionText,
      searchDisabled,
      popupStyle,
      historyOptions,
      historyPopupVisible,
      historyMenuVisible,
      historyPopupClosing,
      n,
      classes,
      IconSearch,
      handleFocus,
      handleBlur,
      handleInput,
      handleChange,
      handleClear,
      handleClearIconClick,
      handleSearch,
      handleAction,
      handleInputClick,
      closeHistoryPopup,
      closeHistoryMenu,
      keepHistoryVisible,
      handlePopupVisibleChange,
      handleHistoryPopupClosed,
      handleHistoryMenuVisibleChange,
      handlePopupFieldUpdate,
      handlePopupSearch,
      handleHistorySelect,
      handleHistoryMenuSelect,
      handleFieldChange,
      updateValue,
      focus,
      blur,
    }
  },
})
</script>
