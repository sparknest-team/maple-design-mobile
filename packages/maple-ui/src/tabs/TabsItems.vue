<template>
  <mp-carousel
    ref="carouselRef"
    :class="n()"
    :loop="loop"
    :duration="animated ? undefined : 0"
    :touchable="canSwipe"
    :indicator="false"
    @change="handleCarouselChange"
  >
    <slot />
  </mp-carousel>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { call, doubleRaf } from '@maplejs/maple-shared'
import MpCarousel from '../carousel'
import { createNamespace } from '../utils/components'
import { type TabItemProvider } from './tab-item-provide'
import { props } from './tabs-items-props'
import { useTabItem } from './tabs-items-provide'

const { name, n } = createNamespace('tabs-items')

export default defineComponent({
  name,
  components: { MpCarousel },
  props,
  emits: ['update:active'],
  setup(props, { emit }) {
    const carouselRef = ref<null | typeof MpCarousel>(null)
    const { tabItemList, bindTabItem, length } = useTabItem()

    bindTabItem({})

    watch(() => props.active, handleActiveChange)

    watch(
      () => length.value,
      async () => {
        await doubleRaf()
        handleActiveChange(props.active)
      },
    )

    function matchName(active: number | string | undefined): TabItemProvider | undefined {
      return tabItemList.find(({ name }: TabItemProvider) => active === name.value)
    }

    function matchIndex(active: number | string | undefined): TabItemProvider | undefined {
      return tabItemList.find(({ index }: TabItemProvider) => active === index.value)
    }

    function matchActive(active: number | string | undefined): TabItemProvider | undefined {
      return matchName(active) || matchIndex(active)
    }

    function handleActiveChange(newValue: number | string | undefined) {
      const newActiveTabItemProvider: TabItemProvider | undefined = matchActive(newValue)
      if (!newActiveTabItemProvider) {
        return
      }

      tabItemList.forEach(({ setCurrent }) => setCurrent(false))
      newActiveTabItemProvider.setCurrent(true)
      carouselRef.value?.to(newActiveTabItemProvider.index.value)
    }

    function handleCarouselChange(currentIndex: number) {
      const tabItem = tabItemList.find(({ index }) => index.value === currentIndex) as TabItemProvider
      const active = tabItem.name.value ?? tabItem.index.value

      emit('update:active', active)
    }

    // expose
    function getCarousel() {
      return carouselRef.value
    }

    return {
      carouselRef,
      n,
      handleCarouselChange,
      getCarousel,
    }
  },
})
</script>
