<template>
  <div :class="n('wrap')">
    <div :class="n()">
      <div
        v-for="value in toNumber(count)"
        :key="value"
        v-ripple="{ disabled: formReadonly || readonly || formDisabled || disabled || !ripple }"
        v-hover:desktop="createHoverHandler(value)"
        :style="getStyle(value)"
        :class="getClass(value)"
        @click="handleClick(value, $event)"
      >
        <mp-registered-icon
          :class="n('content-icon')"
          mp-rate-cover
          :transition="0"
          :name="getCurrentState(value).name"
          :fallback="getDefaultIcon(getCurrentState(value).name)"
          :style="{ fontSize: positiveLength(size, '') }"
        />

        <mp-hover-overlay :hovering="hovering && value === currentHoveringValue && !disabled && !formDisabled" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { IconStar, IconStarFill, IconStarHalfFull } from '@maplejs/icons-vue'
import { call, toNumber } from '@maplejs/maple-shared'
import { useFormItem } from '../form/item-provide'
import { useForm } from '../form/provide'
import Hover, { HoverOverlay as MpHoverOverlay, useHoverOverlay } from '../hover'
import MpRegisteredIcon from '../icon/RegisteredIcon.vue'
import Ripple from '../ripple'
import { createNamespace } from '../utils/components'
import { toSizeUnit } from '../utils/elements'
import { positiveLength } from '../utils/size-length'
import { props } from './props'

const { name, n } = createNamespace('rate')

export default defineComponent({
  name,
  components: {
    MpRegisteredIcon,
    MpHoverOverlay,
  },
  directives: { Ripple, Hover },
  props,
  emits: ['change', 'update:modelValue'],
  setup(props, { emit }) {
    const currentHoveringValue = ref<number>(-1)
    const { form } = useForm()
    const { mergedError, eventHandlers } = useFormItem()
    const { hovering } = useHoverOverlay()

    let lastScore = toNumber(props.modelValue)

    function getDefaultIcon(name?: string) {
      if (name === 'star') {
        return IconStar
      }
      if (name === 'star-half-full') {
        return IconStarHalfFull
      }
      if (name === 'star-fill') {
        return IconStarFill
      }
      return undefined
    }

    function getStyle(val: number) {
      const { count, gap } = props

      return {
        color: getCurrentState(val).color,
        marginRight: val !== toNumber(count) ? toSizeUnit(gap) : 0,
      }
    }

    function getClass(val: number) {
      const { name, color } = getCurrentState(val)

      return {
        [n('content')]: true,
        [n('--disabled')]: form?.disabled.value || props.disabled,
        [n('--error')]: mergedError.value,
        [n('--primary')]: name !== props.emptyIcon && !color,
      }
    }

    function getCurrentState(index: number) {
      const { modelValue, disabled, disabledColor, color, allowHalf, emptyColor, icon, halfIcon, emptyIcon } = props
      let iconColor = color

      if (disabled || form?.disabled.value) {
        iconColor = disabledColor
      }

      if (index <= modelValue) {
        return { color: iconColor, name: icon }
      }

      if (allowHalf && index <= modelValue + 0.5) {
        return { color: iconColor, name: halfIcon }
      }

      return {
        color: disabled || form?.disabled.value ? disabledColor : emptyColor,
        name: emptyIcon,
      }
    }

    function changeValue(score: number, event: MouseEvent) {
      const { allowHalf, clearable } = props
      const { offsetWidth } = event.target as HTMLElement

      if (allowHalf && event.offsetX <= Math.floor(offsetWidth / 2)) {
        score -= 0.5
      }

      // set score to 0 when last score is equal to current score and clearable is true
      if (lastScore === score && clearable) {
        score = 0
      }

      if (lastScore !== score) {
        emit('update:modelValue', score)
        emit('change', score)
      }

      // update last score
      lastScore = score
    }

    function handleClick(score: number, event: MouseEvent) {
      const { readonly, disabled } = props

      if (readonly || disabled || form?.disabled.value || form?.readonly.value) {
        return
      }

      changeValue(score, event)
      eventHandlers.value.onChange?.()
    }

    function createHoverHandler(value: number) {
      return (isHover: boolean) => {
        currentHoveringValue.value = value
        hovering.value = isHover
      }
    }

    return {
      mergedError,
      formDisabled: form?.disabled,
      formReadonly: form?.readonly,
      hovering,
      getDefaultIcon,
      currentHoveringValue,
      getStyle,
      getClass,
      getCurrentState,
      handleClick,
      createHoverHandler,
      toSizeUnit,
      positiveLength,
      toNumber,
      n,
    }
  },
})
</script>
