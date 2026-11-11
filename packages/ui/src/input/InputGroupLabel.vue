<template>
  <span :class="n()"><slot /></span>
</template>

<script setup lang="ts">
import { createNamespace } from '../utils/components'

defineOptions({ name: createNamespace('input-group-label').name })
const { n } = createNamespace('input-group-label')
</script>
