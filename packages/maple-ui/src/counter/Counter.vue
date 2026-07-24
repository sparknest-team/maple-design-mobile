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
            [!decrementButton, n('--hidden')],
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
          decrementButton &&
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
        <mp-icon name="minus" />
      </mp-button>

      <input
        v-model="inputValue"
        :class="classes(n('input'), [disabled || formDisabled, n('--not-allowed')])"
        :style="{
          width: toSizeUnit(inputWidth),
          fontSize: toSizeUnit(inputTextSize),
        }"
        :inputmode="toNumber(decimalLength) === 0 ? 'numeric' : 'decimal'"
        :readonly="readonly || formReadonly"
        :disabled="disabled || formDisabled || disableInput"
        @change="handleChange"
      />

      <mp-button
        :class="
          classes(
            n('increment-button'),
            [!incrementButton, n('--hidden')],
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
          incrementButton &&
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
        <mp-icon name="plus" />
      </mp-button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch, type ComputedRef } from 'vue'
import { call, toNumber } from '@maplejs/maple-shared'
import { Decimal } from 'decimal.js'
import MpButton from '../button'
import { useFormItem } from '../form-item'
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
    MpButton,
    MpIcon,
  },
  directives: { Ripple },
  inheritAttrs: false,
  props,
  setup(props) {
    const inputValue = ref<string | number>('')
    const { form } = useForm()
    const { mergedError, eventHandlers } = useFormItem()
    const { readonly: formReadonly, disabled: formDisabled } = form ?? {}
    const isMax: ComputedRef<boolean> = computed(() => {
      const { max, modelValue } = props
      return max != null && toNumber(modelValue) >= toNumber(max)
    })
    const isMin: ComputedRef<boolean> = computed(() => {
      const { min, modelValue } = props
      return min != null && toNumber(modelValue) <= toNumber(min)
    })

    let incrementTimer: number
    let decrementTimer: number
    let incrementDelayTimer: number
    let decrementDelayTimer: number

    watch(
      () => props.modelValue,
      (newValue) => {
        setNormalizedValue(normalizeValue(String(newValue)))
        call(props.onChange, toNumber(newValue))
      },
    )

    setNormalizedValue(normalizeValue(String(props.modelValue)))

    function normalizeValue(value: string) {
      const { decimalLength, max, min } = props
      let num: number = toNumber(value)

      if (max != null && num > toNumber(max)) {
        num = toNumber(max)
      }

      if (min != null && num < toNumber(min)) {
        num = toNumber(min)
      }

      value = String(num)

      if (decimalLength != null) {
        value = num.toFixed(toNumber(decimalLength))
      }

      return value
    }

    function handleChange(event: Event) {
      const { lazyChange, onBeforeChange } = props
      const { value } = event.target as HTMLInputElement
      const normalizedValue = normalizeValue(value)

      lazyChange ? call(onBeforeChange, toNumber(normalizedValue), change) : setNormalizedValue(normalizedValue)

      eventHandlers.value.onChange?.()
    }

    function decrement() {
      const {
        disabled,
        readonly,
        disableDecrement,
        decrementButton,
        lazyChange,
        step,
        modelValue,
        onDecrement,
        onBeforeChange,
      } = props

      if (formDisabled?.value || formReadonly?.value || disabled || readonly || disableDecrement || !decrementButton) {
        return
      }

      if (isMin.value) {
        return
      }

      const value = new Decimal(toNumber(modelValue)).minus(new Decimal(toNumber(step))).toString()
      const normalizedValue = normalizeValue(value)
      const normalizedValueNum = toNumber(normalizedValue)

      call(onDecrement, normalizedValueNum)

      if (lazyChange) {
        call(onBeforeChange, normalizedValueNum, change)
      } else {
        setNormalizedValue(normalizedValue)
        eventHandlers.value.onChange?.()
      }
    }

    function increment() {
      const {
        disabled,
        readonly,
        disableIncrement,
        incrementButton,
        lazyChange,
        step,
        modelValue,
        onIncrement,
        onBeforeChange,
      } = props

      if (formDisabled?.value || formReadonly?.value || disabled || readonly || disableIncrement || !incrementButton) {
        return
      }

      if (isMax.value) {
        return
      }

      const value = new Decimal(toNumber(modelValue)).plus(new Decimal(toNumber(step))).toString()
      const normalizedValue = normalizeValue(value)
      const normalizedValueNum = toNumber(normalizedValue)

      call(onIncrement, normalizedValueNum)

      if (lazyChange) {
        call(onBeforeChange, normalizedValueNum, change)
      } else {
        setNormalizedValue(normalizedValue)
        eventHandlers.value.onChange?.()
      }
    }

    function pressDecrement() {
      const { press, lazyChange } = props

      if (!press || lazyChange) {
        return
      }

      decrementDelayTimer = window.setTimeout(() => {
        continuedDecrement()
      }, DELAY)
    }

    function pressIncrement() {
      const { press, lazyChange } = props

      if (!press || lazyChange) {
        return
      }

      incrementDelayTimer = window.setTimeout(() => {
        continuedIncrement()
      }, DELAY)
    }

    function releaseDecrement() {
      decrementTimer && clearTimeout(decrementTimer)
      decrementDelayTimer && clearTimeout(decrementDelayTimer)
    }

    function releaseIncrement() {
      incrementTimer && clearTimeout(incrementTimer)
      incrementDelayTimer && clearTimeout(incrementDelayTimer)
    }

    function continuedIncrement() {
      incrementTimer = window.setTimeout(() => {
        increment()
        continuedIncrement()
      }, SPEED)
    }

    function continuedDecrement() {
      decrementTimer = window.setTimeout(() => {
        decrement()
        continuedDecrement()
      }, SPEED)
    }

    function setNormalizedValue(normalizedValue: string) {
      inputValue.value = normalizedValue

      const normalizedValueNum = toNumber(normalizedValue)

      call(props['onUpdate:modelValue'], normalizedValueNum)
    }

    function change(value: number) {
      setNormalizedValue(normalizeValue(String(value)))
      eventHandlers.value.onChange?.()
    }

    return {
      inputValue,
      mergedError,
      formDisabled,
      formReadonly,
      isMax,
      isMin,
      n,
      classes,
      formatElevation,
      handleChange,
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

<style lang="less">
@import '../styles/common';
@import '../styles/elevation';
@import '../icon/icon';
@import '../loading/loading';
@import '../button/button';
@import '../ripple/ripple';
@import './counter';
</style>
