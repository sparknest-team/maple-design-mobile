<script setup lang="ts">
import { ref } from 'vue'
import type { UploadFileItem, UploadPreviewEvent } from '@maple-design/ui-vue'

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
const open = ref(false)
const selected = ref<UploadFileItem>()
function preview(file: UploadFileItem, event: UploadPreviewEvent) {
  event.preventDefault()
  selected.value = file
  open.value = true
}
</script>

<template>
  <mp-upload v-model="files" list-type="picture-card" accept="image/*" multiple @preview="preview">
    <template #trigger><span>Choose images</span></template>
    <template #remove-button="{ remove }"><mp-button variant="text" @click="remove">Remove</mp-button></template>
  </mp-upload>
  <mp-dialog v-model:open="open" :title="selected?.name" :cancel-button="false" confirm-button-text="Close">
    <img v-if="selected" class="custom-preview-image" :src="selected.url" :alt="selected.name" />
  </mp-dialog>
</template>
<style scoped>
.custom-preview-image {
  display: block;
  max-width: 100%;
  max-height: 60vh;
  margin: auto;
}
</style>
