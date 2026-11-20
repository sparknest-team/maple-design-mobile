<template>
  <slot v-bind="slotProps" />
</template>

<script setup lang="ts">
withDefaults(defineProps<{ slotProps?: Record<string, unknown> }>(), {
  slotProps: () => ({}),
})
</script>
