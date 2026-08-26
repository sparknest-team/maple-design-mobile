<template>
  <div v-hover:desktop="hover" :class="classes(n(), n(`--variant-${variant}`))">
    <div
      :class="classes(n('block'), [disabled || formDisabled, n('--disabled')], [isChecked, n('block--active')])"
      :style="styleComputed.switch"
      role="switch"
      :aria-checked="isChecked"
      :aria-disabled="disabled || formDisabled || undefined"
      :aria-busy="loading || undefined"
      :tabindex="disabled || formDisabled ? -1 : 0"
      @click="switchChecked"
      @keydown.enter.prevent="switchChecked"
      @keydown.space.prevent="switchChecked"
      @focus="isFocusing = true"
      @blur="isFocusing = false"
    >
      <div
        :style="styleComputed.track"
        :class="
          classes(n('track'), [isChecked, n('track--active')], [mergedError && variant !== 'md3', n('track--error')])
        "
      ></div>
      <div
        v-ripple="{
          disabled: !ripple || disabled || loading || formDisabled || readonly || formReadonly,
        }"
        :class="classes(n('ripple'), [isChecked, n('ripple--active')])"
        :style="styleComputed.ripple"
      >
        <div
          :style="styleComputed.handle"
          :class="
            classes(
              n('handle'),
              formatElevation(handleElevation, 2),
              [isChecked, n('handle--active')],
              [mergedError && variant !== 'md3', n('handle--error')],
              [hovering, n('handle--hover')],
            )
          "
        >
          <span
            v-if="loading"
            :class="n('loading')"
            :style="{
              width: radius,
              height: radius,
            }"
          >
            <svg viewBox="25 25 50 50">
              <circle cx="50" cy="50" r="20" fill="none"></circle>
            </svg>
          </span>
        </div>

        <mp-hover-overlay
          :hovering="hovering && !disabled && !formDisabled"
          :focusing="isFocusing && !disabled && !formDisabled"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { call } from '@maplejs/maple-shared'
import { useFormItem } from '../form-item'
import { useForm } from '../form/provide'
import Hover from '../hover'
import MpHoverOverlay, { useHoverOverlay } from '../hover-overlay'
import Ripple from '../ripple'
import { createNamespace, formatElevation } from '../utils/components'
import { multiplySizeUnit } from '../utils/elements'
import { props } from './props'

const { name, n, classes } = createNamespace('switch')

type StyleProps = {
  width: string
  height: string
  left: string
  borderRadius: string
  backgroundColor: string
  color: string
}

export default defineComponent({
  name,
  components: {
    MpHoverOverlay,
  },
  directives: { Ripple, Hover },
  props,
  emits: ['click', 'change', 'update:modelValue'],
  setup(props, { emit }) {
    const isFocusing = ref(false)
    const { form } = useForm()
    const { mergedError, eventHandlers } = useFormItem()
    const { hovering, handleHovering } = useHoverOverlay()

    const isChecked = computed(() => props.modelValue === props.checkedValue)

    const styleComputed = computed<Record<string, Partial<StyleProps>>>(() => {
      const { size, checkedColor, uncheckedColor, loadingColor, variant } = props
      const isMd3 = variant === 'md3'

      return {
        handle: {
          width: multiplySizeUnit(size),
          height: multiplySizeUnit(size),
          backgroundColor: isChecked.value ? checkedColor : uncheckedColor,
          color: loadingColor,
        },
        ripple: {
          left: isChecked.value ? multiplySizeUnit(size, 0.5) : `-${multiplySizeUnit(size, isMd3 ? 1 / 3 : 0.5)}`,
          color: isChecked.value ? checkedColor : uncheckedColor || 'currentColor',
          width: multiplySizeUnit(size, 2),
          height: multiplySizeUnit(size, 2),
        },
        track: {
          width: multiplySizeUnit(size, isMd3 ? 13 / 6 : 1.9),
          height: multiplySizeUnit(size, isMd3 ? 4 / 3 : 0.72),
          borderRadius: multiplySizeUnit(size, 2 / 3),
          filter: isChecked.value || mergedError.value ? undefined : `brightness(${isMd3 ? 1 : 0.6})`,
          backgroundColor: isChecked.value ? checkedColor : uncheckedColor,
          borderWidth: isMd3 && !isChecked.value ? multiplySizeUnit(size, 1 / 12) : undefined,
        },
        switch: {
          width: multiplySizeUnit(size, isMd3 ? 13 / 6 : 2),
          height: multiplySizeUnit(size, isMd3 ? 4 / 3 : 1.2),
        },
      }
    })

    const radius = computed(() => multiplySizeUnit(props.size, 0.8))

    function switchChecked(event: Event) {
      const { disabled, loading, readonly, checkedValue, uncheckedValue, lazyChange, beforeChange } = props

      if (disabled || form?.disabled.value) {
        return
      }

      emit('click', event)

      if (loading || readonly || form?.readonly.value) {
        return
      }

      const newValue = isChecked.value ? uncheckedValue : checkedValue

      if (lazyChange) {
        call(beforeChange, newValue, (value) => {
          emit('update:modelValue', value)
          eventHandlers.value.onChange?.()
        })
      } else {
        emit('change', newValue)
        emit('update:modelValue', newValue)
        eventHandlers.value.onChange?.()
      }
    }

    function hover(value: boolean) {
      if (props.disabled || form?.disabled.value) {
        return
      }

      handleHovering(value)
    }

    return {
      isChecked,
      hovering,
      isFocusing,
      radius,
      styleComputed,
      mergedError,
      formDisabled: form?.disabled,
      formReadonly: form?.readonly,
      n,
      classes,
      formatElevation,
      multiplySizeUnit,
      switchChecked,
      hover,
    }
  },
})
</script>

<style lang="less">
@import '../styles/common';
@import '../styles/elevation';
@import '../ripple/ripple';
@import '../loading/loading';
@import '../hover-overlay/hoverOverlay';
@import './switch';
</style>
