<script setup lang="ts">
import { ref } from 'vue'
import type { UploadFileItem } from '@maple-design/ui-vue'

const files = ref<UploadFileItem[]>([])
</script>

<template>
  <mp-upload v-model="files" multiple />
</template>
