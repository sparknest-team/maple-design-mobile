<script setup>
import { computed, ref } from 'vue'

const current = ref(1)
const changes = ref(0)
const wider = ref(false)
const compact = ref(false)
const extra = ref(false)
const empty = ref(false)
const reversed = ref(false)
const widths = computed(() => {
  const items = empty.value ? [] : [140, 220, 180, 260, ...(extra.value ? [200] : [])]
  return (reversed.value ? items.reverse() : items).map((width) => width + (wider.value ? 80 : 0))
})
</script>

<template>
  <section class="auto-sized-demo">
    <mp-checkbox v-model="wider">Wider cards / 加宽卡片</mp-checkbox>
    <mp-checkbox v-model="compact">300px viewport / 窄容器</mp-checkbox>
    <mp-checkbox v-model="extra">Extra card / 增加末项</mp-checkbox>
    <mp-checkbox v-model="empty">Empty / 清空项目</mp-checkbox>
    <mp-checkbox v-model="reversed">Reverse cards / 反转顺序</mp-checkbox>
    <p role="status">Current: {{ current }} · Changes: {{ changes }}</p>
    <mp-carousel
      v-model="current"
      slides-per-view="auto"
      :space-between="12"
      height="180px"
      :style="{ width: compact ? '300px' : '100%' }"
      centered-slides
      draggable
      @change="changes++"
    >
      <mp-carousel-item v-for="width in widths" :key="width" :style="{ width: width + 'px' }">
        <div class="carousel-demo-panel">{{ width }}px</div>
      </mp-carousel-item>
    </mp-carousel>
  </section>
</template>
<style scoped>
.carousel-demo-panel {
  display: grid;
  place-items: center;
  height: 100%;
  background: #e0e7ff;
  color: #312e81;
}
</style>
