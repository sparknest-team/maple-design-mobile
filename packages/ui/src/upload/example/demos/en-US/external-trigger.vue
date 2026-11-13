<script setup lang="ts">
import { ref } from 'vue'
import type { UploadFileItem, UploadInstance } from '@maple-design/ui-vue'

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
const uploader = ref<UploadInstance>()
const position = ref('before')
</script>

<template>
  <mp-space direction="column">
    <mp-form
      ><mp-form-item label="Button position">
        <mp-radio-group v-model="position" aria-label="Button position">
          <mp-radio value="before">Before the list</mp-radio>
          <mp-radio value="after">After the list</mp-radio>
        </mp-radio-group>
      </mp-form-item></mp-form
    >
    <mp-button v-if="position === 'before'" @click="uploader?.chooseFile()">Choose files</mp-button>
    <mp-upload ref="uploader" key="files" v-model="files" list-type="picture" multiple :show-upload-button="false" />
    <mp-button v-if="position === 'after'" @click="uploader?.chooseFile()">Choose files</mp-button>
  </mp-space>
</template>
