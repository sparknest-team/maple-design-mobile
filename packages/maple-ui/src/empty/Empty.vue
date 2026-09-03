<script lang="ts">
import { computed, defineComponent, type CSSProperties } from 'vue'
import { t } from '../locale'
import { injectLocaleProvider } from '../locale-provider/provide'
import { createNamespace } from '../utils/components'
import { componentSizes } from '../utils/constants'
import { emptyProps } from './props'

const { name, n, classes } = createNamespace('empty')

export default defineComponent({
  name,
  props: emptyProps,
  emits: ['click'],
  setup(props, { emit }) {
    const { t: pt } = injectLocaleProvider()
    const namedSize = computed(() => {
      const val = props.imageSize
      return typeof val === 'string' && componentSizes.includes(val as (typeof componentSizes)[number]) ? val : ''
    })
    const imageClass = computed(() => classes(n('image'), namedSize.value ? n(`image--${namedSize.value}`) : undefined))
    const imageStyle = computed<CSSProperties>(() => {
      if (namedSize.value) {
        return {}
      }
      const size = typeof props.imageSize === 'number' ? `${props.imageSize}px` : props.imageSize
      return { width: size, height: size, fontSize: size }
    })
    const descriptionText = computed(() => props.description || (pt ? pt : t)('emptyDescription'))

    const handleClick = (event: MouseEvent) => {
      emit('click', event)
    }

    return {
      n,
      classes,
      imageClass,
      imageStyle,
      descriptionText,
      handleClick,
    }
  },
})
</script>

<template>
  <div :class="classes(n(), n('$--box'))" @click.stop="handleClick">
    <div v-if="showIcon" :class="imageClass" :style="imageStyle">
      <slot name="image">
        <img v-if="imageUrl" :src="imageUrl" :alt="alt" />
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
    <div v-if="showDescription" :class="n('description')">
      <slot>{{ descriptionText }}</slot>
    </div>
    <div v-if="$slots.extra" :class="n('extra')">
      <slot name="extra" />
    </div>
  </div>
</template>
