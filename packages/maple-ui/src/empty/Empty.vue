<template>
  <div :class="classes(n(), n('$--box'))" v-bind="$attrs" @click.stop="handleClick">
    <div v-if="showIcon" :class="n('image')" :style="imageStyle">
      <slot name="image">
        <img v-if="imageUrl" :src="imageUrl" :alt="description" />
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 48 48"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path
            d="M24 5v6m7 1 4-4m-18 4-4-4m28.5 22H28s-1 3-4 3-4-3-4-3H6.5M40 41H8a2 2 0 0 1-2-2v-8.46a2 2 0 0 1 .272-1.007l6.15-10.54A2 2 0 0 1 14.148 18H33.85a2 2 0 0 1 1.728.992l6.149 10.541A2 2 0 0 1 42 30.541V39a2 2 0 0 1-2 2Z"
          />
        </svg>
      </slot>
    </div>

    <div v-if="showDescription && (description || $slots.default)" :class="n('description')">
      <slot>
        {{ description }}
      </slot>
    </div>

    <div v-if="$slots.extra" :class="n('extra')">
      <slot name="extra" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { isNumber } from '@maplejs/maple-shared'
import { createNamespace } from '../utils/components'
import { props, type EmptySize } from './props'

const { name, n, classes } = createNamespace('empty')

const IMAGE_SIZE_MAP: Record<EmptySize, string> = {
  xs: '80px',
  sm: '100px',
  md: '120px',
  lg: '140px',
  xl: '160px',
}

export default defineComponent({
  name,
  props,
  emits: ['click'],
  setup(props, { emit }) {
    const imageStyle = computed(() => {
      const { imageSize } = props

      if (imageSize in IMAGE_SIZE_MAP) {
        const px = IMAGE_SIZE_MAP[imageSize as EmptySize]
        return { width: px, height: px }
      }

      const size = isNumber(imageSize) ? `${imageSize}px` : imageSize
      return { width: size, height: size }
    })

    const handleClick = (event: Event) => {
      emit('click', event)
    }

    return {
      imageStyle,
      handleClick,
      n,
      classes,
    }
  },
})
</script>

<style lang="less">
@import '../styles/common';
@import './empty';
</style>
