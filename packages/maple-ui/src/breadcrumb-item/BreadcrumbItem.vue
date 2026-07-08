<template>
  <div :class="n()">
    <div :class="classes(n('content'), [!isLast, n('--active')])" @click="handleClick">
      <slot />
    </div>
    <slot v-if="!isLast" name="separator">
      <div :class="n('separator')" aria-hidden="true">
        {{ separator ?? parentSeparator }}
      </div>
    </slot>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { call } from '@maplejs/maple-shared'
import { createNamespace } from '../utils/components'
import { props } from './props'
import { useBreadcrumbItem } from './provide'

const { name, n, classes } = createNamespace('breadcrumb-item')

export default defineComponent({
  name,
  props,
  setup(props) {
    const { index, breadcrumb, bindBreadcrumb } = useBreadcrumbItem()
    const isLast = computed(() => {
      if (!breadcrumb || !index) return false
      return index.value === breadcrumb.length.value - 1
    })
    const parentSeparator = computed(() => breadcrumb?.separator.value)

    bindBreadcrumb?.(null)

    function handleClick(e: Event) {
      if (isLast.value) {
        return
      }

      call(props.onClick, e)
    }

    return {
      n,
      classes,
      isLast,
      parentSeparator,
      handleClick,
    }
  },
})
</script>

<style lang="less">
@import '../styles/common';
@import './breadcrumb-item';
</style>
