<script setup>
import { ref } from 'vue'

const disabledValue = ref('Disabled')
</script>

<template>
  <mp-search v-model="disabledValue" placeholder="搜索" disabled />
</template>
