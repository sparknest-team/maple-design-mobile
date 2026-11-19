<script setup lang="ts">
import { ref } from 'vue'

const theme = ref<'light' | 'dark'>('dark')
</script>
<template>
  <div>
    <mp-button @click="theme = theme === 'dark' ? 'light' : 'dark'">切换局部主题 / Toggle local theme</mp-button>
    <mp-theme-provider :theme="theme" class="theme-region">
      <p>外层主题 / Outer: {{ theme }}</p>
      <mp-button status="primary">主题按钮 / Themed button</mp-button>
      <mp-form-item layout="vertical" hide-label>
        <mp-select :options="[{ label: 'Body popup inherits theme', value: 1 }]" placeholder="打开弹层 / Open popup" />
      </mp-form-item>
      <mp-theme-provider theme="light" class="theme-region">
        <p>嵌套亮色 / Nested light</p>
        <mp-button variant="outline">亮色按钮 / Light button</mp-button>
      </mp-theme-provider>
    </mp-theme-provider>
    <p>外部保持原主题 / Outside is unchanged</p>
  </div>
</template>
<style scoped>
.theme-region {
  margin-top: 16px;
  padding: 16px;
  color: var(--mp-color-text-1);
  background: var(--mp-color-bg-2);
  border: 1px solid var(--mp-color-border-2);
}
</style>
