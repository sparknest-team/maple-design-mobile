<template>
  <mp-space direction="column" size="lg" style="width: 100%">
    <mp-mention v-model="value" :options="['Bytedance', 'Bytedesign', 'Bytenumner']" placeholder="enter something" />
    <mp-mention
      v-model="text"
      :options="['Bytedance', 'Bytedesign', 'Bytenumner']"
      type="textarea"
      placeholder="enter something"
    />
  </mp-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('')
const text = ref('')
</script>
