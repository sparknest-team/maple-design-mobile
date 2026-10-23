<template>
  <div :class="classes(n(), n('$--box'))">
    <div
      :class="
        classes(
          n('controller'),
          formatElevation(elevation, 2),
          [disabled || formDisabled, n('--disabled')],
          [mergedError, n('--error')],
        )
      "
      :style="{ background: color }"
      v-bind="$attrs"
    >
      <mp-button
        :class="
          classes(
            n('decrement-button'),
            [!showDecrementButton, n('--hidden')],
            [disabled || formDisabled, n('--not-allowed')],
          )
        "
        :style="{
          width: toSizeUnit(buttonSize),
          height: toSizeUnit(buttonSize),
        }"
        round
        mp-counter-cover
        :ripple="
          ripple &&
          showDecrementButton &&
          !disabled &&
          !formDisabled &&
          !readonly &&
          !formReadonly &&
          !disableDecrement &&
          !isMin
        "
        @click="decrement"
        @touchstart="pressDecrement"
        @touchend="releaseDecrement"
        @touchcancel="releaseDecrement"
      >
        <mp-icon><MIconMinus /></mp-icon>
      </mp-button>

      <input
        v-model="inputValue"
        autocomplete="off"
        :class="classes(n('input'), [disabled || formDisabled, n('--not-allowed')])"
        :style="{
          width: toSizeUnit(inputWidth),
          fontSize: toSizeUnit(inputTextSize),
        }"
        :inputmode="toNumber(mergedDecimalLength) === 0 ? 'numeric' : 'decimal'"
        :placeholder="placeholder"
        :readonly="readonly || formReadonly"
        :disabled="disabled || formDisabled || disableInput"
        v-bind="inputAttrs"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown="handleKeydown"
      />

      <mp-button
        :class="
          classes(
            n('increment-button'),
            [!showIncrementButton, n('--hidden')],
            [disabled || formDisabled, n('--not-allowed')],
          )
        "
        :style="{
          width: toSizeUnit(buttonSize),
          height: toSizeUnit(buttonSize),
        }"
        round
        mp-counter-cover
        :ripple="
          ripple &&
          showIncrementButton &&
          !disabled &&
          !formDisabled &&
          !readonly &&
          !formReadonly &&
          !disableIncrement &&
          !isMax
        "
        @click="increment"
        @touchstart="pressIncrement"
        @touchend="releaseIncrement"
        @touchcancel="releaseIncrement"
      >
        <mp-icon><MIconPlus /></mp-icon>
      </mp-button>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onActivated,
  onBeforeUnmount,
  onDeactivated,
  ref,
  watch,
  type ComputedRef,
} from 'vue'
import { IconMinus as MIconMinus, IconPlus as MIconPlus } from '@maplejs/icons-vue'
import { call, toNumber } from '@maplejs/maple-shared'
import { Decimal } from 'decimal.js'
import MpButton from '../button'
import { useFormItem } from '../form/item-provide'
import { useForm } from '../form/provide'
import MpIcon from '../icon'
import Ripple from '../ripple'
import { createNamespace, formatElevation } from '../utils/components'
import { toSizeUnit } from '../utils/elements'
import { props } from './props'

const SPEED = 100
const DELAY = 600

const { name, n, classes } = createNamespace('counter')

export default defineComponent({
  name,
  components: {
    MIconMinus,
    MIconPlus,
    MpButton,
    MpIcon,
  },
  directives: { Ripple },
  inheritAttrs: false,
  props,
  emits: ['change', 'input', 'focus', 'blur', 'keydown', 'update:modelValue', 'increment', 'decrement'],
  setup(props, { emit }) {
    const inputValue = ref<string | number>('')
    const { form } = useForm()
    const { mergedError: formMergedError, eventHandlers } = useFormItem()
    const { readonly: formReadonly, disabled: formDisabled } = form ?? {}
    const mergedError = computed(() => props.error || formMergedError.value)
    const mergedDecimalLength = computed(() => props.precision ?? props.decimalLength)
    const showIncrementButton = computed(() => props.controls && props.incrementButton)
    const showDecrementButton = computed(() => props.controls && props.decrementButton)
    const isMax: ComputedRef<boolean> = computed(() => {
      const { max, modelValue } = props
      return max != null && toNumber(modelValue) >= toNumber(max)
    })
    const isMin: ComputedRef<boolean> = computed(() => {
      const { min, modelValue } = props
      return min != null && toNumber(modelValue) <= toNumber(min)
    })

    let incrementTimer: number | undefined
    let decrementTimer: number | undefined
    let incrementDelayTimer: number | undefined
    let decrementDelayTimer: number | undefined
    let incrementGeneration = 0
    let decrementGeneration = 0
    let active = true
    let disposed = false
    const available = () => active && !disposed
    const pressAllowed = () =>
      props.press &&
      !props.lazyChange &&
      !props.disabled &&
      !props.readonly &&
      !formDisabled?.value &&
      !formReadonly?.value
    const incrementAllowed = () =>
      pressAllowed() && showIncrementButton.value && !props.disableIncrement && !isMax.value
    const decrementAllowed = () =>
      pressAllowed() && showDecrementButton.value && !props.disableDecrement && !isMin.value
    watch(
      incrementAllowed,
      (enabled) => {
        if (!enabled) {
          releaseIncrement()
        }
      },
      { flush: 'sync' },
    )
    watch(
      decrementAllowed,
      (enabled) => {
        if (!enabled) {
          releaseDecrement()
        }
      },
      { flush: 'sync' },
    )
    onDeactivated(() => {
      active = false
      releaseIncrement()
      releaseDecrement()
    })
    onActivated(() => {
      if (!disposed) {
        active = true
      }
    })
    onBeforeUnmount(() => {
      disposed = true
      active = false
      releaseIncrement()
      releaseDecrement()
    })

    watch(
      () => props.modelValue,
      (newValue) => {
        setNormalizedValue(normalizeValue(String(newValue)))
        emit('change', toNumber(newValue))
      },
    )

    setNormalizedValue(normalizeValue(String(props.modelValue)))

    function normalizeValue(value: string) {
      const { max, min } = props
      let num: number = toNumber(value)

      if (max != null && num > toNumber(max)) {
        num = toNumber(max)
      }

      if (min != null && num < toNumber(min)) {
        num = toNumber(min)
      }

      value = String(num)

      if (mergedDecimalLength.value != null) {
        value = num.toFixed(toNumber(mergedDecimalLength.value))
      }

      return value
    }

    function formatValue(value: string) {
      return props.formatter ? String(props.formatter(toNumber(value))) : value
    }

    function parseValue(value: string) {
      return props.parser ? String(props.parser(value)) : value
    }

    function handleInput(event: Event) {
      const { value } = event.target as HTMLInputElement
      const parsedValue = parseValue(value)
      const normalizedValue = normalizeValue(parsedValue)

      emit('input', toNumber(normalizedValue), value, event)

      if (props.modelEvent === 'input') {
        setNormalizedValue(normalizedValue)
      }
    }

    function handleChange(event: Event) {
      const { lazyChange, beforeChange } = props
      const { value } = event.target as HTMLInputElement
      const normalizedValue = normalizeValue(parseValue(value))

      lazyChange ? call(beforeChange, toNumber(normalizedValue), change) : setNormalizedValue(normalizedValue)

      eventHandlers.value.onChange?.()
    }

    function handleFocus(event: FocusEvent) {
      emit('focus', event)
      eventHandlers.value.onFocus?.()
    }

    function handleBlur(event: FocusEvent) {
      emit('blur', event)
      eventHandlers.value.onBlur?.()
    }

    function handleKeydown(event: KeyboardEvent) {
      emit('keydown', event)
    }

    function decrement() {
      if (!available()) {
        return
      }
      const { disabled, readonly, disableDecrement, lazyChange, step, modelValue, beforeChange } = props

      if (
        formDisabled?.value ||
        formReadonly?.value ||
        disabled ||
        readonly ||
        disableDecrement ||
        !showDecrementButton.value
      ) {
        return
      }

      if (isMin.value) {
        return
      }

      const value = new Decimal(toNumber(modelValue)).minus(new Decimal(toNumber(step))).toString()
      const normalizedValue = normalizeValue(value)
      const normalizedValueNum = toNumber(normalizedValue)

      emit('decrement', normalizedValueNum)
      if (!available()) {
        return
      }

      if (lazyChange) {
        call(beforeChange, normalizedValueNum, change)
      } else {
        setNormalizedValue(normalizedValue)
        eventHandlers.value.onChange?.()
      }
    }

    function increment() {
      if (!available()) {
        return
      }
      const { disabled, readonly, disableIncrement, lazyChange, step, modelValue, beforeChange } = props

      if (
        formDisabled?.value ||
        formReadonly?.value ||
        disabled ||
        readonly ||
        disableIncrement ||
        !showIncrementButton.value
      ) {
        return
      }

      if (isMax.value) {
        return
      }

      const value = new Decimal(toNumber(modelValue)).plus(new Decimal(toNumber(step))).toString()
      const normalizedValue = normalizeValue(value)
      const normalizedValueNum = toNumber(normalizedValue)

      emit('increment', normalizedValueNum)
      if (!available()) {
        return
      }

      if (lazyChange) {
        call(beforeChange, normalizedValueNum, change)
      } else {
        setNormalizedValue(normalizedValue)
        eventHandlers.value.onChange?.()
      }
    }

    function pressDecrement() {
      releaseDecrement()
      if (!available() || !decrementAllowed()) {
        return
      }
      const generation = decrementGeneration
      let consumed = false
      decrementDelayTimer = window.setTimeout(() => {
        if (consumed || generation !== decrementGeneration || !available() || !decrementAllowed()) {
          return
        }
        consumed = true
        decrementDelayTimer = undefined
        continuedDecrement(generation)
      }, DELAY)
    }

    function pressIncrement() {
      releaseIncrement()
      if (!available() || !incrementAllowed()) {
        return
      }
      const generation = incrementGeneration
      let consumed = false
      incrementDelayTimer = window.setTimeout(() => {
        if (consumed || generation !== incrementGeneration || !available() || !incrementAllowed()) {
          return
        }
        consumed = true
        incrementDelayTimer = undefined
        continuedIncrement(generation)
      }, DELAY)
    }

    function releaseDecrement() {
      decrementGeneration++
      if (decrementTimer !== undefined) {
        window.clearTimeout(decrementTimer)
      }
      if (decrementDelayTimer !== undefined) {
        window.clearTimeout(decrementDelayTimer)
      }
      decrementTimer = decrementDelayTimer = undefined
    }

    function releaseIncrement() {
      incrementGeneration++
      if (incrementTimer !== undefined) {
        window.clearTimeout(incrementTimer)
      }
      if (incrementDelayTimer !== undefined) {
        window.clearTimeout(incrementDelayTimer)
      }
      incrementTimer = incrementDelayTimer = undefined
    }

    function continuedIncrement(generation: number) {
      if (generation !== incrementGeneration || !available() || !incrementAllowed()) {
        return
      }
      let consumed = false
      incrementTimer = window.setTimeout(() => {
        if (consumed || generation !== incrementGeneration || !available() || !incrementAllowed()) {
          return
        }
        consumed = true
        incrementTimer = undefined
        increment()
        if (generation === incrementGeneration && available() && incrementAllowed()) {
          continuedIncrement(generation)
        }
      }, SPEED)
    }

    function continuedDecrement(generation: number) {
      if (generation !== decrementGeneration || !available() || !decrementAllowed()) {
        return
      }
      let consumed = false
      decrementTimer = window.setTimeout(() => {
        if (consumed || generation !== decrementGeneration || !available() || !decrementAllowed()) {
          return
        }
        consumed = true
        decrementTimer = undefined
        decrement()
        if (generation === decrementGeneration && available() && decrementAllowed()) {
          continuedDecrement(generation)
        }
      }, SPEED)
    }

    function setNormalizedValue(normalizedValue: string) {
      inputValue.value = formatValue(normalizedValue)

      const normalizedValueNum = toNumber(normalizedValue)

      emit('update:modelValue', normalizedValueNum)
    }

    function change(value: number) {
      if (!available()) {
        return
      }
      setNormalizedValue(normalizeValue(String(value)))
      eventHandlers.value.onChange?.()
    }

    return {
      inputValue,
      mergedError,
      mergedDecimalLength,
      showIncrementButton,
      showDecrementButton,
      formDisabled,
      formReadonly,
      isMax,
      isMin,
      n,
      classes,
      formatElevation,
      handleInput,
      handleChange,
      handleFocus,
      handleBlur,
      handleKeydown,
      decrement,
      increment,
      pressDecrement,
      pressIncrement,
      releaseDecrement,
      releaseIncrement,
      toSizeUnit,
      toNumber,
    }
  },
})
</script>
