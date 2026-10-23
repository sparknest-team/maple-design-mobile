<script setup lang="ts">
import { ref } from 'vue'

const value = ref('交付审查')
</script>
<template>
  <mp-space direction="column">
    <mp-input v-model="value" placeholder="表单说明的上下文" />
    <mp-form-details error-message="审查错误信息" extra-message="审查附加说明" />
  </mp-space>
</template>
