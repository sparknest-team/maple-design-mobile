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
        :disabled="disabled"
        placement="bottom-start"
        @change="handleSelectChange"
      />

      <div v-else-if="label || $slots.label" :class="n('label')">
        <slot name="label">{{ label }}</slot>
      </div>

      <mp-input
        ref="input"
        :model-value="computedValue"
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
        :blur-color="blurColor"
        :clearable="clearable"
        :hint="false"
        :line="false"
        :class="n('input')"
        @focus="handleFocus"
        @blur="handleBlur"
        @input="handleInput"
        @change="handleChange"
        @clear="handleClear"
        @keyup.enter="handleSearch"
        @click="handleInputClick"
      >
        <template #prefix>
          <slot name="prefix">
            <mp-registered-icon
              :class="n('search-icon')"
              :name="searchIcon"
              :fallback="searchIcon === 'search' ? IconSearch : undefined"
              @click="handleSearch"
            />
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
      </mp-input>
    </div>

    <button v-if="showAction" :class="n('action')" type="button" :disabled="disabled" @click="handleAction">
      <slot name="action">{{ actionText }}</slot>
    </button>

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
    >
      <div :class="n('popup-content')">
        <mp-search
          :model-value="computedValue"
          :label="label"
          :model-field="computedField"
          :search-field="computedField"
          :default-field="defaultField"
          :search-text="computedValue"
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
          autofocus
          :enterkeyhint="enterkeyhint || 'search'"
          :text-color="textColor"
          :focus-color="focusColor"
          :blur-color="blurColor"
          :recent-searches="recentSearches"
          :max-search-history-count="maxSearchHistoryCount"
          :history-popup="false"
          @update:model-field="handlePopupFieldUpdate"
          @update:search-field="handlePopupFieldUpdate"
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
import MpDropdownMenu from '../dropdown-menu'
import MpIcon from '../icon'
import MpRegisteredIcon from '../icon/RegisteredIcon.vue'
import MpInput from '../input'
import MpPopup from '../popup'
import MpSelect from '../select'
import { createNamespace } from '../utils/components'
import { props } from './props'
import type { SearchField } from './props'
import type { SearchResult } from './result'

const { name, n, classes } = createNamespace('search')

type RegisteredComponents = {
  MIconCloseCircleFill: typeof MIconCloseCircleFill
  MpIcon: typeof MpIcon
  MpRegisteredIcon: typeof MpRegisteredIcon
  MpInput: typeof MpInput
  MpDropdownMenu: typeof MpDropdownMenu
  MpPopup: typeof MpPopup
  MpSelect: typeof MpSelect
}
const registeredComponents: RegisteredComponents = {
  MIconCloseCircleFill,
  MpIcon,
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
    'update:searchField',
    'update:modelValue',
    'update:searchText',
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

    const computedValue = computed(() => props.modelValue ?? props.searchText ?? value.value)
    const computedField = computed(() => props.modelField ?? props.searchField ?? field.value)
    const searchPlaceholder = computed(() => {
      const selected = props.fields.find((item: SearchField) => item.value === computedField.value)

      return selected?.placeholder || props.placeholder
    })
    const popupActionText = computed(() => '取消')
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
        if (!props.modelField && !props.searchField) {
          field.value = props.defaultField || props.fields[0]?.value
        }
      },
      { deep: true },
    )

    function handleFocus(e: FocusEvent) {
      openHistoryPopup()
      emit('focus', e)
    }

    function handleBlur(e: FocusEvent) {
      emit('blur', e)
    }

    function handleInput(nextValue: string, e: Event) {
      updateValue(nextValue)
      emit('input', nextValue, e)
      emit('change', nextValue, e)
    }

    function handleChange(nextValue: string, e: Event) {
      emit('change', nextValue, e)
    }

    function handleClear(nextValue: string) {
      updateValue(nextValue)
      emit('clear', nextValue)
      emit('change', nextValue)
      keepHistoryVisible()
    }

    function handleClearIconClick(clear: () => void, e: Event) {
      e.stopPropagation()
      clear()
      keepHistoryVisible()
    }

    function handleSelectChange(nextField: string) {
      field.value = nextField
      clearModel()
      updateValue('')
      emit('update:modelField', nextField)
      emit('update:searchField', nextField)
      emit('update:modelField', nextField)
      emit('update:searchField', nextField)
      emit('change', '', undefined)
      emit('change', '')
      input.value?.focus()
    }

    function handleSearch(e?: Event) {
      if (props.disabled) {
        return
      }

      closeHistoryMenu()
      const result = search(computedValue.value || '')
      emit('search', result, e)
      input.value?.blur()
    }

    function handleAction(e: Event) {
      if (props.disabled) {
        return
      }

      if (props.actionType === 'search') {
        handleSearch(e)
        return
      }

      closeHistoryMenu()
      updateValue('')
      emit('cancel')
      emit('change', '', e)
      input.value?.blur()
    }

    function handleInputClick() {
      openHistoryPopup()
    }

    function openHistoryPopup() {
      if (props.disabled || props.readonly || !props.recentSearches.length) {
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
      historyPopupVisible.value = false
      closeHistoryMenu()
      input.value?.blur()
    }

    function closeHistoryMenu() {
      historyMenuVisible.value = false
      historyMenu.value?.close()
    }

    function keepHistoryVisible() {
      if (!props.recentSearches.length || props.disabled || props.readonly) {
        return
      }

      requestAnimationFrame(openHistoryPopup)
    }

    function handlePopupVisibleChange(open: boolean) {
      historyPopupVisible.value = open
    }

    function handleHistoryMenuVisibleChange(open: boolean) {
      historyMenuVisible.value = open
    }

    function handlePopupFieldUpdate(nextField: string) {
      handleSelectChange(nextField)
    }

    function handlePopupSearch(result: SearchResult, e?: Event) {
      historyPopupVisible.value = false
      emit('search', result, e)
      nextTick(() => input.value?.blur())
    }

    function handleHistorySelect(nextValue: string, e?: Event) {
      updateValue(nextValue)
      const result = search(nextValue)
      historyPopupVisible.value = false
      historyMenuVisible.value = false
      emit('search', result, e)
      nextTick(() => input.value?.blur())
    }

    function handleHistoryMenuSelect(nextValue: string) {
      handleHistorySelect(nextValue)
    }

    function updateValue(nextValue: string) {
      value.value = nextValue
      updateModel(nextValue)
      emit('update:modelValue', nextValue)
      emit('update:searchText', nextValue)
      emit('update:modelValue', nextValue)
      emit('update:searchText', nextValue)
    }

    function clearModel() {
      if (!props.model || !props.fields.length) {
        return
      }

      props.fields.forEach((item: SearchField) => {
        const key = item.value as string
        ;(props.model as Record<string, any>)[key] = undefined
      })
      emit('update:model', props.model)
      emit('update:model', props.model)
    }

    function updateModel(nextValue: string) {
      const key = computedField.value as string | undefined
      if (!props.model || !props.fields.length || !key) {
        return
      }

      clearModel()
      ;(props.model as Record<string, any>)[key] = nextValue
      emit('update:model', props.model)
      emit('update:model', props.model)
    }

    function search(nextValue: string) {
      updateModel(nextValue)
      return getResult(nextValue)
    }

    function getRecentSearches(nextValue: string) {
      const keyword = nextValue.trim()
      const searches = props.recentSearches.filter((item: string) => item !== keyword)

      if (keyword) {
        searches.unshift(keyword)
      }

      return searches.slice(0, props.maxSearchHistoryCount)
    }

    function getResult(nextValue = computedValue.value || ''): SearchResult {
      const currentValue = nextValue
      const currentField = computedField.value as string | undefined

      return {
        modelField: currentField,
        modelValue: currentValue,
        searchField: currentField,
        searchText: currentValue,
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
      popupStyle,
      historyOptions,
      historyPopupVisible,
      historyMenuVisible,
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
      handleHistoryMenuVisibleChange,
      handlePopupFieldUpdate,
      handlePopupSearch,
      handleHistorySelect,
      handleHistoryMenuSelect,
      handleSelectChange,
      updateValue,
      focus,
      blur,
    }
  },
})
</script>
