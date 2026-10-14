<script setup>
import { ref } from 'vue'

const files = ref([])
const reasons = ref([])
const replace = (file) => new File([file], file.name, { type: file.type })
</script>
<template>
  <div>
    <p>接受图片；单文件 1 MB、合计 2 MB、最多 3 个。before-read 替换后重新校验。</p>
    <mp-upload
      v-model="files"
      accept="image/*"
      multiple
      :max-files="3"
      :max-file-size="1048576"
      :max-total-size="2097152"
      :before-read="replace"
      @rejected="(items) => (reasons = items.map((item) => item.reason))"
    />
    <p>{{ reasons.join(', ') }}</p>
  </div>
</template>
