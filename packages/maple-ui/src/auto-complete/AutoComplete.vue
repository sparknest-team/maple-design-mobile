<template>
  <div
    ref="root"
    :class="n()"
    :tabindex="disabled || formDisabled ? undefined : '0'"
    @focusin="focus"
    @click="handleClick"
  >
    <mp-menu
      v-model:open="isShowMenu"
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
    </mp-menu>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import { call, preventDefault, raf, toNumber } from '@maplejs/maple-shared'
import { useClickOutside, useEventListener, useVModel } from '@maplejs/maple-use'
import { useFormItem } from '../form/item-provide'
import { useForm } from '../form/provide'
import MpInput from '../input'
import MpMenu from '../menu'
import MpMenuOption from '../menu/MenuOption.vue'
import { createNamespace } from '../utils/components'
import { useFieldNames } from '../utils/options'
import { props, type AutoCompleteOption } from './props'

const { name, n } = createNamespace('auto-complete')

export default defineComponent({
  name,
  components: {
    MpInput,
    MpMenu,
    MpMenuOption,
  },
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

    watch(() => [props.options, isFocusing.value], changeMenuState)

    useEventListener(() => window, 'keydown', handleKeydown)

    // expose
    function focus() {
      if (isFocusing.value || props.disabled || form?.disabled.value) {
        return
      }

      isFocusing.value = true
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
      if (isFocusing.value) {
        isShowMenu.value = getShowMenu(value.value!)
      }

      // when the menu is closed, the options are not updated, avoiding the flicker of the menu
      if (isShowMenu.value) {
        viewOptions.value = props.options
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

      return props.options.length > 0 && (props.getShow != null ? props.getShow(newValue) : newValue.length > 0)
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
