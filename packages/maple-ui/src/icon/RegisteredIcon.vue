<template>
  <mp-icon v-bind="$attrs">
    <component :is="iconComponent" />
  </mp-icon>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, type Component } from 'vue'
import { createNamespace, pascalCase } from '../utils/namespace'
import MpIcon from './Icon.vue'
import { registeredPrefix } from './platform'

defineOptions({
  name: createNamespace('registered-icon').name,
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
  const componentName = `Icon${pascalCase(props.name)}`
  const components = instance?.appContext.components
  return components?.[componentName] ?? components?.[`${registeredPrefix}${componentName}`] ?? props.fallback
})
</script>
