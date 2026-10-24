<template>
  <span v-if="icon" :class="classes(n(), n(`--${status}`))" aria-hidden="true"><component :is="icon" /></span>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import {
  IconCheckCircleFill,
  IconCloseCircleFill,
  IconExclamationCircleFill,
  IconLoading,
} from '@maple-design/icons-vue'
import { createNamespace } from '../utils/components'

defineOptions({ name: createNamespace('input-feedback').name })
const props = defineProps<{ status?: string }>()
const { n, classes } = createNamespace('input-feedback')
const icons = {
  validating: IconLoading,
  success: IconCheckCircleFill,
  warning: IconExclamationCircleFill,
  error: IconCloseCircleFill,
}
const icon = computed(() => icons[props.status as keyof typeof icons])
</script>
