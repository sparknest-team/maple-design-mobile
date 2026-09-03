<template>
  <div
    :class="itemClass"
    :style="itemStyle"
    tabindex="-1"
    :aria-hidden="currentIndex !== index"
    @focus="isFocusing = true"
    @blur="isFocusing = false"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { createNamespace } from '../utils/components'
import { toSizeUnit } from '../utils/elements'
import { carouselItemProps } from './item-props'
import { getClosestIndex, useCarousel, type CarouselItemProvider } from './item-provide'

const { name, n, classes } = createNamespace('carousel-item')

export default defineComponent({
  name,
  props: carouselItemProps,
  setup() {
    const translate = ref(0)
    const isFocusing = ref(false)
    const { carousel, bindCarousel, index } = useCarousel()
    const { size, currentIndex, vertical, effect, loop, length } = carousel

    const position = computed(() => getClosestIndex(index.value, currentIndex.value, length.value, loop.value))

    const itemClass = computed(() => {
      if (effect.value === 'slide') {
        return n()
      }
      return classes(
        n(),
        [position.value === 'active', n('--active')],
        [position.value === 'prev', n('--prev')],
        [position.value === 'next', n('--next')],
      )
    })

    const itemStyle = computed(() => {
      const style: Record<string, string> = {}

      if (effect.value === 'slide') {
        if (!vertical.value) {
          style.width = toSizeUnit(size.value)
        } else {
          style.height = toSizeUnit(size.value)
        }

        if (translate.value) {
          style.transform = `translate${vertical.value ? 'Y' : 'X'}(${toSizeUnit(translate.value)})`
        }
      }

      return style
    })

    const carouselItemProvider: CarouselItemProvider = {
      index,
      isFocusing: computed(() => isFocusing.value),
      setTranslate,
    }

    bindCarousel(carouselItemProvider)

    function setTranslate(x: number) {
      translate.value = x
    }

    return {
      isFocusing,
      size,
      index,
      currentIndex,
      itemClass,
      itemStyle,
      n,
      classes,
    }
  },
})
</script>
