<script setup lang="ts">
import { ref } from 'vue'

const value = ref('可编辑的审查内容')
</script>
<template>
  <mp-input v-model="value" aria-label="字段内容" placeholder="编辑装饰器内容 / Edit field content" />
  <mp-field-decorator :value="value" placeholder="字段标签" clearable @clear="value = ''">
    <span>{{ value }}</span>
    <template #prefix>前缀</template>
    <template #suffix>后缀</template>
  </mp-field-decorator>
</template>
