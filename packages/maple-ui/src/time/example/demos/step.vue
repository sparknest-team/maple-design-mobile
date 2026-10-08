<script setup>
import { computed, ref } from 'vue'

const value = ref('09:30:00')
const coarse = ref(false)
const step = computed(() => ({ hour: 1, minute: coarse.value ? 30 : 15, second: 10 }))
</script>

<template>
  <mp-space direction="column" :size="12" style="width: 100%">
    <label><input v-model="coarse" type="checkbox" /> 切换为 30 分钟步长</label>
    <p>确认时按当前步长重新校验；切换规则不会自动修改已提交值。</p>
    <mp-time v-model="value" format="HH:mm:ss" :step="step" style="width: 100%; max-width: 360px" />
    <span>{{ value }}</span>
  </mp-space>
</template>
