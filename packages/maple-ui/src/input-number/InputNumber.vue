<template>
  <div :class="rootClasses">
    <div v-if="$slots.prepend" :class="[n('addon'), n('prepend')]">
      <slot name="prepend" />
    </div>
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
      @press-enter="handlePressEnter"
      @keydown="handleKeydown"
    >
      <template #prefix>
        <template v-if="mode === 'button' && !readonly">
          <button
            :class="classes(n('step-button'), [mergedDisabled || isMin, n('step-button--disabled')])"
            type="button"
            tabindex="-1"
            :disabled="mergedDisabled || isMin"
            aria-label="减少数值"
            @mousedown="(event) => handleStepButton(event, 'minus', true)"
            @mouseup="clearRepeatTimer"
            @mouseleave="clearRepeatTimer"
          >
            <slot name="minus">
              <mp-icon><MIconMinus /></mp-icon>
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
        <template v-if="mode !== 'input' && !readonly">
          <div v-if="mode === 'embed'" :class="n('step')">
            <div :class="n('step-divider-vertical')" />
            <div :class="n('step-buttons')">
              <button
                :class="classes(n('step-button'), [mergedDisabled || isMax, n('step-button--disabled')])"
                type="button"
                tabindex="-1"
                :disabled="mergedDisabled || isMax"
                aria-label="增加数值"
                @mousedown="(event) => handleStepButton(event, 'plus', true)"
                @mouseup="clearRepeatTimer"
                @mouseleave="clearRepeatTimer"
              >
                <slot name="plus">
                  <mp-icon><MIconChevronUp /></mp-icon>
                </slot>
              </button>
              <div :class="n('step-divider-horizontal')" />
              <button
                :class="classes(n('step-button'), [mergedDisabled || isMin, n('step-button--disabled')])"
                type="button"
                tabindex="-1"
                :disabled="mergedDisabled || isMin"
                aria-label="减少数值"
                @mousedown="(event) => handleStepButton(event, 'minus', true)"
                @mouseup="clearRepeatTimer"
                @mouseleave="clearRepeatTimer"
              >
                <slot name="minus">
                  <mp-icon><MIconChevronDown /></mp-icon>
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
            aria-label="增加数值"
            @mousedown="(event) => handleStepButton(event, 'plus', true)"
            @mouseup="clearRepeatTimer"
            @mouseleave="clearRepeatTimer"
          >
            <slot name="plus">
              <mp-icon><MIconPlus /></mp-icon>
            </slot>
          </button>
        </template>
      </template>

      <template v-if="$slots['clear-icon']" #clear-icon="{ clear }">
        <slot name="clear-icon" :clear="clear" />
      </template>
    </mp-input>
    <div v-if="$slots.append" :class="[n('addon'), n('append')]">
      <slot name="append" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import {
  IconChevronDown as MIconChevronDown,
  IconChevronUp as MIconChevronUp,
  IconMinus as MIconMinus,
  IconPlus as MIconPlus,
} from '@maplejs/icons-vue'
import { call } from '@maplejs/maple-shared'
import { Decimal } from 'decimal.js'
import { useFormItem } from '../form/item-provide'
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
    MIconMinus,
    MIconChevronUp,
    MIconChevronDown,
    MIconPlus,
    MpIcon,
    MpInput,
  },
  props,
  emits: ['change', 'input', 'focus', 'blur', 'clear', 'keydown', 'update:modelValue'],
  setup(props, { emit }) {
    const input = ref<InstanceType<typeof MpInput> | null>(null)
    const { form } = useForm()
    const { mergedError: formMergedError, eventHandlers } = useFormItem()
    const mergedDisabled = computed(() => Boolean(form?.disabled.value || props.disabled))
    const mergedError = computed(() => Boolean(formMergedError.value || props.error))
    const inputSize = computed(() => props.size)
    const inputVariant = computed(() => 'outline' as const)
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

    const isIntermediateValue = (value: string) =>
      value === '' || value === '-' || value === '.' || value === '-.' || /^-?\d+\.$/.test(value)

    const getValueNumber = (value: string) => {
      const parsedValue = props.parser?.(value) ?? value
      if (isIntermediateValue(parsedValue)) {
        return undefined
      }

      const number = Number(parsedValue)
      return Number.isFinite(number) ? number : undefined
    }

    const inputValue = ref(getStringValue(props.modelValue ?? props.defaultValue))
    const valueNumber = computed(() => getValueNumber(inputValue.value))
    let lastCommittedValue = valueNumber.value
    const isMin = ref(isNumber(valueNumber.value) && valueNumber.value <= props.min)
    const isMax = ref(isNumber(valueNumber.value) && valueNumber.value >= props.max)
    const rootClasses = computed(() =>
      classes(
        n(),
        n(`--mode-${props.mode}`),
        [props.size, n(`--size-${props.size}`)],
        [props.readonly, n('--readonly')],
      ),
    )
    const mergedInputAttrs = computed(() => ({
      role: 'spinbutton',
      ...(Number.isFinite(props.max) ? { 'aria-valuemax': props.max } : {}),
      ...(Number.isFinite(props.min) ? { 'aria-valuemin': props.min } : {}),
      ...(isNumber(valueNumber.value) ? { 'aria-valuenow': valueNumber.value } : {}),
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

    function commitValue(event: Event, emitChange = true) {
      const finalValue = getLegalValue(valueNumber.value)
      const stringValue = getStringValue(finalValue)

      const valueChanged = !Object.is(finalValue, lastCommittedValue)

      if (valueChanged || !Object.is(finalValue, valueNumber.value) || inputValue.value !== stringValue) {
        inputValue.value = stringValue
        emit('update:modelValue', finalValue)
      }
      updateNumberStatus(finalValue)
      lastCommittedValue = finalValue

      if (emitChange && valueChanged) {
        emit('change', finalValue, event)
      }
    }

    function handleExceedRange() {
      commitValue(new Event('range'), false)
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

      const valueChanged = !Object.is(nextValue, lastCommittedValue)
      inputValue.value = getStringValue(nextValue)
      updateNumberStatus(nextValue)
      if (valueChanged) {
        lastCommittedValue = nextValue
        emit('update:modelValue', nextValue)
        emit('change', nextValue, event)
      }
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
      const intermediate = isIntermediateValue(value)
      const number = getValueNumber(value)

      if (intermediate || isNumber(number)) {
        inputValue.value = props.formatter?.(value) ?? value
        updateNumberStatus(valueNumber.value)

        emit('input', valueNumber.value, inputValue.value, event)
        if (props.modelEvent === 'input' && (value === '' || !intermediate)) {
          emit('update:modelValue', number)
        }
      }
    }

    function handleChange(value: string, event: Event) {
      commitValue(event)
    }

    function handleFocus(event: FocusEvent) {
      emit('focus', event)
    }

    function handleBlur(event: FocusEvent) {
      handleChange(inputValue.value, event)
      emit('blur', event)
    }

    function handlePressEnter(event: KeyboardEvent) {
      handleChange(inputValue.value, event)
    }

    function handleClear(event: Event | string) {
      const clearEvent = event instanceof Event ? event : new Event('clear')
      inputValue.value = ''
      updateNumberStatus(undefined)
      lastCommittedValue = undefined
      emit('update:modelValue', undefined)
      emit('clear', clearEvent)
    }

    function handleKeydown(event: KeyboardEvent) {
      emit('keydown', event)
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
          lastCommittedValue = value
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
      handlePressEnter,
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
