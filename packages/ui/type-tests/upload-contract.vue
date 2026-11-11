<script setup lang="ts">
import { Upload } from '../src'
import type { UploadFileItem } from '../src'

const files: UploadFileItem[] = [{ uid: 'file', name: 'report.txt', status: 'success', percent: 100 }]
</script>
<template>
  <Upload :default-value="files">
    <template #read="{ value, text }">{{ value?.length }} {{ text }}</template>
    <template #trigger="{ chooseFile }"><button type="button" @click="chooseFile()">Choose</button></template>
    <template #item="{ replace }"><button type="button" @click="replace()">Replace</button></template>
    <template #remove-button="{ remove, retry, replace }"
      ><button type="button" @click="remove()">Remove</button><button type="button" @click="retry()">Retry</button
      ><button type="button" @click="replace()">Replace</button></template
    >
  </Upload>
</template>
