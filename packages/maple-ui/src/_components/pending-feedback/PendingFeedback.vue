<script setup lang="ts">
import Loading from '../../loading/Loading.vue'
import { createNamespace } from '../../utils/components'

defineProps<{ loading?: boolean }>()
defineOptions({ name: createNamespace('pending-feedback').name })
const { n } = createNamespace('pending-feedback')
</script>
<template>
  <span v-if="loading" :class="n()" aria-busy="true"><Loading size="sm" /></span>
</template>
