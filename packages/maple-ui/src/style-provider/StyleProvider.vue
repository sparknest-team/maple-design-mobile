<script setup lang="ts">
import { createNamespace } from '../utils/components'
import { formatStyleVars } from '../utils/elements'
import { styleProviderProps } from './props'

defineOptions({ name: createNamespace('style-provider').name })
const { n } = createNamespace('style-provider')
const props = defineProps(styleProviderProps)
</script>

<template>
  <component :is="props.tag" :class="n()" :style="formatStyleVars(props.styleVars)">
    <slot />
  </component>
</template>
