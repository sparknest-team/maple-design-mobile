<template>
  <div :class="rootClasses">
    <mp-input
      ref="input"
      :model-value="inputValue"
      type="text"
      :clearable="clearable"
      :size="inputSize"
      :variant="inputVariant"
      :placeholder="placeholder"
      :disabled="mergedDisabled"
      :readonly="readonly"
      :is-force-error-effect="mergedError"
      :input-attrs="mergedInputAttrs"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @clear="handleClear"
      @change="handleChange"
      @keydown="handleKeydown"
    >
      <template #prefix>
        <template v-if="controlType === 'split' && controls && !readonly">
          <button
            :class="classes(n('step-button'), [mergedDisabled || isMin, n('step-button--disabled')])"
            type="button"
            tabindex="-1"
            :disabled="mergedDisabled || isMin"
            @mousedown="(event) => handleStepButton(event, 'minus', true)"
            @mouseup="clearRepeatTimer"
            @mouseleave="clearRepeatTimer"
          >
            <slot name="minus">
              <mp-icon name="minus" />
            </slot>
          </button>
        </template>
        <span v-if="$slots.prefix" :class="n('prefix')">
          <slot name="prefix" />
        </span>
      </template>

      <template #suffix>
        <span v-if="$slots.suffix" :class="n('suffix')">
          <slot name="suffix" />
        </span>
        <template v-if="controls && !readonly">
          <div v-if="controlType === 'stacked'" :class="n('step')">
            <div :class="n('step-divider-vertical')" />
            <div :class="n('step-buttons')">
              <button
                :class="classes(n('step-button'), [mergedDisabled || isMax, n('step-button--disabled')])"
                type="button"
                tabindex="-1"
                :disabled="mergedDisabled || isMax"
                @mousedown="(event) => handleStepButton(event, 'plus', true)"
                @mouseup="clearRepeatTimer"
                @mouseleave="clearRepeatTimer"
              >
                <slot name="plus">
                  <mp-icon name="chevron-up" />
                </slot>
              </button>
              <div :class="n('step-divider-horizontal')" />
              <button
                :class="classes(n('step-button'), [mergedDisabled || isMin, n('step-button--disabled')])"
                type="button"
                tabindex="-1"
                :disabled="mergedDisabled || isMin"
                @mousedown="(event) => handleStepButton(event, 'minus', true)"
                @mouseup="clearRepeatTimer"
                @mouseleave="clearRepeatTimer"
              >
                <slot name="minus">
                  <mp-icon name="chevron-down" />
                </slot>
              </button>
            </div>
          </div>
          <button
            v-else
            :class="classes(n('step-button'), [mergedDisabled || isMax, n('step-button--disabled')])"
            type="button"
            tabindex="-1"
            :disabled="mergedDisabled || isMax"
            @mousedown="(event) => handleStepButton(event, 'plus', true)"
            @mouseup="clearRepeatTimer"
            @mouseleave="clearRepeatTimer"
          >
            <slot name="plus">
              <mp-icon name="plus" />
            </slot>
          </button>
        </template>
      </template>

      <template #clear-icon="{ clear }">
        <slot name="clear-icon" :clear="clear" />
      </template>
    </mp-input>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import { call } from '@maplejs/maple-shared'
import { Decimal } from 'decimal.js'
import { useFormItem } from '../form-item'
import { useForm } from '../form/provide'
import MpIcon from '../icon'
import MpInput from '../input'
import { createNamespace } from '../utils/components'
import { props } from './props'

type StepMethod = 'minus' | 'plus'

const FIRST_DELAY = 800
const SPEED = 150

const { name, n, classes } = createNamespace('input-number')

function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !Number.isNaN(value)
}

export default defineComponent({
  name,
  components: {
    MpIcon,
    MpInput,
  },
  props,
  setup(props) {
    const input = ref<InstanceType<typeof MpInput> | null>(null)
    const { form } = useForm()
    const { mergedError: formMergedError, eventHandlers } = useFormItem()
    const mergedDisabled = computed(() => Boolean(form?.disabled.value || props.disabled))
    const mergedError = computed(() => Boolean(formMergedError.value || props.error))
    const inputSize = computed(() => (props.size === 'xs' || props.size === 'sm' ? 'small' : 'normal'))
    const inputVariant = computed(() => 'outlined')
    const mergedPrecision = computed(() => {
      if (isNumber(props.precision)) {
        const decimal = `${props.step}`.split('.')[1]
        const stepPrecision = (decimal && decimal.length) || 0
        return Math.max(stepPrecision, props.precision)
      }

      return undefined
    })

    const getStringValue = (number: number | undefined) => {
      if (!isNumber(number)) {
        return ''
      }

      const numString = isNumber(mergedPrecision.value) ? number.toFixed(mergedPrecision.value) : String(number)
      return props.formatter?.(numString) ?? numString
    }

    const inputValue = ref(getStringValue(props.modelValue ?? props.defaultValue))
    const valueNumber = computed(() => {
      if (!inputValue.value) {
        return undefined
      }

      const number = Number(props.parser?.(inputValue.value) ?? inputValue.value)
      return Number.isNaN(number) ? undefined : number
    })
    const isMin = ref(isNumber(valueNumber.value) && valueNumber.value <= props.min)
    const isMax = ref(isNumber(valueNumber.value) && valueNumber.value >= props.max)
    const rootClasses = computed(() =>
      classes(
        n(),
        n(`--control-type-${props.controlType}`),
        [props.size, n(`--size-${props.size}`)],
        [props.readonly, n('--readonly')],
      ),
    )
    const mergedInputAttrs = computed(() => ({
      role: 'spinbutton',
      'aria-valuemax': props.max,
      'aria-valuemin': props.min,
      'aria-valuenow': inputValue.value,
      ...props.inputAttrs,
    }))

    let repeatTimer = 0

    function clearRepeatTimer() {
      if (repeatTimer) {
        window.clearTimeout(repeatTimer)
        repeatTimer = 0
      }
    }

    function getLegalValue(value: number | undefined): number | undefined {
      if (value === undefined) {
        return undefined
      }

      if (isNumber(props.min) && value < props.min) {
        value = props.min
      }

      if (isNumber(props.max) && value > props.max) {
        value = props.max
      }

      return isNumber(mergedPrecision.value)
        ? new Decimal(value).toDecimalPlaces(mergedPrecision.value).toNumber()
        : value
    }

    function updateNumberStatus(number: number | undefined) {
      isMin.value = isNumber(number) && number <= props.min
      isMax.value = isNumber(number) && number >= props.max
    }

    function handleExceedRange() {
      const finalValue = getLegalValue(valueNumber.value)
      const stringValue = getStringValue(finalValue)

      if (finalValue !== valueNumber.value || inputValue.value !== stringValue) {
        inputValue.value = stringValue
      }

      call(props['onUpdate:modelValue'], finalValue)
    }

    function nextStep(method: StepMethod, event: Event) {
      if (mergedDisabled.value || (method === 'plus' && isMax.value) || (method === 'minus' && isMin.value)) {
        return
      }

      let nextValue: number | undefined
      if (isNumber(valueNumber.value)) {
        nextValue = getLegalValue(new Decimal(valueNumber.value)[method](props.step).toNumber())
      } else {
        nextValue = props.min === -Infinity ? 0 : props.min
      }

      inputValue.value = getStringValue(nextValue)
      updateNumberStatus(nextValue)
      call(props['onUpdate:modelValue'], nextValue)
      call(props.onChange, nextValue, event)
      eventHandlers.value.onChange?.()
    }

    function handleStepButton(event: MouseEvent, method: StepMethod, needRepeat = false) {
      event.preventDefault()

      if (props.readonly || form?.readonly.value) {
        return
      }

      input.value?.focus()
      nextStep(method, event)

      if (needRepeat) {
        repeatTimer = window.setTimeout(
          () => (event.target as HTMLElement).dispatchEvent(event),
          repeatTimer ? SPEED : FIRST_DELAY,
        )
      }
    }

    function handleInput(value: string, event: Event) {
      value = value.trim().replace(/。/g, '.')
      value = props.parser?.(value) ?? value

      if (!Number.isNaN(Number(value)) || /^(\.|-)$/.test(value)) {
        inputValue.value = props.formatter?.(value) ?? value
        updateNumberStatus(valueNumber.value)

        call(props.onInput, valueNumber.value, inputValue.value, event)
        eventHandlers.value.onInput?.()
        if (props.modelEvent === 'input') {
          call(props['onUpdate:modelValue'], valueNumber.value)
          call(props.onChange, valueNumber.value, event)
          eventHandlers.value.onChange?.()
        }
      }
    }

    function handleChange(value: string, event: Event) {
      if (event instanceof MouseEvent && !value) {
        return
      }

      handleExceedRange()
      call(props.onChange, valueNumber.value, event)
      eventHandlers.value.onChange?.()
    }

    function handleFocus(event: FocusEvent) {
      call(props.onFocus, event)
      eventHandlers.value.onFocus?.()
    }

    function handleBlur(event: FocusEvent) {
      call(props.onBlur, event)
      eventHandlers.value.onBlur?.()
    }

    function handleClear(event: Event | string) {
      const clearEvent = event instanceof Event ? event : new Event('clear')
      inputValue.value = ''
      call(props['onUpdate:modelValue'], undefined)
      call(props.onChange, undefined, clearEvent)
      call(props.onClear, clearEvent)
      eventHandlers.value.onChange?.()
      eventHandlers.value.onClear?.()
    }

    function handleKeydown(event: KeyboardEvent) {
      call(props.onKeydown, event)
      if (event.defaultPrevented || props.readonly || form?.readonly.value) {
        return
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault()
        nextStep('plus', event)
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault()
        nextStep('minus', event)
      }
    }

    watch(
      () => [props.max, props.min],
      () => {
        handleExceedRange()
        updateNumberStatus(valueNumber.value)
      },
    )

    watch(
      () => props.modelValue,
      (value) => {
        if (value !== valueNumber.value) {
          inputValue.value = getStringValue(value)
          updateNumberStatus(value)
        }
      },
    )

    return {
      input,
      inputValue,
      inputSize,
      inputVariant,
      mergedDisabled,
      mergedError,
      mergedInputAttrs,
      isMin,
      isMax,
      rootClasses,
      n,
      classes,
      clearRepeatTimer,
      handleStepButton,
      handleInput,
      handleChange,
      handleFocus,
      handleBlur,
      handleClear,
      handleKeydown,
    }
  },
  methods: {
    focus() {
      this.input?.focus()
    },
    blur() {
      this.input?.blur()
    },
  },
})
</script>

<style lang="less">
@import '../styles/common';
@import '../icon/icon';
@import '../input/input';
@import './input-number';
</style>
