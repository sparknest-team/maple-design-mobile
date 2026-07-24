<template>
  <div
    ref="root"
    :class="n()"
    :tabindex="disabled || formDisabled ? undefined : '0'"
    @focusin="focus"
    @click="handleClick"
  >
    <mp-menu-select
      v-model:show="isShowMenuSelect"
      same-width
      auto-complete-cover
      scrollable
      trigger="manual"
      placement="bottom"
      :disabled="disabled || formDisabled || readonly || formReadonly"
      :class="n('menu-select')"
      :popover-class="variant === 'standard' ? n('--standard-menu-margin') : undefined"
      @update:model-value="handleAutoComplete"
      @key-escape="handleKeyEscape"
    >
      <mp-input
        ref="input"
        v-bind="{
          maxlength,
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
        <template v-if="$slots['prepend-icon']" #prepend-icon>
          <slot name="prepend-icon" />
        </template>

        <template v-if="$slots['append-icon']" #append-icon>
          <slot name="append-icon" />
        </template>

        <template v-if="$slots['clear-icon']" #clear-icon="{ clear }">
          <slot name="clear-icon" :clear="clear" />
        </template>
      </mp-input>

      <template #options>
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
    </mp-menu-select>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { call, preventDefault, raf, toNumber } from '@maplejs/maple-shared'
import { useClickOutside, useEventListener, useVModel } from '@maplejs/maple-use'
import { useFormItem } from '../form-item'
import { useForm } from '../form/provide'
import MpInput from '../input'
import MpMenuOption from '../menu-option'
import MpMenuSelect from '../menu-select'
import { createNamespace } from '../utils/components'
import { props, type AutoCompleteOption } from './props'

const { name, n } = createNamespace('auto-complete')

export default defineComponent({
  name,
  components: {
    MpInput,
    MpMenuSelect,
    MpMenuOption,
  },
  props,
  setup(props) {
    const root = ref<HTMLElement>()
    const input = ref<InstanceType<typeof MpInput>>()

    const isFocusing = ref(false)
    const value = useVModel(props, 'modelValue')
    const viewOptions = ref<AutoCompleteOption[]>([])
    const isShowMenuSelect = ref(false)

    const { form } = useForm()
    const { mergedError, eventHandlers } = useFormItem()

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
      call(props.onFocus)
      eventHandlers.value.onFocus?.()
    }

    // expose
    function blur() {
      if (!isFocusing.value) {
        return
      }

      isFocusing.value = false
      isShowMenuSelect.value = false
      input.value!.blur()
      call(props.onBlur)
      eventHandlers.value.onBlur?.()
    }

    function handleBlur() {
      if (isShowMenuSelect.value) {
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
        !isShowMenuSelect.value
      ) {
        return
      }

      const { key } = event

      if (key === 'Tab') {
        preventDefault(event)
        root.value!.focus()
        isShowMenuSelect.value = false
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
        isShowMenuSelect.value = getShowMenuSelect(value.value!)
      }

      // when the menu is closed, the options are not updated, avoiding the flicker of the menu
      if (isShowMenuSelect.value) {
        viewOptions.value = props.options
      }
    }

    function handleInput(newValue: string, event: Event) {
      changeMenuState()
      call(props.onInput, newValue, event)
      eventHandlers.value.onInput?.()
    }

    function handleClear() {
      clearing = true
      changeMenuState()
      call(props.onClear, value.value!)
      eventHandlers.value.onClear?.()
    }

    function handleClick(event: Event) {
      if (props.disabled || form?.disabled.value) {
        return
      }

      call(props.onClick, event)
    }

    function handleChange(newValue: string) {
      call(props.onChange, newValue)
      eventHandlers.value.onChange?.()
    }

    async function handleAutoComplete(newValue: string) {
      if (props.maxlength != null) {
        newValue = newValue.slice(0, toNumber(props.maxlength))
      }

      if (newValue !== value.value) {
        value.value = newValue
        call(props.onChange, newValue)
        eventHandlers.value.onChange?.()
      }

      await raf()
      input.value?.focus()
    }

    function handleKeyEscape() {
      input.value!.focus()
    }

    function getShowMenuSelect(newValue: string) {
      if (props.disabled || props.readonly || form?.disabled.value || form?.readonly.value) {
        return false
      }

      return props.options.length > 0 && (props.getShow != null ? props.getShow(newValue) : newValue.length > 0)
    }

    return {
      root,
      input,
      value,
      isShowMenuSelect,
      viewOptions,
      isFocusing,
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

<style lang="less">
@import '../styles/common';
@import '../styles/elevation';
@import '../icon/icon';
@import '../field-decorator/fieldDecorator';
@import '../input/input';
@import '../menu/menu';
@import '../menu-option/menuOption';
@import '../menu-select/menuSelect';
@import './autoComplete';
</style>
