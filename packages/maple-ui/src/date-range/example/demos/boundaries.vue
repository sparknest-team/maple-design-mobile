<script setup lang="ts">
import { ref } from 'vue'

const value = ref(['2026/09/10', '2026/09/15'])
const disabledDate = (date: Date, side: 'start' | 'end') => side === 'end' && date.getDay() === 0
</script>
<template>
  <div class="date-contract-demo">
    <mp-date-range
      v-model="value"
      value-format="YYYY/MM/DD"
      format="DD-MM-YYYY"
      min="2026/09/01"
      max="2026/09/30"
      :disabled-date="disabledDate"
    />
    <p>仅可选九月，结束日期不能是周日。确认提交，取消丢弃草稿。</p>
    <output>{{ value }}</output>
  </div>
</template>
<style scoped>
.date-contract-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.date-contract-demo p {
  margin: 0;
}
</style>
