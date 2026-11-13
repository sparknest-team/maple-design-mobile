<script setup>
import { ref } from 'vue'

const value = ref('09:00')
const hint = ref(false)
const error = ref(false)
const line = ref(true)
</script>

<template>
  <mp-space direction="column" :size="12" style="width: 100%">
    <mp-checkbox v-model="hint">浮动提示</mp-checkbox>
    <mp-checkbox v-model="error">显式错误状态</mp-checkbox>
    <mp-checkbox v-model="line">边框 / 底线</mp-checkbox>
    <mp-time
      v-model="value"
      format="HH:mm"
      variant="outline"
      placeholder="请选择时间"
      :hint="hint"
      :error="error"
      :line="line"
      focus-color="#6750a4"
    />
    <span>{{ value }}</span>
  </mp-space>
</template>
