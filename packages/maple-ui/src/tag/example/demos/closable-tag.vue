<script setup>
import { ref } from 'vue'

const show = ref(true)
const dynamicTags = ref(['Tag 1', 'Tag 2', 'Tag 3'])
function removeTag(tag) {
  dynamicTags.value = dynamicTags.value.filter((item) => item !== tag)
}
</script>

<template>
  <mp-space :size="['2.666vmin', '2.666vmin']">
    <mp-tag v-model:show="show" closable status="primary">标签</mp-tag>
    <mp-tag v-for="tag in dynamicTags" :key="tag" closable round status="info" @close="removeTag(tag)">
      {{ tag }}
    </mp-tag>
  </mp-space>
</template>
