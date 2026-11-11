<script setup lang="ts">
import { reactive } from 'vue'

const model = reactive({ text: 'Hello' as string | null })
</script>
<template>
  <mp-space direction="column">
    <p>点击清空图标得到 null；用 Backspace 删光得到空字符串。</p>
    <mp-form :model="model" layout="vertical">
      <mp-form-item field="text" label="关键词">
        <mp-input v-model="model.text" edit-mode="direct" clearable :empty-value="null" />
      </mp-form-item>
    </mp-form>
    <mp-button @click="model.text = 'Hello'">恢复初值</mp-button>
    <p>
      当前模型: <output>{{ JSON.stringify(model.text) }}</output>
    </p>
  </mp-space>
</template>
