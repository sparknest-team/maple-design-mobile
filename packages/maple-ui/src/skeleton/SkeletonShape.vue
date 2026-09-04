<template>
  <div :class="classes(n(), n(`--${shape}`), n(`--${size}`))" />
</template>

<script lang="ts" setup>
import { createNamespace } from '../utils/components'
import { skeletonShapeProps } from './props'

defineOptions({ name: createNamespace('skeleton-shape').name })
const { n, classes } = createNamespace('skeleton-shape')
defineProps(skeletonShapeProps)
</script>
