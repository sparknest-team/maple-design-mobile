<script setup>
import { ref } from 'vue'

const checked = ref(true)
</script>

<template>
  <mp-space wrap :size="['2.666vmin', '2.666vmin']">
    <mp-tag v-model:checked="checked" checkable status="primary">可选中标签</mp-tag>
    <mp-tag checkable :default-checked="false" status="success">可选中标签</mp-tag>
    <mp-tag checkable status="warning" variant="outline">描边状态</mp-tag>
    <mp-tag checkable status="success" loading>加载中</mp-tag>
  </mp-space>
</template>
