<template>
  <div :class="n()" role="navigation" aria-label="Breadcrumb">
    <slot>
      <mp-breadcrumb-item
        v-for="(route, index) in routes"
        :key="route.path || `${route.label}-${index}`"
        :href="$slots['item-render'] ? undefined : getHref(index)"
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
    const needHide = computed(() => maxCount.value > 0 && length.value > maxCount.value + 1)

    const breadcrumbProvider: BreadcrumbProvider = {
      length,
      maxCount,
      separator,
      needHide,
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
      const paths = getPaths(index)
      return props.customUrl?.(paths) ?? `#/${paths.join('/').replace(/^\//, '')}`
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
