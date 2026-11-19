<script setup>
import { ref } from 'vue'
import { demoEnglish as english } from '@maple-design/cli-vue/demo-language'

const current = ref(1)
const playing = ref(true)
const changes = ref(0)
const sources = ['cat.jpg', 'cat2.jpg', 'cat3.jpg']
</script>

<template>
  <section class="carousel-autoplay-demo">
    <mp-checkbox v-model="playing" edit-mode="direct">{{ english ? 'Autoplay' : '自动播放' }}</mp-checkbox>
    <p role="status">
      {{ english ? 'Current slide' : '当前页' }}：{{ current }}；{{ english ? 'Changes' : '切换次数' }}：{{ changes }}
    </p>
    <mp-carousel
      v-model="current"
      height="180px"
      :auto-play="playing ? 2000 : false"
      @focusin="playing = false"
      @change="changes += 1"
    >
      <mp-carousel-item v-for="(source, index) in sources" :key="source">
        <img
          class="carousel-autoplay-demo__image"
          :src="source"
          :alt="(english ? 'Demo image ' : '示例图片 ') + (index + 1)"
        />
      </mp-carousel-item>
    </mp-carousel>
  </section>
</template>

<style scoped>
.carousel-autoplay-demo__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}
</style>
