<template>
  <div
    ref="root"
    :class="n()"
    :tabindex="disabled || formDisabled ? undefined : '0'"
    @focusin="focus"
    @click="handleClick"
  >
    <mp-dropdown-menu
      v-model:open="isShowMenu"
      :popup-container="popupContainer"
      :auto-fit-popup-width="true"
      auto-complete-cover
      trigger="manual"
      placement="bottom"
      :disabled="disabled || formDisabled || readonly || formReadonly"
      :class="n('menu')"
      :popup-class="variant === 'standard' ? n('--standard-menu-margin') : undefined"
      @update:model-value="handleAutoComplete"
      @key-escape="handleKeyEscape"
    >
      <mp-input
        ref="input"
        v-bind="{
          maxLength,
          enterkeyhint,
          placeholder,
          size,
          variant,
          line,
          hint,
          textColor,
          focusColor,
          blurColor,
          readonly,
          disabled,
          clearable,
        }"
        v-model="value"
        autocomplete="off"
        :is-force-focusing-effect="isFocusing"
        :is-force-error-effect="mergedError"
        @input="handleInput"
        @blur="handleBlur"
        @clear="handleClear"
        @change="handleChange"
      >
        <template v-if="$slots['prefix']" #prefix>
          <slot name="prefix" />
        </template>

        <template v-if="$slots['suffix']" #suffix>
          <slot name="suffix" />
        </template>

        <template v-if="$slots['clear-icon']" #clear-icon="{ clear }">
          <slot name="clear-icon" :clear="clear" />
        </template>
      </mp-input>

      <template #content>
        <div :class="n('options')">
          <mp-menu-option
            v-for="option in viewOptions"
            :key="option[valueKey]"
            :label="option[labelKey]"
            :value="option[valueKey]"
            :option="option"
            :disabled="option.disabled"
          />
        </div>
      </template>
    </mp-dropdown-menu>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import { call, preventDefault, raf, toNumber } from '@maplejs/maple-shared'
import { useClickOutside, useEventListener, useVModel } from '@maplejs/maple-use'
import MpDropdownMenu from '../dropdown-menu'
import MpMenuOption from '../dropdown-menu/MenuOption.vue'
import { useFormItem } from '../form/item-provide'
import { useForm } from '../form/provide'
import MpInput from '../input'
import { createNamespace } from '../utils/components'
import { matchesOptionText } from '../utils/option-data'
import { useFieldNames } from '../utils/options'
import { props, type AutoCompleteOption } from './props'

const { name, n } = createNamespace('auto-complete')

type RegisteredComponents = {
  MpInput: typeof MpInput
  MpDropdownMenu: typeof MpDropdownMenu
  MpMenuOption: typeof MpMenuOption
}
const registeredComponents: RegisteredComponents = {
  MpInput,
  MpDropdownMenu,
  MpMenuOption,
}

export default defineComponent({
  name,
  components: registeredComponents,
  props,
  emits: ['input', 'clear', 'click', 'change', 'focus', 'blur', 'update:modelValue'],
  setup(props, { emit }) {
    const root = ref<HTMLElement>()
    const input = ref<InstanceType<typeof MpInput>>()

    const isFocusing = ref(false)
    const value = useVModel(props, 'modelValue', { emit, eventName: 'update:modelValue' })
    const viewOptions = ref<AutoCompleteOption[]>([])
    const isShowMenu = ref(false)

    const { form } = useForm()
    const { mergedError, eventHandlers } = useFormItem()
    const fieldNames = useFieldNames(props)
    const labelKey = computed(() => fieldNames.value.label)
    const valueKey = computed(() => fieldNames.value.value)
    const filteredOptions = computed(() => {
      const inputValue = value.value ?? ''
      if (!inputValue || props.filterOption === false) {
        return props.options
      }
      return props.options.filter((option) => {
        if (typeof props.filterOption === 'function') {
          return props.filterOption(inputValue, option)
        }
        const label = option[labelKey.value] ?? option[valueKey.value] ?? ''
        if (typeof label !== 'string' && typeof label !== 'number') {
          return false
        }
        const text = String(label)
        return matchesOptionText(text, inputValue, props.strict)
      })
    })

    let clearing = false

    useClickOutside(
      () => root.value!,
      'click',
      () => {
        // After the clear operation is executed, the clear button will be removed from the component tree,
        // resulting in a false positive of click outside.
        if (clearing) {
          clearing = false
          return
        }

        blur()
      },
    )

    watch(
      () => [
        filteredOptions.value,
        value.value,
        isFocusing.value,
        props.shouldOpen,
        props.disabled,
        props.readonly,
        form?.disabled.value,
        form?.readonly.value,
      ],
      changeMenuState,
    )

    useEventListener(() => window, 'keydown', handleKeydown)

    // expose
    function focus() {
      if (isFocusing.value || props.disabled || form?.disabled.value) {
        return
      }

      isFocusing.value = true
      changeMenuState()
      input.value!.focus()
      emit('focus')
      eventHandlers.value.onFocus?.()
    }

    // expose
    function blur() {
      if (!isFocusing.value) {
        return
      }

      isFocusing.value = false
      isShowMenu.value = false
      input.value!.blur()
      emit('blur')
      eventHandlers.value.onBlur?.()
    }

    function handleBlur() {
      if (isShowMenu.value) {
        return
      }

      blur()
    }

    async function handleKeydown(event: KeyboardEvent) {
      if (
        form?.disabled.value ||
        form?.readonly.value ||
        props.disabled ||
        props.readonly ||
        !isFocusing.value ||
        !isShowMenu.value
      ) {
        return
      }

      const { key } = event

      if (key === 'Tab') {
        preventDefault(event)
        root.value!.focus()
        isShowMenu.value = false
        return
      }

      if (!['ArrowUp', 'ArrowDown', 'Enter'].includes(key)) {
        input.value!.focus()
        return
      }

      if (key === 'Enter') {
        await raf()
        input.value?.focus()
      }
    }

    function changeMenuState() {
      isShowMenu.value = isFocusing.value && getShowMenu(value.value ?? '')

      // when the menu is closed, the options are not updated, avoiding the flicker of the menu
      if (isShowMenu.value) {
        viewOptions.value = filteredOptions.value
      }
    }

    function handleInput(newValue: string, event: Event) {
      changeMenuState()
      emit('input', newValue, event)
      eventHandlers.value.onInput?.()
    }

    function handleClear() {
      clearing = true
      changeMenuState()
      emit('clear', value.value!)
      eventHandlers.value.onClear?.()
    }

    function handleClick(event: Event) {
      if (props.disabled || form?.disabled.value) {
        return
      }

      emit('click', event)
    }

    function handleChange(newValue: string) {
      emit('change', newValue)
      eventHandlers.value.onChange?.()
    }

    async function handleAutoComplete(newValue: string) {
      if (props.maxLength != null) {
        newValue = newValue.slice(0, toNumber(props.maxLength))
      }

      if (newValue !== value.value) {
        value.value = newValue
        emit('change', newValue)
        eventHandlers.value.onChange?.()
      }

      await raf()
      input.value?.focus()
    }

    function handleKeyEscape() {
      input.value!.focus()
    }

    function getShowMenu(newValue: string) {
      if (props.disabled || props.readonly || form?.disabled.value || form?.readonly.value) {
        return false
      }

      return filteredOptions.value.length > 0 && props.shouldOpen(newValue)
    }

    return {
      root,
      input,
      value,
      isShowMenu,
      viewOptions,
      isFocusing,
      labelKey,
      valueKey,
      formDisabled: form?.disabled,
      formReadonly: form?.readonly,
      mergedError,
      n,
      handleInput,
      handleClear,
      handleClick,
      handleChange,
      handleBlur,
      handleKeyEscape,
      handleAutoComplete,
      blur,
      focus,
    }
  },
})
</script>
