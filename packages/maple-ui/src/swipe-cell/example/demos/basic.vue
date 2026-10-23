<script setup>
import { ref } from 'vue'

const lastEvent = ref('向左滑动查看 open / close 事件中的 name')
function recordEvent(type, { name, position }) {
  lastEvent.value = `${type}: name=${name}, position=${position}`
}
</script>

<template>
  <div class="swipe-cell-example">
    <mp-swipe-cell name="order-1001" @open="recordEvent('open', $event)" @close="recordEvent('close', $event)">
      <template #right>
        <mp-button status="danger" style="height: 100%; border-radius: 0">删除</mp-button>
      </template>
      <mp-cell title="左滑显示操作" border />
    </mp-swipe-cell>
    <p role="status">{{ lastEvent }}</p>
  </div>
</template>
