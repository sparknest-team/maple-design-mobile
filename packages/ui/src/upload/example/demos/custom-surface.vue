<script setup>
import { ref } from 'vue'

const files = ref([])
const message = ref('')
const preview = (file, event) => {
  event.preventDefault()
  message.value = file.name
}
</script>
<template>
  <div>
    <mp-upload v-model="files" list-type="picture-card" multiple @preview="preview"
      ><template #trigger><span>选择图片</span></template
      ><template #remove-button="{ remove }"
        ><mp-button variant="text" @click="remove">删除</mp-button></template
      ></mp-upload
    >
    <p>自定义预览：{{ message }}</p>
  </div>
</template>
