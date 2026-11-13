<script setup lang="ts">
import { ref } from 'vue'
import type { UploadFileItem, UploadListType, UploadTriggerPosition } from '@maple-design/ui-vue'

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
const listType = ref<UploadListType>('picture')
const triggerPosition = ref<UploadTriggerPosition>('after')
</script>

<template>
  <mp-space class="upload-trigger-position-demo" direction="column">
    <mp-form>
      <mp-form-item label="入口位置">
        <mp-radio-group v-model="triggerPosition" aria-label="入口位置">
          <mp-radio value="before">文件列表之前</mp-radio>
          <mp-radio value="after">文件列表之后</mp-radio>
        </mp-radio-group>
      </mp-form-item>
      <mp-form-item label="列表类型">
        <mp-radio-group v-model="listType" aria-label="列表类型">
          <mp-radio value="text">text</mp-radio>
          <mp-radio value="picture">picture</mp-radio>
          <mp-radio value="picture-card">picture-card</mp-radio>
        </mp-radio-group>
      </mp-form-item>
    </mp-form>
    <mp-upload v-model="files" :trigger-position="triggerPosition" :list-type="listType" accept="image/*" multiple />
    <p role="status">已选文件: {{ files.length }}</p>
  </mp-space>
</template>
