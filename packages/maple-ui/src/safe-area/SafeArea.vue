<template>
  <component
    :is="tag"
    :class="classes(n(), ...edges.map((edge) => n(`--${edge}`)), [consume, n('--consume')])"
    :style="insetStyles"
    ><slot
  /></component>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { createNamespace } from '../utils/components'
import { formatSafeAreaInsets } from './insets'
import { safeAreaProps } from './props'

defineOptions({ name: createNamespace('safe-area').name })
const props = defineProps(safeAreaProps)
const { n, classes } = createNamespace('safe-area')
const insetStyles = computed(() => formatSafeAreaInsets(props.insets))
</script>
