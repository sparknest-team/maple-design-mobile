<script setup lang="ts">
import { ref } from 'vue'

const monthModel = ref('2025 January 15')
const numericModel = ref('2025-01-15')
</script>

<template>
  <p>切换顶部语言，显示与手输文本跟随界面语言，模型协议保持不变。</p>
  <mp-date v-model="monthModel" value-format="YYYY MMMM DD" format="YYYY MMMM DD" panel-type="calendar" />
  <p>月份名称模型（稳定英文协议）：{{ monthModel }}</p>
  <mp-date v-model="numericModel" format="YYYY MMMM DD" panel-type="calendar" />
  <p>数字模型：{{ numericModel }}</p>
</template>
