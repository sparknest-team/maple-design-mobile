<script setup>
import { ref } from 'vue'

const files = ref([])
const reasons = ref([])
const replace = (file) => new File([file], file.name, { type: file.type })
</script>
<template>
  <div>
    <p>Images: 1 MB each, 2 MB total, up to 3 files. Replacements are validated again.</p>
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
