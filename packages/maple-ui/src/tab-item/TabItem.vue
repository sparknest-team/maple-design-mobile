<template>
  <mp-carousel-item :class="classes(n(), [!current, n('--inactive')])" mp-tab-item-cover>
    <slot />
  </mp-carousel-item>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import MpCarouselItem from '../carousel-item'
import { createNamespace } from '../utils/components'
import { props } from './props'
import { useLists, useTabsItems, type TabItemProvider } from './provide'

const { name, n, classes } = createNamespace('tab-item')

export default defineComponent({
  name,
  components: { MpCarouselItem },
  props,
  setup(props) {
    const current = ref(false)
    const name = computed(() => props.name)
    const { index, bindTabsItems } = useTabsItems()
    const { bindLists } = useLists()

    const tabItemProvider: TabItemProvider = {
      index,
      name,
      current: computed(() => current.value),
      setCurrent,
    }

    bindTabsItems(tabItemProvider)
    bindLists(tabItemProvider)

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

<style lang="less">
@import '../styles/common';
@import '../carousel-item/carouselItem';
@import './tabItem';
</style>
