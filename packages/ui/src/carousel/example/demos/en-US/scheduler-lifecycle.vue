<script setup lang="ts">
import { ref } from 'vue'

const active = ref(true)
const mounted = ref(true)
const current = ref(1)
const playing = ref(false)
const moves = ref(0)
</script>
<template>
  <div>
    <mp-button @click="playing = !playing">Autoplay / 自动播放</mp-button>
    <mp-button @click="active = !active">Activate / 停用与激活</mp-button>
    <mp-button @click="mounted = !mounted">Mount / 卸载与挂载</mp-button>
    <p>
      Current / 当前: {{ current }}; changes / 通知: {{ moves }}. Suspend during autoplay or loop settlement, then
      activate. Old work must not replay.
    </p>
    <KeepAlive v-if="mounted">
      <mp-carousel
        v-if="active"
        v-model="current"
        :auto-play="playing ? { interval: 1000 } : false"
        :move-speed="600"
        :height="180"
        keyboard
        mousewheel
        @change="moves++"
      >
        <mp-carousel-item v-for="item in 3" :key="item">Slide / 幻灯片 {{ item }}</mp-carousel-item>
      </mp-carousel>
    </KeepAlive>
  </div>
</template>
