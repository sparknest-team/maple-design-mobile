<template>
  <div
    v-hover:desktop="hover"
    :class="classes(n(), [variant, n('--variant')])"
    role="switch"
    :aria-checked="modelValue"
  >
    <div
      ref="switchRef"
      :class="classes(n('block'), [disabled || formDisabled, n('--disabled')], [isActive, n('block--active')])"
      :style="styleComputed.switch"
      @click="switchActive"
    >
      <div
        :style="styleComputed.track"
        :class="classes(n('track'), [isActive, n('track--active')], [mergedError && !variant, n('track--error')])"
      ></div>
      <div
        v-ripple="{
          disabled: !ripple || disabled || loading || formDisabled || readonly || formReadonly,
        }"
        :class="classes(n('ripple'), [isActive, n('ripple--active')])"
        :style="styleComputed.ripple"
        :tabindex="disabled || formDisabled ? undefined : '0'"
        @focus="isFocusing = true"
        @blur="isFocusing = false"
      >
        <div
          :style="styleComputed.handle"
          :class="
            classes(
              n('handle'),
              formatElevation(buttonElevation, 2),
              [isActive, n('handle--active')],
              [mergedError && !variant, n('handle--error')],
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
import { call, preventDefault } from '@maplejs/maple-shared'
import { useEventListener } from '@maplejs/maple-use'
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
  setup(props) {
    const switchRef = ref<HTMLElement | null>(null)
    const isFocusing = ref(false)
    const { form } = useForm()
    const { mergedError, eventHandlers } = useFormItem()
    const { hovering, handleHovering } = useHoverOverlay()

    const isActive = computed(() => props.modelValue === props.activeValue)

    const styleComputed = computed<Record<string, Partial<StyleProps>>>(() => {
      const { size, color, closeColor, loadingColor, variant } = props

      return {
        handle: {
          width: multiplySizeUnit(size),
          height: multiplySizeUnit(size),
          backgroundColor: isActive.value ? color : closeColor,
          color: loadingColor,
        },
        ripple: {
          left: isActive.value ? multiplySizeUnit(size, 0.5) : `-${multiplySizeUnit(size, variant ? 1 / 3 : 0.5)}`,
          color: isActive.value ? color : closeColor || 'currentColor',
          width: multiplySizeUnit(size, 2),
          height: multiplySizeUnit(size, 2),
        },
        track: {
          width: multiplySizeUnit(size, variant ? 13 / 6 : 1.9),
          height: multiplySizeUnit(size, variant ? 4 / 3 : 0.72),
          borderRadius: multiplySizeUnit(size, 2 / 3),
          filter: isActive.value || mergedError.value ? undefined : `brightness(${variant ? 1 : 0.6})`,
          backgroundColor: isActive.value ? color : closeColor,
          borderWidth: variant && !isActive.value ? multiplySizeUnit(size, 1 / 12) : undefined,
        },
        switch: {
          width: multiplySizeUnit(size, variant ? 13 / 6 : 2),
          height: multiplySizeUnit(size, variant ? 4 / 3 : 1.2),
        },
      }
    })

    const radius = computed(() => multiplySizeUnit(props.size, 0.8))

    useEventListener(() => window, 'keydown', handleKeydown)
    useEventListener(() => window, 'keyup', handleKeyup)

    function handleKeydown(event: KeyboardEvent) {
      if (!isFocusing.value) {
        return
      }

      if (event.key === ' ' || event.key === 'Enter') {
        preventDefault(event)
      }

      if (event.key === 'Enter') {
        switchRef.value!.click()
      }
    }

    function handleKeyup(event: KeyboardEvent) {
      if (!isFocusing.value || event.key !== ' ') {
        return
      }

      preventDefault(event)
      switchRef.value!.click()
    }

    function switchActive(event: Event) {
      const {
        onClick,
        onChange,
        disabled,
        loading,
        readonly,
        activeValue,
        inactiveValue,
        lazyChange,
        'onUpdate:modelValue': updateModelValue,
        onBeforeChange,
      } = props

      if (disabled || form?.disabled.value) {
        return
      }

      call(onClick, event)

      if (loading || readonly || form?.readonly.value) {
        return
      }

      const newValue = isActive.value ? inactiveValue : activeValue

      if (lazyChange) {
        call(onBeforeChange, newValue, (value) => {
          call(updateModelValue, value)
          eventHandlers.value.onChange?.()
        })
      } else {
        call(onChange, newValue)
        call(updateModelValue, newValue)
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
      isActive,
      switchRef,
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
      switchActive,
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
