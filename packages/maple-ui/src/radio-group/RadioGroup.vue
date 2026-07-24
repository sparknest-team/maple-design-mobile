<template>
  <div :class="n('wrap')">
    <div :aria-label="ariaLabel" role="radiogroup" :class="classes(n(), n(`--${direction}`))">
      <template v-if="options.length">
        <mp-radio
          v-for="option in options"
          :key="option[valueKey]"
          :checked-value="option[valueKey]"
          :disabled="option.disabled"
        >
          <template #default="{ checked }">
            <maybe-v-node :is="isFunction(option[labelKey]) ? option[labelKey](option, checked) : option[labelKey]" />
          </template>
        </mp-radio>
      </template>
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import { call, isFunction, preventDefault } from '@maplejs/maple-shared'
import { useEventListener } from '@maplejs/maple-use'
import { useFormItem } from '../form-item'
import MpRadio from '../radio'
import { createNamespace, MaybeVNode } from '../utils/components'
import { props } from './props'
import { useRadios, type RadioGroupProvider } from './provide'

const { name, n, classes } = createNamespace('radio-group')

export default defineComponent({
  name,
  components: { MpRadio, MaybeVNode },
  props,
  setup(props) {
    const { length, radios, bindRadios } = useRadios()
    const { mergedError, eventHandlers } = useFormItem()
    const hasChecked = ref(false)

    const radioGroupProvider: RadioGroupProvider = {
      onToggle,
      hasChecked: computed(() => hasChecked.value),
      errorMessage: mergedError,
    }

    watch(() => props.modelValue, syncRadios)
    watch(() => length.value, syncRadios)

    bindRadios(radioGroupProvider)

    useEventListener(() => window, 'keydown', handleKeydown)

    function handleKeydown(event: KeyboardEvent) {
      const focusingRadioIndex = radios.findIndex(({ isFocusing }) => isFocusing.value)
      if (focusingRadioIndex === -1) {
        return
      }

      const hasMoveableRadio = radios.some(({ moveable }, index) => (index === focusingRadioIndex ? false : moveable()))
      if (!hasMoveableRadio) {
        return
      }

      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
        preventDefault(event)
      }

      if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
        moveRadio(focusingRadioIndex, 'prev')
        return
      }

      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
        moveRadio(focusingRadioIndex, 'next')
      }
    }

    function moveRadio(fromIndex: number, method: 'prev' | 'next') {
      const looping = true

      while (looping) {
        if (method === 'prev') {
          fromIndex--
        } else {
          fromIndex++
        }

        if (fromIndex < 0) {
          fromIndex = radios.length - 1
        }

        if (fromIndex > radios.length - 1) {
          fromIndex = 0
        }

        const radio = radios[fromIndex]
        if (radio.moveable()) {
          radio.move()
          break
        }
      }
    }

    function syncRadios() {
      radios.forEach(({ sync }) => {
        if (sync(props.modelValue)) {
          hasChecked.value = true
        }
      })
    }

    function onToggle(changedValue: any) {
      call(props['onUpdate:modelValue'], changedValue)
      call(props.onChange, changedValue)
      eventHandlers.value.onChange?.()
    }

    return {
      mergedError,
      n,
      classes,
      isFunction,
    }
  },
})
</script>

<style lang="less">
@import '../styles/common';
@import '../ripple/ripple';
@import '../hover-overlay/hoverOverlay';
@import '../icon/icon';
@import '../radio/radio';
@import './radioGroup';
</style>
