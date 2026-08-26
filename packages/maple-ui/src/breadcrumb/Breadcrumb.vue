<template>
  <div :class="n()" role="navigation" aria-label="Breadcrumb">
    <slot>
      <mp-breadcrumb-item
        v-for="(route, index) in routes"
        :key="route.path || `${route.label}-${index}`"
        :href="$slots['item-render'] ? undefined : getHref(index)"
        :droplist="route.children"
      >
        <slot name="item-render" :route="route" :routes="routes" :paths="getPaths(index)">
          {{ route.label }}
        </slot>
      </mp-breadcrumb-item>
    </slot>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import MpBreadcrumbItem from '../breadcrumb-item'
import { createNamespace } from '../utils/components'
import { props } from './props'
import { useBreadcrumbItems, type BreadcrumbProvider } from './provide'

const { name, n } = createNamespace('breadcrumb')

export default defineComponent({
  name,
  components: { MpBreadcrumbItem },
  props,
  setup(props, { slots }) {
    const separator = computed(() => props.separator)
    const maxCount = computed(() => props.maxCount)
    const { bindBreadcrumbItems, length } = useBreadcrumbItems()
    const total = computed(() => props.routes?.length ?? length.value)
    const needHide = computed(() => maxCount.value > 0 && total.value > maxCount.value + 1)
    const moreSlotData = computed(() => {
      const end = needHide.value ? total.value - maxCount.value : 0
      return {
        omittedItems: props.routes?.slice(1, end + 1) ?? [],
        count: needHide.value ? end : 0,
        start: needHide.value ? 1 : -1,
        end: needHide.value ? end : -1,
      }
    })

    const breadcrumbProvider: BreadcrumbProvider = {
      length: total,
      maxCount,
      separator,
      needHide,
      moreSlotData,
      slots,
    }

    bindBreadcrumbItems(breadcrumbProvider)

    function getPaths(index: number) {
      if (!props.routes?.length) {
        return [] as string[]
      }
      return props.routes.slice(0, index + 1).map((route) => (route.path || '').replace(/^\//, ''))
    }

    function getHref(index: number) {
      if (!props.routes?.length || index >= props.routes.length - 1) {
        return undefined
      }
      return props.routes[index].path
    }

    return {
      n,
      getHref,
      getPaths,
    }
  },
})
</script>

<style lang="less">
@import '../styles/common';
@import './breadcrumb';
</style>
