<script setup lang="ts">
import { ref } from 'vue'

const busy = ref(true)
const value = ref('加载时仍可编辑')
</script>
<template>
  <mp-space direction="column" :size="16" style="width: 100%">
    <mp-form layout="vertical">
      <mp-form-item label="加载状态 / Loading"><mp-switch v-model="busy" /></mp-form-item>
      <mp-form-item label="默认指示器 / Default"
        ><mp-input
          v-model="value"
          :loading="busy"
          placeholder="加载时仍可编辑 / Editable while loading"
          loading-mode="default"
      /></mp-form-item>
      <mp-form-item label="底部加载线 / Line"
        ><mp-input
          v-model="value"
          :loading="busy"
          placeholder="加载时仍可编辑 / Editable while loading"
          loading-mode="line"
      /></mp-form-item>
    </mp-form>
    <p>切换加载状态；加载时仍可输入和清空。Loading keeps the input editable.</p>
  </mp-space>
</template>
