<template>
  <ul :class="n()">
    <li v-for="(style, index) in lines" :key="index" :class="n('row')" :style="style" />
  </ul>
</template>

<script lang="ts" setup>
import type { CSSProperties } from 'vue'
import { computed } from 'vue'
import { createNamespace } from '../utils/components'
import { toSizeUnit } from '../utils/elements'
import { skeletonLineProps } from './props'

defineOptions({ name: createNamespace('skeleton-line').name })
const { n } = createNamespace('skeleton-line')
const props = defineProps(skeletonLineProps)
const lines = computed<CSSProperties[]>(() =>
  Array.from({ length: Math.max(0, props.rows) }, (_, index) => ({
    width: toSizeUnit(props.widths[index]),
    height: toSizeUnit(props.lineHeight),
    marginTop: index > 0 ? toSizeUnit(props.lineSpacing) : undefined,
  })),
)
</script>
