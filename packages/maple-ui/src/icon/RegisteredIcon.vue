<template>
  <mp-icon v-bind="$attrs">
    <component :is="iconComponent" />
  </mp-icon>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, type Component } from 'vue'
import { pascalCase } from '@maplejs/maple-shared'
import MpIcon from './Icon.vue'

defineOptions({
  name: 'MpRegisteredIcon',
  inheritAttrs: false,
})

const props = defineProps<{
  name?: string
  fallback?: Component
}>()

const instance = getCurrentInstance()
const iconComponent = computed(() => {
  if (!props.name) {
    return undefined
  }
  return instance?.appContext.components[`Icon${pascalCase(props.name)}`] ?? props.fallback
})
</script>
