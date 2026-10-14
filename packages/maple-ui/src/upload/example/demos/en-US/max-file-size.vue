<script setup>
import { ref } from 'vue'

const files = ref([])
const reasons = ref([])
const onRejected = (items) => {
  reasons.value = items.map((item) => item.reason)
}
</script>

<template>
  <div>
    <mp-upload v-model="files" :max-file-size="1024" @rejected="onRejected"></mp-upload>
    <p>{{ reasons.join(', ') }}</p>
  </div>
</template>
