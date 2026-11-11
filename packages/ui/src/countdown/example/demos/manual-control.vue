<script setup>
import { ref } from 'vue'
import { Message } from '@maple-design/ui-vue'

const countdownRef = ref()
function handleEnd() {
  Message.info('end!')
}
</script>

<template>
  <mp-countdown ref="countdownRef" :time="5000" :auto-start="false" format="ss.SSS" @end="handleEnd" />
  <mp-row justify="space-between" align="center" style="margin-top: 10px">
    <mp-button status="primary" @click="countdownRef.start()">开始</mp-button>
    <mp-button @click="countdownRef.pause()">暂停</mp-button>
    <mp-button @click="countdownRef.reset()">重置</mp-button>
  </mp-row>
</template>

<style scoped>
.countdown-example-block {
  background: var(--mp-color-primary);
  color: var(--mp-color-white);
  width: 30px;
  height: 30px;
  border-radius: 50%;
  padding: 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.countdown-example-colon {
  margin: 0 5px;
  font-size: 18px;
  font-weight: 500;
}
</style>
