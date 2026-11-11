<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import type { SignatureInstance } from '../..'

const pad = ref<SignatureInstance>()
const visible = ref(true)
const nextCleanup = ref<'none' | 'reset' | 'pause'>('none')
const starts = ref(0)
const signs = ref(0)
const ends = ref(0)
const status = ref('触屏落笔后移动；结束事件只表示交互结束 / Draw with touch; end is an interaction notification')
let timer: ReturnType<typeof setTimeout> | undefined
function clearPending() {
  if (timer !== undefined) {
    clearTimeout(timer)
  }
  timer = undefined
}
function start() {
  starts.value++
  clearPending()
  const cleanup = nextCleanup.value
  nextCleanup.value = 'none'
  if (cleanup === 'none') {
    status.value = '正在书写 / Writing'
    return
  }
  status.value = '保持触点，1 秒后取消本次交互 / Keep touching; the interaction stops in one second'
  timer = setTimeout(() => {
    timer = undefined
    if (cleanup === 'reset') {
      pad.value?.reset()
      status.value = '已重置，需重新落笔 / Reset; a fresh touchstart is required'
    } else {
      visible.value = false
      status.value = '已停用，恢复后需重新落笔 / Paused; resume and start a new stroke'
    }
  }, 1000)
}
function end() {
  ends.value++
  clearPending()
  if (visible.value) {
    status.value = '本次交互已结束 / Interaction ended'
  }
}
function resume() {
  visible.value = true
  status.value = '已恢复，请重新落笔 / Resumed; start a fresh stroke'
}
function resetNow() {
  if (!pad.value) {
    return
  }
  clearPending()
  pad.value.reset()
  status.value = '已重置，需重新落笔 / Reset; a fresh touchstart is required'
}
function arm(cleanup: 'reset' | 'pause') {
  nextCleanup.value = cleanup
  status.value = '下次落笔后等待 1 秒 / Touch down, then wait one second'
}
onBeforeUnmount(clearPending)
</script>
<template>
  <mp-space direction="column" style="width: 100%" :size="16">
    <p>
      先选择自动重置或停用，再用触屏书写并保持触点。后续移动不应延续已取消笔画。Arm a cleanup, then draw and keep the
      contact down; later moves must not resume the canceled stroke.
    </p>
    <KeepAlive>
      <mp-signature
        v-if="visible"
        ref="pad"
        role="img"
        aria-label="签名书写区域 / Signature pad"
        @start="start"
        @signing="signs++"
        @end="end"
      />
    </KeepAlive>
    <mp-space wrap>
      <mp-button @click="arm('reset')">下次自动重置 / Arm reset</mp-button>
      <mp-button @click="arm('pause')">下次自动停用 / Arm pause</mp-button>
      <mp-button @click="resume">恢复签名区 / Resume pad</mp-button>
      <mp-button :disabled="!visible" @click="resetNow">立即重置 / Reset now</mp-button>
    </mp-space>
    <p role="status">start: {{ starts }}；signing: {{ signs }}；end: {{ ends }}；{{ status }}</p>
  </mp-space>
</template>
