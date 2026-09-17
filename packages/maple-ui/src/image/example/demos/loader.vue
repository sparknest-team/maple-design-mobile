<script setup lang="ts">
import { ref } from 'vue'

const timestamp = ref('')

function reload() {
  timestamp.value = String(Date.now())
}
</script>

<template>
  <mp-space direction="column" :size="16">
    <mp-button status="primary" size="sm" @click="reload">重新加载</mp-button>
    <mp-space :size="16" wrap>
      <mp-image width="160" height="160" show-loader :src="`/cat.jpg?reload=${timestamp}`" preview-disabled />
      <mp-image width="160" height="160" :src="`/cat.jpg?reload=${timestamp}`" preview-disabled>
        <template #loader>
          <div class="loader-animate" />
        </template>
      </mp-image>
      <mp-image width="160" height="160" :src="`/cat.jpg?reload=${timestamp}`" preview-disabled>
        <template #loader>
          <img class="progressive" src="/cat2.jpg" alt="" />
        </template>
      </mp-image>
    </mp-space>
  </mp-space>
</template>

<style scoped>
.loader-animate {
  width: 100%;
  height: 100%;
  background: linear-gradient(
    -60deg,
    var(--mp-color-fill-2) 25%,
    var(--mp-color-fill-3) 40%,
    var(--mp-color-fill-2) 55%
  );
  background-size: 400% 100%;
  animation: loop-circle 1.5s cubimp-bezier(0.34, 0.69, 0.1, 1) infinite;
}

.progressive {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(5px);
}

@keyframes loop-circle {
  0% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0 50%;
  }
}
</style>
