<script lang="ts" setup>
import { computed, useSlots, type CSSProperties } from 'vue'
import { createNamespace } from '../utils/components'
import { badgeProps } from './props'

defineOptions({
  name: createNamespace('badge').name,
})

const { n, classes } = createNamespace('badge')

const props = defineProps(badgeProps)
const slots = useSlots()

const computedMode = computed(() => (!slots.default && !props.description ? 'inline' : props.mode))

const dotComputed = computed(() => (typeof props.content === 'undefined' ? props.dot : props.dot))

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
    n(`--mode-${computedMode.value}`),
    [computedMode.value === 'floating', n(`--position-${props.position}`)],
    [computedMode.value === 'inline', n(`--inline-position-${props.inlinePosition}`)],
    [dotComputed.value, n('--dot')],
    n(`--size-${props.size}`),
    n(`--status-${props.status}`),
    n(`--variant-${props.variant}`),
  ),
)

const contentWrapperStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {}
  if (computedMode.value === 'floating') {
    const pos = props.position
    if (props.offsetX) {
      if (pos === 'top-left' || pos === 'bottom-left') {
        style.marginInlineStart = `${props.offsetX}px`
      } else {
        style.marginInlineEnd = `${props.offsetX}px`
      }
    }
    if (props.offsetY) {
      if (pos === 'top-left' || pos === 'top-right') {
        style.marginBlockStart = `${props.offsetY}px`
      } else {
        style.marginBlockEnd = `${props.offsetY}px`
      }
    }
  } else if (props.offsetY) {
    if (props.inlinePosition === 'start') {
      style.marginBlockStart = `${props.offsetY}px`
    } else {
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
  if (hasCount.value && countValue.value && countValue.value > props.max) {
    return `${props.max}+`
  }
  return countValue.value
})
</script>

<template>
  <span :class="wrapperClass">
    <div :class="n('wrapper')">
      <template v-if="showValue">
        <span v-if="slots.content" :class="classes(n('custom-dot'), n('content-wrapper'))">
          <slot name="content" />
        </span>
        <span v-else-if="dotComputed" :class="n('content-wrapper')" :style="contentWrapperStyle">
          <span :class="n('dot-content')" :style="contentStyle" />
        </span>
        <span v-else-if="typeof content !== 'undefined'" :class="n('content-wrapper')" :style="contentWrapperStyle">
          <span :class="n('content')" :style="contentStyle">{{ renderedContent }}</span>
        </span>
      </template>
      <span v-if="slots.default || description" :class="n('description-wrapper')">
        <slot>{{ description }}</slot>
      </span>
    </div>
  </span>
</template>

<style lang="less">
@import '../styles/common';
@import './badge';
</style>
