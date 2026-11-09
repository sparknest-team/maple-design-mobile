<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{ move: [to: 'A' | 'B'] }>()
const draft = ref('Draft')
const location = ref<'A' | 'B'>('A')
function move(to: 'A' | 'B') {
  location.value = to
  emit('move', to)
}
</script>
<template>
  <div>
    <p>当前挂载区域 / Current target: {{ location }}</p>
    <input v-model="draft" aria-label="服务草稿 / Service draft" />
    <p>切换挂载区域后，输入草稿仍保留。Moving the same dialog preserves its draft.</p>
    <mp-button @click="move('A')">移动到 A / Move to A</mp-button>
    <mp-button @click="move('B')">移动到 B / Move to B</mp-button>
  </div>
</template>
