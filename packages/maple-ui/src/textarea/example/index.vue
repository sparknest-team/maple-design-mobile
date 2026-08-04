<script setup>
import { ref } from 'vue'
import { AppType, onThemeChange } from '@maplejs/maple-cli/client'

const value = ref('')
const outlinedValue = ref('')
const limitedValue = ref('')

onThemeChange()
</script>

<template>
  <app-type>基础用法</app-type>
  <mp-space direction="column" :size="['6vmin', 0]">
    <mp-textarea v-model="value" placeholder="请输入多行文本" />
    <mp-textarea v-model="outlinedValue" variant="outlined" placeholder="外边框文本域" />
    <mp-textarea v-model="limitedValue" placeholder="最多输入 100 个字符" :maxlength="100" clearable />
    <mp-textarea model-value="禁用状态" disabled />
  </mp-space>
</template>
