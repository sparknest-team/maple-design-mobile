<script setup lang="ts">
import { ref } from 'vue'
import type { UploadFileItem, UploadRejectedFile } from '@maple-design/ui-vue'

const files = ref<UploadFileItem[]>([])
const feedback = ref('')
const reasons: Record<string, string> = {
  accept: '仅支持图片',
  'max-files': '最多选择 3 张图片',
  'max-file-size': '每张图片不能超过 2 MiB',
}
function handleRejected(items: UploadRejectedFile[]) {
  feedback.value = items.map((item) => `${item.file.name}: ${reasons[item.reason] || item.reason}`).join('; ')
}
</script>

<template>
  <mp-space direction="column">
    <p>最多选择 3 张图片，每张不超过 2 MiB；达到数量上限后，可删除一张再添加。</p>
    <mp-upload
      v-model="files"
      list-type="picture"
      accept="image/*"
      multiple
      :max-files="3"
      :max-file-size="2 * 1024 * 1024"
      @rejected="handleRejected"
    />
    <p role="status">{{ feedback }}</p>
  </mp-space>
</template>
