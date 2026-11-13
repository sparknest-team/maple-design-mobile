<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
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
const open = ref(false)
const name = ref('')
let resolveRemoval: ((allow: boolean) => void) | undefined
function beforeRemove(file: UploadFileItem) {
  name.value = file.name || ''
  open.value = true
  return new Promise<boolean>((resolve) => {
    resolveRemoval = resolve
  })
}
function finish(allow: boolean) {
  const resolve = resolveRemoval
  resolveRemoval = undefined
  open.value = false
  resolve?.(allow)
}
onBeforeUnmount(() => finish(false))
</script>

<template>
  <mp-upload v-model="files" list-type="picture" accept="image/*" multiple :before-remove="beforeRemove" />
  <mp-dialog
    v-model:open="open"
    title="确认删除"
    @confirm="finish(true)"
    @cancel="finish(false)"
    @closed="finish(false)"
  >
    <p>确认移除文件 {{ name }}?</p>
  </mp-dialog>
</template>
