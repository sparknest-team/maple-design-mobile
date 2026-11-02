<script setup lang="ts">
import { ref } from 'vue'

const busy = ref(true)
const mode = ref<'default' | 'line'>('line')
const text = ref('加载时仍可编辑')
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-space><mp-switch v-model="busy" />加载状态</mp-space>
    <mp-radio-group v-model="mode" :options="['default', 'line']" variant="button" aria-label="字段加载布局" />
    <mp-form layout="vertical">
      <mp-form-item label="文本"><mp-input v-model="text" :loading="busy" :loading-mode="mode" /></mp-form-item>
      <mp-form-item label="多行文本"><mp-textarea v-model="text" :loading="busy" :loading-mode="mode" /></mp-form-item>
      <mp-form-item label="选择"
        ><mp-select edit-mode="direct" :options="[{ label: '选项', value: 'a' }]" :loading="busy" :loading-mode="mode"
      /></mp-form-item>
      <mp-form-item label="日期"><mp-date edit-mode="direct" :loading="busy" :loading-mode="mode" /></mp-form-item>
    </mp-form>
    <p>加载展示由同一个 FieldDecorator 实现，不隐式禁用输入；需要禁止操作时单独设置 disabled 或 readonly。</p>
  </mp-space>
</template>
