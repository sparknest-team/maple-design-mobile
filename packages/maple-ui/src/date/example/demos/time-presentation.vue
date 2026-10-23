<script setup>
import { ref } from 'vue'

const value = ref('2026-10-22 13:30')
</script>
<template>
  <mp-date-picker v-model="value" show-time :use-seconds="false" />
  <mp-date-picker presentation="picker" :picker-props="{ optionHeight: 36, optionCount: 4 }" />
</template>
