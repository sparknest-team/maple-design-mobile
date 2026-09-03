<script lang="ts">
import { computed, defineComponent, type CSSProperties } from 'vue'
import { createNamespace } from '../utils/components'
import { badgeProps } from './props'

const { name, n, classes } = createNamespace('badge')

export default defineComponent({
  name,
  props: badgeProps,
  setup(props, { slots }) {
    const computedMode = computed(() => (!slots.default && !props.description ? 'inline' : props.mode))
    const dotComputed = computed(() => (typeof props.content === 'undefined' ? true : props.dot))
    const countValue = computed(() => (typeof props.content === 'number' ? props.content : null))
    const hasCount = computed(() => countValue.value !== null)
    const showValue = computed(() => {
      if (!props.show) {
        return false
      }
      if (hasCount.value) {
        return props.showZero ? true : !!(countValue.value && countValue.value > 0)
      }
      return true
    })

    const wrapperClass = computed(() =>
      classes(
        n(),
        [computedMode.value === 'floating' && props.position, n(`--position-${props.position}`)],
        [computedMode.value === 'inline' && props.inlinePosition, n(`--inline-position-${props.inlinePosition}`)],
        [computedMode.value, n(`--mode-${computedMode.value}`)],
        [dotComputed.value, n('--dot')],
        [props.size, n(`--size-${props.size}`)],
        [props.status, n(`--status-${props.status}`)],
        [props.variant, n(`--variant-${props.variant}`)],
      ),
    )

    const contentWrapperStyle = computed<CSSProperties>(() => {
      const style: CSSProperties = {}
      if (computedMode.value === 'floating') {
        const pos = props.position
        if (props.offsetX) {
          if (pos === 'top-left' || pos === 'bottom-left') {
            style.marginInlineStart = `${props.offsetX}px`
          } else if (pos === 'top-right' || pos === 'bottom-right') {
            style.marginInlineEnd = `${props.offsetX}px`
          }
        }
        if (props.offsetY) {
          if (pos === 'top-left' || pos === 'top-right') {
            style.marginBlockStart = `${props.offsetY}px`
          } else if (pos === 'bottom-left' || pos === 'bottom-right') {
            style.marginBlockEnd = `${props.offsetY}px`
          }
        }
      } else if (props.offsetY) {
        if (props.inlinePosition === 'start') {
          style.marginBlockStart = `${props.offsetY}px`
        } else if (props.inlinePosition === 'end') {
          style.marginBlockEnd = `${props.offsetY}px`
        }
      }
      return style
    })

    const contentStyle = computed<CSSProperties>(() => {
      const style: CSSProperties = {}
      if (props.color) {
        style.backgroundColor = props.color
      }
      if (props.textColor) {
        style.color = props.textColor
      }
      return style
    })

    const renderedContent = computed(() => {
      if (typeof props.content === 'string') {
        return props.content
      }
      if (props.max && hasCount.value && countValue.value && countValue.value > props.max) {
        return `${props.max}+`
      }
      return countValue.value
    })

    return {
      n,
      classes,
      computedMode,
      dotComputed,
      showValue,
      wrapperClass,
      contentWrapperStyle,
      contentStyle,
      renderedContent,
    }
  },
})
</script>

<template>
  <span :class="wrapperClass">
    <div :class="n('wrapper')">
      <template v-if="showValue">
        <span v-if="$slots.content" :class="classes(n('custom-dot'), n('content-wrapper'))">
          <slot name="content" />
        </span>
        <span v-else-if="dotComputed" :class="n('content-wrapper')" :style="contentWrapperStyle">
          <div :class="n('dot-content')" :style="contentStyle" />
        </span>
        <span v-else-if="typeof content !== 'undefined'" :class="n('content-wrapper')" :style="contentWrapperStyle">
          <span :class="n('content')" :style="contentStyle">{{ renderedContent }}</span>
        </span>
      </template>
      <span v-if="$slots.default || description" :class="n('description-wrapper')">
        <slot>{{ description }}</slot>
      </span>
    </div>
  </span>
</template>
