<script setup>
import { ref } from 'vue'

const readonly = ref(false)
const disabled = ref(false)
const chooseCount = ref(0)
const previewCount = ref(0)
const initialFile = {
  uid: 'state-image',
  name: 'state-example.svg',
  type: 'image/svg+xml',
  url: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22%3E%3Crect width=%22120%22 height=%22120%22 fill=%22%236750a4%22/%3E%3C/svg%3E',
  status: 'success',
  percent: 100,
}
const files = ref([{ ...initialFile }])
function choose() {
  chooseCount.value++
}
function restore() {
  files.value = [{ ...initialFile }]
}
</script>

<template>
  <section class="upload-state-demo">
    <div class="controls">
      <mp-checkbox v-model="readonly" edit-mode="direct">Readonly upload</mp-checkbox>
      <mp-checkbox v-model="disabled" edit-mode="direct">Disabled upload</mp-checkbox>
      <mp-button html-type="button" @click="restore">Restore sample</mp-button>
    </div>
    <p>Local selection callback only; no file chooser or network request.</p>
    <mp-upload
      v-model="files"
      edit-mode="direct"
      data-testid="state-upload"
      :readonly="readonly"
      :disabled="disabled"
      :request-choose="choose"
      @preview="previewCount++"
    />
    <p role="status">Files: {{ files.length }}; choose: {{ chooseCount }}; preview: {{ previewCount }}</p>
  </section>
</template>

<style scoped>
.controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}
.controls label {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
</style>
