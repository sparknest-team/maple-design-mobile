<script setup lang="ts">
import { ref } from 'vue'

const open = ref(false)
const draggable = ref(true)
const fullscreen = ref(false)
function keyboard(event: KeyboardEvent) {
  if (event.key.toLowerCase() === 'd') {
    event.preventDefault()
    draggable.value = !draggable.value
  } else if (event.key.toLowerCase() === 'f') {
    event.preventDefault()
    fullscreen.value = !fullscreen.value
  }
}
</script>
<template>
  <mp-button @click="open = true">打开拖动示例 / Open drag example</mp-button>
  <mp-dialog
    v-model:open="open"
    :draggable="draggable"
    :fullscreen="fullscreen"
    title="拖动标题 / Drag title"
    @keydown="keyboard"
    @confirm="open = false"
    @cancel="open = false"
  >
    <p>
      拖动标题时按 D 开关拖动，按 F 开关全屏。关闭后可以重新打开。Drag the title, press D to disable dragging or F for
      fullscreen, and reopen after closing.
    </p>
    <mp-space wrap>
      <mp-button @click="draggable = !draggable">{{
        draggable ? '停用拖动 / Disable drag' : '启用拖动 / Enable drag'
      }}</mp-button>
      <mp-button @click="fullscreen = !fullscreen">{{
        fullscreen ? '退出全屏 / Exit fullscreen' : '进入全屏 / Fullscreen'
      }}</mp-button>
    </mp-space>
    <p role="status">{{ draggable ? '允许拖动 / Drag enabled' : '拖动已停止 / Drag stopped' }}</p>
  </mp-dialog>
</template>
