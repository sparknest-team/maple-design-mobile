<script setup lang="ts">
import { ref } from 'vue'
import type { UploadFileItem } from '@maple-design/ui-vue'

const files = ref<UploadFileItem[]>([
  {
    uid: 'sample-image',
    name: 'landscape.svg',
    type: 'image/svg+xml',
    url:
      'data:image/svg+xml,' +
      encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" width="240" height="160" viewBox="0 0 240 160"><rect width="240" height="160" fill="#e0e7ff"/><circle cx="180" cy="42" r="20" fill="#fbbf24"/><path d="M0 160L80 50L150 140L190 90L240 160Z" fill="#6750a4"/></svg>',
      ),
    status: 'success',
    percent: 100,
  },
])
const state = ref('editable')
</script>

<template>
  <mp-space direction="column">
    <mp-form
      ><mp-form-item label="交互状态">
        <mp-radio-group v-model="state" aria-label="交互状态">
          <mp-radio value="editable">可编辑</mp-radio>
          <mp-radio value="readonly">只读</mp-radio>
          <mp-radio value="disabled">禁用</mp-radio>
          <mp-radio value="reading">纯阅读</mp-radio>
        </mp-radio-group>
      </mp-form-item></mp-form
    >
    <mp-upload
      v-model="files"
      list-type="picture"
      accept="image/*"
      multiple
      :readonly="state === 'readonly'"
      :disabled="state === 'disabled'"
      :read-pretty="state === 'reading'"
    />
    <p role="status">已选文件: {{ files.length }}</p>
  </mp-space>
</template>
