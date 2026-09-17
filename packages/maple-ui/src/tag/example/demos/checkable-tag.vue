<script setup>
import { ref } from 'vue'

const checked = ref(true)
</script>

<template>
  <mp-space :size="['2.666vmin', '2.666vmin']">
    <mp-tag v-model:checked="checked" checkable status="primary">可选中标签</mp-tag>
    <mp-tag checkable :default-checked="false" status="success">可选中标签</mp-tag>
  </mp-space>
</template>
