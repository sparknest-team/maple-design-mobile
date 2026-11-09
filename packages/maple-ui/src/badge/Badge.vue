<script setup lang="ts">
import { computed, useSlots, type CSSProperties } from 'vue'
import { createNamespace } from '../utils/components'
import { badgeProps } from './props'

defineOptions({ name: createNamespace('badge').name })
const { n, classes } = createNamespace('badge')
const props = defineProps(badgeProps)
const slots = useSlots()
const computedMode = computed(() => (!slots.default && !props.description ? 'inline' : props.mode))
const dotComputed = computed(() => props.content === undefined || props.dot)
const countValue = computed(() => (typeof props.content === 'number' ? props.content : null))
const showValue = computed(
  () =>
    props.show &&
    (countValue.value === null ||
      (Number.isFinite(countValue.value) && (countValue.value > 0 || (countValue.value === 0 && props.showZero)))),
)
const maxValue = computed(() => (Number.isFinite(props.max) && props.max >= 0 ? props.max : 99))
const offsetX = computed(() => (Number.isFinite(props.offsetX) ? props.offsetX : 0))
const offsetY = computed(() => (Number.isFinite(props.offsetY) ? props.offsetY : 0))
const wrapperClass = computed(() =>
  classes(
    n(),
    [computedMode.value === 'floating', n(`--position-${props.position}`)],
    [computedMode.value === 'inline', n(`--inline-position-${props.inlinePosition}`)],
    n(`--mode-${computedMode.value}`),
    [dotComputed.value, n('--dot')],
    n(`--size-${props.size}`),
    n(`--status-${props.status}`),
    n(`--variant-${props.variant}`),
  ),
)
const contentWrapperStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {}
  if (computedMode.value === 'floating') {
    // position denotes a physical corner; logical margins would reverse offsets in RTL.
    const pos = props.position
    if (offsetX.value) {
      if (pos.includes('left')) {
        style.marginLeft = `${offsetX.value}px`
      } else {
        style.marginRight = `${offsetX.value}px`
      }
    }
    if (offsetY.value) {
      if (pos.startsWith('top')) {
        style.marginTop = `${offsetY.value}px`
      } else if (pos.startsWith('bottom')) {
        style.marginBottom = `${offsetY.value}px`
      } else {
        style.marginTop = `${offsetY.value}px`
      }
    }
  } else if (offsetY.value) {
    style[props.inlinePosition === 'start' ? 'marginBlockStart' : 'marginBlockEnd'] = `${offsetY.value}px`
  }
  return style
})
const contentStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {}
  if (props.color) {
    if (props.variant === 'outline') {
      style.borderColor = props.color
      style.color = props.color
    } else {
      style.backgroundColor = props.color
    }
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
  if (maxValue.value > 0 && countValue.value !== null && countValue.value > maxValue.value) {
    return `${maxValue.value}+`
  }
  return countValue.value
})
</script>

<template>
  <span :class="wrapperClass">
    <span :class="n('wrapper')">
      <template v-if="showValue">
        <span
          v-if="$slots.content"
          :class="classes(n('custom-dot'), n('content-wrapper'))"
          :style="contentWrapperStyle"
        >
          <slot name="content" />
        </span>
        <span v-else-if="dotComputed" :class="n('content-wrapper')" :style="contentWrapperStyle">
          <span :class="n('dot-content')" :style="contentStyle" />
        </span>
        <span v-else-if="content !== undefined" :class="n('content-wrapper')" :style="contentWrapperStyle">
          <span :class="n('content')" :style="contentStyle">{{ renderedContent }}</span>
        </span>
      </template>
      <span v-if="$slots.default || description" :class="n('description-wrapper')">
        <slot>{{ description }}</slot>
      </span>
    </span>
  </span>
</template>
