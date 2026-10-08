<script setup>
import { ref } from 'vue'

const value = ref(['11:30:00 pm', '12:30:00 am'])
</script>

<template>
  <mp-space direction="column" :size="12" style="width: 100%">
    <p>分别切换起止端的 AM/PM；12 AM 是午夜，12 PM 是中午。</p>
    <mp-time-range v-model="value" use12-hours show-next-day style="width: 100%; max-width: 360px" />

    <span>当前值: {{ value }}</span>
  </mp-space>
</template>
