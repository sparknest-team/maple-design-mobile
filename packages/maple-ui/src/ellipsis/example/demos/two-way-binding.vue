<script setup>
import { ref } from 'vue'

const expand = ref(false)
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-button status="primary" @click="expand = !expand">切换</mp-button>
    <mp-ellipsis v-model:expand="expand" style="max-width: 50vmin"
      >其实没有什么事情是不可能的，我都拿到世界冠军了，真的没有什么事情是不可能的。</mp-ellipsis
    >
  </mp-space>
</template>
