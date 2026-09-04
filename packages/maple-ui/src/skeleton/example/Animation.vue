<script setup>
import { ref } from 'vue'

const animation = ref(true)
</script>
<template>
  <mp-switch v-model="animation" />
  <mp-skeleton title avatar :animation="animation">加载的数据</mp-skeleton>
</template>
