<script lang="ts">
import { defineComponent } from 'vue'
import { createNamespace } from '../utils/components'

const { name, n, classes } = createNamespace('list-item')

export default defineComponent({
  name,
  setup: () => ({ n, classes }),
})
</script>

<template>
  <div :class="classes(n(), n('$--box'))" role="listitem">
    <div v-if="$slots.prefix" :class="n('prefix')">
      <slot name="prefix" />
    </div>
    <div :class="n('content')">
      <slot />
    </div>
    <div v-if="$slots.suffix" :class="n('suffix')">
      <slot name="suffix" />
    </div>
  </div>
</template>
