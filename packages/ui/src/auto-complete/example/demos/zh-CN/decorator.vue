<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const options = ['Cedar', 'Maple']
</script>
<template>
  <mp-space direction="column" size="md">
    <mp-auto-complete
      v-for="variant in ['filled', 'outline', 'standard'] as const"
      :key="variant"
      v-model="value"
      :options="options"
      :variant="variant"
      :placeholder="variant"
      clearable
    />
    <mp-auto-complete
      v-model="value"
      :options="options"
      placeholder="自定义颜色"
      focus-color="#6750a4"
      text-color="#386a20"
      enterkeyhint="search"
    >
      <template #prefix>@</template><template #suffix>.com</template>
    </mp-auto-complete>
  </mp-space>
</template>
