<template>
  <mp-space direction="column" size="md">
    <mp-auto-complete
      v-model="looseValue"
      :options="options"
      placeholder="默认：输入 ar"
      style="width: 100%; max-width: 320px"
    />
    <mp-auto-complete
      v-model="caseSensitiveValue"
      :options="options"
      case-sensitive
      placeholder="区分大小写：输入 Ar"
      style="width: 100%; max-width: 320px"
    />
  </mp-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const options = ['Arco', 'Maple', 'Cedar']
const looseValue = ref('')
const caseSensitiveValue = ref('')
</script>
