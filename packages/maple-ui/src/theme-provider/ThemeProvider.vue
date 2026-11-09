<script setup lang="ts">
import { createNamespace } from '../utils/components'
import { provideThemeScope } from './context'
import { themeProviderProps } from './props'

defineOptions({ name: createNamespace('theme-provider').name })
const { n } = createNamespace('theme-provider')
const props = defineProps(themeProviderProps)
const themeScope = provideThemeScope(props)
</script>

<template>
  <component :is="props.tag" :class="n()" v-bind="themeScope">
    <slot />
  </component>
</template>
