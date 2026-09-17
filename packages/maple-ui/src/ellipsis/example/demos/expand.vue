<script setup>
import { ref } from 'vue'

const expand = ref(false)
</script>

<template>
  <mp-ellipsis style="max-width: 50vmin" :line-clamp="3" expand-trigger="click" :tooltip="false"
    >其实没有什么事情是不可能的，我都拿到世界冠军了，真的没有什么事情是不可能的。</mp-ellipsis
  >
</template>
