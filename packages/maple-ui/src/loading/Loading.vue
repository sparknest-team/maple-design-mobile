<template>
  <div :class="n()">
    <div v-if="$slots.default" :class="classes(n('content'), [loading, n('content--active')])">
      <slot />
      <div v-if="loading" :class="n('content-mask')"></div>
    </div>
    <div v-if="isShow" :class="classes(n('$--box'), n('body'), [$slots.default, n('inside')])">
      <div v-if="type === 'circle'" :class="n('circle')">
        <span
          :class="classes(n('circle-block'), sizeClass('circle-block'))"
          :style="{
            width: circleSize(radius, size),
            height: circleSize(radius, size),
            color,
          }"
        >
          <svg viewBox="25 25 50 50">
            <circle cx="50" cy="50" r="20" fill="none"></circle>
          </svg>
        </span>
      </div>

      <template v-for="(nums, key) in loadingTypeDict" :key="key">
        <div v-if="type === key" :class="classes(n(key), sizeClass(key))" :style="sizeStyle(size)">
          <div
            v-for="num in nums"
            :key="num + key"
            :style="{ backgroundColor: color }"
            :class="classes(n(`${key}-item`), sizeClass(`${key}-item`))"
          ></div>
        </div>
      </template>
      <div v-if="$slots.tip || tip" :class="classes(n('tip'), sizeClass('tip'))" :style="{ color }">
        <slot name="tip">{{ tip }}</slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { call } from '@maplejs/maple-shared'
import { createNamespace } from '../utils/components'
import { multiplySizeUnit, toSizeUnit } from '../utils/elements'
import { props } from './props'

const { name, n, classes } = createNamespace('loading')

export default defineComponent({
  name,
  props,
  setup(props, { slots }) {
    const isShow = computed(() => {
      if (!call(slots.default)) {
        return true
      }

      return props.loading
    })

    const loadingTypeDict = {
      wave: 5,
      cube: 4,
      rect: 8,
      disappear: 3,
    }

    const sizeClass = (element: string) => (typeof props.size === 'string' ? n(`${element}--${props.size}`) : undefined)
    const sizeStyle = (size: unknown) => {
      if (typeof size !== 'number') {
        return undefined
      }
      const value = toSizeUnit(size)
      return { width: value, height: value }
    }
    const circleSize = (radius: unknown, size: unknown) =>
      radius == null && typeof size === 'number' ? toSizeUnit(size) : multiplySizeUnit(radius, 2)

    return {
      loadingTypeDict,
      isShow,
      n,
      classes,
      multiplySizeUnit,
      sizeClass,
      sizeStyle,
      circleSize,
    }
  },
})
</script>
