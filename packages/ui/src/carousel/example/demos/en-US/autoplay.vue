<script setup>
import { ref } from 'vue'

const current = ref(1)
const playing = ref(true)
const changes = ref(0)
const sources = ['cat.jpg', 'cat2.jpg', 'cat3.jpg']
</script>

<template>
  <section class="carousel-autoplay-demo">
    <mp-checkbox v-model="playing" edit-mode="direct">Autoplay</mp-checkbox>
    <p role="status">Current slide：{{ current }}；Changes：{{ changes }}</p>
    <mp-carousel
      v-model="current"
      height="180px"
      :auto-play="playing ? 2000 : false"
      @focusin="playing = false"
      @change="changes += 1"
    >
      <mp-carousel-item v-for="(source, index) in sources" :key="source">
        <img class="carousel-autoplay-demo__image" :src="source" :alt="'Demo image ' + (index + 1)" />
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
