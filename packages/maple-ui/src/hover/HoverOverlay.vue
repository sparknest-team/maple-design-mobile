<template>
  <div :class="classes(n(), [hovering, n('--hovering')], [focusing, n('--focusing')])"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { createNamespace } from '../utils/components'
import { props } from './overlay-props'

const { name, n, classes } = createNamespace('hover-overlay')

export default defineComponent({
  name,
  props,
  setup: () => ({
    n,
    classes,
  }),
})
</script>
