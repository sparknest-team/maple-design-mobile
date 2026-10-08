<template>
  <span
    :class="[n(), { [n('--checked')]: checked, [n('--mixed')]: indeterminate, [n('--radio')]: radio }]"
    aria-hidden="true"
  >
    <span v-if="radio && checked" :class="n('dot')" />
    <IconMinus v-else-if="indeterminate" />
    <IconCheck v-else-if="checked" />
  </span>
</template>
<script setup lang="ts">
import { IconCheck, IconMinus } from '@maplejs/icons-vue'
import { createNamespace } from '../../utils/components'

defineOptions({ name: createNamespace('selection-indicator').name })
defineProps<{ checked?: boolean; indeterminate?: boolean; radio?: boolean }>()
const { n } = createNamespace('selection-indicator')
</script>
