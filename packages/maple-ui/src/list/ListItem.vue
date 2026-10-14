<script setup lang="ts">
import { createNamespace } from '../utils/components'

defineOptions({ name: createNamespace('list-item').name })
const { n } = createNamespace('list-item')
</script>
<template>
  <div :class="n()" role="listitem">
    <div v-if="$slots.prefix" :class="n('prefix')"><slot name="prefix" /></div>
    <div :class="n('main')"><slot /></div>
    <div v-if="$slots.suffix" :class="n('suffix')"><slot name="suffix" /></div>
  </div>
</template>
