<template>
  <div :class="n()" role="navigation" aria-label="Breadcrumb">
    <slot />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { createNamespace } from '../utils/components'
import { props } from './props'
import { useBreadcrumbItems, type BreadcrumbProvider } from './provide'

const { name, n } = createNamespace('breadcrumb')

export default defineComponent({
  name,
  props,
  setup(props) {
    const separator = computed<string>(() => props.separator)
    const { bindBreadcrumbItems, length } = useBreadcrumbItems()
    const breadcrumbProvider: BreadcrumbProvider = {
      length,
      separator,
    }

    bindBreadcrumbItems(breadcrumbProvider)

    return { n }
  },
})
</script>

<style lang="less">
@import '../styles/common';
@import './breadcrumb';
</style>
