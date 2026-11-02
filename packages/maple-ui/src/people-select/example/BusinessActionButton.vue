<script setup lang="ts">
defineOptions({ inheritAttrs: false })
</script>
<template>
  <mp-button v-bind="$attrs"><slot /></mp-button>
</template>
