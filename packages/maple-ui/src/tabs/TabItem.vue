<template>
  <mp-carousel-item :class="classes(n(), [!current, n('--inactive')])" mp-tab-item-cover>
    <slot />
  </mp-carousel-item>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import MpCarouselItem from '../carousel/CarouselItem.vue'
import { createNamespace } from '../utils/components'
import { props } from './tab-item-props'
import { useInfiniteScrolls, useTabsItems, type TabItemProvider } from './tab-item-provide'

const { name, n, classes } = createNamespace('tab-item')

export default defineComponent({
  name,
  components: { MpCarouselItem },
  props,
  setup(props) {
    const current = ref(false)
    const name = computed(() => props.name)
    const { index, bindTabsItems } = useTabsItems()
    const { bindInfiniteScrolls } = useInfiniteScrolls()

    const tabItemProvider: TabItemProvider = {
      index,
      name,
      current: computed(() => current.value),
      setCurrent,
    }

    bindTabsItems(tabItemProvider)
    bindInfiniteScrolls(tabItemProvider)

    function setCurrent(value: boolean) {
      current.value = value
    }

    return {
      current,
      n,
      classes,
    }
  },
})
</script>
