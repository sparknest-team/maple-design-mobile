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
      ><template #trigger><span>Choose images</span></template
      ><template #remove-button="{ remove }"
        ><mp-button variant="text" @click="remove">Remove</mp-button></template
      ></mp-upload
    >
    <p>Custom preview: {{ message }}</p>
  </div>
</template>
