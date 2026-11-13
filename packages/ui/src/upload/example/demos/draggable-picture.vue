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
</script>

<template>
  <mp-upload v-model="files" list-type="picture" accept="image/*" multiple draggable>
    <template #trigger="{ dragOver }">
      <div class="upload-dropzone">
        <m-icon-upload class="upload-dropzone__icon" aria-hidden="true" />
        <strong>{{ dragOver ? '松开以添加图片' : '点击或者拖动图片到该区域来添加' }}</strong>
        <p>仅在本地读取，点击缩略图可预览。请勿添加敏感文件。</p>
      </div>
    </template>
  </mp-upload>
</template>
<style scoped>
.upload-dropzone {
  display: grid;
  justify-items: center;
  gap: 12px;
  padding: 32px 0;
  text-align: center;
  overflow-wrap: anywhere;
}
.upload-dropzone__icon {
  font-size: 40px;
  color: var(--mp-sys-color-content-secondary);
}
.upload-dropzone strong {
  color: var(--mp-sys-color-content-secondary);
}
.upload-dropzone p {
  margin: 0;
  color: var(--mp-sys-color-content-secondary);
}
</style>
