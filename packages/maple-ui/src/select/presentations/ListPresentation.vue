<template>
  <PopupPresentation :controller="controller">
    <template #reference><slot name="reference" /></template>
    <slot />
  </PopupPresentation>
</template>
<script setup lang="ts">
import type { UnwrapNestedRefs } from 'vue'
import PopupPresentation from '../../_components/selection-field/PopupPresentation.vue'
import type { SelectController } from '../use-select-controller'

defineProps<{ controller: UnwrapNestedRefs<SelectController> }>()
</script>
