<script setup>
import { ref } from 'vue'

const first = ref()
const second = ref()
const active = ref(true)
const alternate = ref(false)
let retained
const capture = (instance) => {
  if (instance) {
    retained = instance
  }
}
const lower = () => {
  if (first.value) {
    first.value.scrollTop = 300
  }
  if (second.value) {
    second.value.scrollTop = 300
  }
}
</script>
<template>
  <div style="position: relative">
    <mp-button @click="lower">Scroll down / 滚动到底部</mp-button>
    <mp-button @click="alternate = !alternate">Switch target / 切换目标</mp-button>
    <mp-button @click="active = !active">Activate / 停用与激活</mp-button>
    <mp-button @click="retained?.scrollToTop()">Retained command / 保留命令</mp-button>
    <p>Start an animation, switch or deactivate before completion. Old work must not resume.</p>
    <div ref="first" style="height: 100px; overflow: auto"><div style="height: 500px">Target A</div></div>
    <div ref="second" style="height: 100px; overflow: auto"><div style="height: 500px">Target B</div></div>
    <KeepAlive>
      <mp-back-top
        v-if="active"
        :ref="capture"
        :target-container="() => (alternate ? second : first)"
        :popup-container="false"
        :duration="1000"
        easing="linear"
      />
    </KeepAlive>
  </div>
</template>
