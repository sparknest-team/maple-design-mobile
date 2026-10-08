<script setup lang="ts">
import { ref } from 'vue'

const value = ref<string | number | boolean | null>('email')
const options = [
  { label: '邮件', value: 'email' },
  { label: '只读', value: 'locked', readonly: true },
  { label: '禁用', value: 'disabled', disabled: true },
  { label: '短信', value: 'sms' },
]
</script>
<template>
  <section class="radio-demo">
    <p>Tab 进入分组；方向键循环，Home / End 跳到首尾。只读项可聚焦，不改变选值。</p>
    <mp-radio-group v-model="value" :options="options" aria-label="通知方式" />
    <p>当前值：{{ value }}</p>
    <mp-button @click="value = null">清空</mp-button>
  </section>
</template>
<style scoped>
.radio-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.radio-demo p {
  margin: 0;
}
</style>
