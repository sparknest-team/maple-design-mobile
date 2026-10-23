<script setup>
import { ref } from 'vue'

const value = ref('09:00')
const editable = ref(true)
</script>

<template>
  <mp-space direction="column" :size="12" style="width: 100%">
    <mp-checkbox v-model="editable">允许手输</mp-checkbox>
    <p>回车或失焦提交，Esc 撤销。合法范围为 08:00–18:00。点击时间滚轮按钮或按 ↓ 打开面板。</p>
    <mp-time v-model="value" :input-editable="editable" format="HH:mm" min="08:00" max="18:00" clearable />
    <span>{{ value }}</span>
  </mp-space>
</template>
