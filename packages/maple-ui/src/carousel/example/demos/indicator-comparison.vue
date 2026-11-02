<script setup lang="ts">
import { ref } from 'vue'

const current = ref(1)
const groups = [
  {
    name: 'indicator-type',
    zh: '指示器样式',
    en: 'Indicator types',
    values: [
      { label: 'dot', type: 'dot', position: 'bottom' },
      { label: 'line', type: 'line', position: 'bottom' },
      { label: 'slider', type: 'slider', position: 'bottom' },
    ],
  },
  {
    name: 'indicator-position',
    zh: '指示器位置',
    en: 'Indicator positions',
    values: [
      { label: 'top', type: 'dot', position: 'top' },
      { label: 'outer', type: 'dot', position: 'outer' },
    ],
  },
] as const
const slides = [
  'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22640%22%20height%3D%22240%22%3E%3Crect%20width%3D%22640%22%20height%3D%22240%22%20fill%3D%22%23286b72%22%2F%3E%3Ctext%20x%3D%22320%22%20y%3D%22130%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%20font-size%3D%2236%22%3ESlide%201%3C%2Ftext%3E%3C%2Fsvg%3E',
  'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22640%22%20height%3D%22240%22%3E%3Crect%20width%3D%22640%22%20height%3D%22240%22%20fill%3D%22%234b5694%22%2F%3E%3Ctext%20x%3D%22320%22%20y%3D%22130%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%20font-size%3D%2236%22%3ESlide%202%3C%2Ftext%3E%3C%2Fsvg%3E',
  'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22640%22%20height%3D%22240%22%3E%3Crect%20width%3D%22640%22%20height%3D%22240%22%20fill%3D%22%23965734%22%2F%3E%3Ctext%20x%3D%22320%22%20y%3D%22130%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%20font-size%3D%2236%22%3ESlide%203%3C%2Ftext%3E%3C%2Fsvg%3E',
]
</script>
<template>
  <div class="indicator-comparison">
    <p role="status">Slide: {{ current }}</p>
    <section v-for="group in groups" :key="group.name" :data-comparison-scene="group.name">
      <h4>
        <span lang="zh-CN">{{ group.zh }}</span
        ><span lang="en-US">{{ group.en }}</span>
      </h4>
      <div class="indicator-comparison-grid">
        <div v-for="preset in group.values" :key="preset.label">
          <p>
            <code>{{ preset.label }}</code>
          </p>
          <mp-carousel
            v-model="current"
            :indicator-type="preset.type"
            :indicator-position="preset.position"
            style="height: 150px"
          >
            <mp-carousel-item v-for="(src, index) in slides" :key="src"
              ><img :src="src" :alt="'Slide ' + (index + 1)"
            /></mp-carousel-item>
          </mp-carousel>
        </div>
      </div>
    </section>
  </div>
</template>
<style scoped>
.indicator-comparison {
  display: grid;
  gap: 24px;
  min-width: 0;
  max-width: 100%;
}
.indicator-comparison-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr));
  gap: 16px;
}
.indicator-comparison > section,
.indicator-comparison-grid,
.indicator-comparison-grid > div {
  min-width: 0;
  max-width: 100%;
}
p,
h4 {
  margin: 0 0 8px;
}
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}
html:not([lang='en-US']) h4 > [lang='en-US'],
html[lang='en-US'] h4 > [lang='zh-CN'] {
  display: none;
}
</style>
