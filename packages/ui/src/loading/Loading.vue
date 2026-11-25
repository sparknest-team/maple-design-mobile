<template>
  <div
    :class="n()"
    :aria-busy="$slots.default && loading ? 'true' : undefined"
    :role="!$slots.default ? 'status' : undefined"
    :aria-live="!$slots.default ? 'polite' : undefined"
    :aria-atomic="!$slots.default ? 'true' : undefined"
  >
    <span v-if="!$slots.default && !$slots.tip && !tip" :class="n('sr-only')">{{ loadingText }}</span>
    <div v-if="$slots.default" :class="classes(n('content'), [loading, n('content--active')])">
      <slot />
      <div v-if="loading" :class="n('content-overlay')" />
    </div>

    <div
      v-if="(!$slots.default || loading) && (!hideIcon || $slots.tip || tip)"
      :class="classes(n('body'), [$slots.default, n('inside')])"
    >
      <div
        v-if="!hideIcon && ($slots.icon || customLoading)"
        :class="n('indicator')"
        :style="indicatorStyle"
        aria-hidden="true"
      >
        <slot v-if="$slots.icon" name="icon" />
        <component :is="customLoading" v-else />
      </div>
      <div v-else-if="!hideIcon && type === 'circle'" :class="n('circle')" aria-hidden="true">
        <span :class="classes(n('circle-block'), sizeClass('circle-block'))" :style="circleStyle">
          <svg viewBox="25 25 50 50" aria-hidden="true">
            <circle cx="50" cy="50" r="20" fill="none" />
          </svg>
        </span>
      </div>
      <div
        v-else-if="!hideIcon && animationCount"
        :key="type"
        :class="classes(n(type), sizeClass(type))"
        :style="sizeStyle"
        aria-hidden="true"
      >
        <span
          v-for="index in animationCount"
          :key="index"
          :class="classes(n(`${type}-item`), sizeClass(`${type}-item`))"
          :style="{ backgroundColor: color }"
        />
      </div>

      <div v-if="$slots.tip || tip" :class="classes(n('tip'), sizeClass('tip'))" :style="{ color }">
        <slot name="tip">{{ tip }}</slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts"></script>

<script lang="ts" setup>
import { computed } from 'vue'
import { createNamespace } from '../utils/components'
import { multiplySizeUnit, toSizeUnit } from '../utils/elements'
import { useLoadingPlatform } from './platform'
import { loadingProps } from './props'

const animationCounts = new Map<string, number>([
  ['wave', 5],
  ['cube', 4],
  ['rect', 8],
  ['disappear', 3],
])

defineOptions({
  name: createNamespace('loading').name,
})

const props = defineProps(loadingProps)
const { n, classes } = createNamespace('loading')
const { customLoading, loadingText } = useLoadingPlatform()
const animationCount = computed(() => animationCounts.get(props.type))
const indicatorStyle = computed(() => ({
  color: props.color,
  fontSize: typeof props.size === 'number' ? `${props.size}px` : undefined,
}))
const circleStyle = computed(() => {
  const diameter =
    props.radius == null && typeof props.size === 'number' ? toSizeUnit(props.size) : multiplySizeUnit(props.radius, 2)
  return { width: diameter, height: diameter, color: props.color }
})
const sizeStyle = computed(() => {
  if (typeof props.size !== 'number') {
    return undefined
  }
  const value = toSizeUnit(props.size)
  return { width: value, height: value }
})
const sizeClass = (element: string) => n(`${element}--${typeof props.size === 'number' ? 'numeric' : props.size}`)
</script>
