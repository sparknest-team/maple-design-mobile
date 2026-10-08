<script setup>
import { ref } from 'vue'

const value = ref(['09:00', '18:00'])
const hint = ref(true)
const error = ref(false)
const line = ref(true)
</script>

<template>
  <mp-space direction="column" :size="12" style="width: 100%">
    <label><input v-model="hint" type="checkbox" /> 浮动提示</label>
    <label><input v-model="error" type="checkbox" /> 显式错误状态</label>
    <label><input v-model="line" type="checkbox" /> 边框 / 底线</label>
    <mp-time-range
      v-model="value"
      format="HH:mm"
      variant="outline"
      :placeholder="['开始时间', '结束时间']"
      :hint="hint"
      :error="error"
      :line="line"
      focus-color="#6750a4"
      separator=" → "
    />
    <span>{{ value }}</span>
  </mp-space>
</template>
