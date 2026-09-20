<template>
  <div
    :class="n()"
    :aria-busy="$slots.default && loading ? 'true' : undefined"
    :role="!$slots.default ? 'status' : undefined"
    :aria-live="!$slots.default ? 'polite' : undefined"
  >
    <div v-if="$slots.default" :class="classes(n('content'), [loading, n('content--active')])">
      <slot />
      <div v-if="loading" :class="n('content-overlay')" />
    </div>

    <div v-if="showBody" :class="classes(n('body'), [$slots.default, n('inside')])">
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
      <template v-for="(count, animationType) in loadingTypeDict" :key="animationType">
        <div
          v-if="!hideIcon && type === animationType"
          :class="classes(n(animationType), sizeClass(animationType))"
          :style="sizeStyle"
          aria-hidden="true"
        >
          <span
            v-for="index in count"
            :key="index"
            :class="classes(n(`${animationType}-item`), sizeClass(`${animationType}-item`))"
            :style="{ backgroundColor: color }"
          />
        </div>
      </template>

      <div v-if="$slots.tip || tip" :class="classes(n('tip'), sizeClass('tip'))" :style="{ color }">
        <slot name="tip">{{ tip }}</slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, useSlots } from 'vue'
import { createNamespace } from '../utils/components'
import { multiplySizeUnit, toSizeUnit } from '../utils/elements'
import { useLoadingPlatform } from './platform'
import { loadingProps } from './props'

defineOptions({
  name: createNamespace('loading').name,
})

const props = defineProps(loadingProps)
const slots = useSlots()
const { n, classes } = createNamespace('loading')
const { customLoading } = useLoadingPlatform()
const isShow = computed(() => !slots.default || props.loading)
const showBody = computed(() => isShow.value && (!props.hideIcon || Boolean(slots.tip || props.tip)))
const loadingTypeDict = { wave: 5, cube: 4, rect: 8, disappear: 3 } as const
const indicatorStyle = computed(() => ({
  color: props.color,
  fontSize: typeof props.size === 'number' ? `${props.size}px` : undefined,
}))
const circleStyle = computed(() => ({
  width:
    props.radius == null && typeof props.size === 'number' ? toSizeUnit(props.size) : multiplySizeUnit(props.radius, 2),
  height:
    props.radius == null && typeof props.size === 'number' ? toSizeUnit(props.size) : multiplySizeUnit(props.radius, 2),
  color: props.color,
}))
const sizeStyle = computed(() => {
  if (typeof props.size !== 'number') {
    return undefined
  }
  const value = toSizeUnit(props.size)
  return { width: value, height: value }
})
const sizeClass = (element: string) => n(`${element}--${typeof props.size === 'number' ? 'numeric' : props.size}`)
</script>
