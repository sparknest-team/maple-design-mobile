<script setup>
import { ref } from 'vue'

const dateTimeRange = ref([])
</script>

<template>
  <mp-space direction="column" size="lg">
    <p>闪电按钮打开快捷范围，选择后点击确认提交；“此刻”只更新顶部选中的起点或终点。</p>
    <mp-date-range v-model="dateTimeRange" show-time :use-seconds="false" placeholder="请选择日期时间范围" clearable />
  </mp-space>
</template>
