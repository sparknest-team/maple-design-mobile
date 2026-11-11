<script setup lang="ts">
import { ref } from 'vue'

const variants = ['line', 'card', 'outline', 'plain', 'capsule', 'enclosed'] as const
const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
const variant = ref<(typeof variants)[number]>('line')
const size = ref<(typeof sizes)[number]>('md')
</script>

<template>
  <div class="demo-panel">
    <div class="demo-control">
      <span class="demo-label">Variant</span>
      <mp-radio-group v-model="variant">
        <mp-radio v-for="value in variants" :key="value" :value="value">{{ value }}</mp-radio>
      </mp-radio-group>
    </div>
    <div class="demo-control">
      <span class="demo-label">Size</span>
      <mp-radio-group v-model="size">
        <mp-radio v-for="value in sizes" :key="value" :value="value">{{ value }}</mp-radio>
      </mp-radio-group>
    </div>
  </div>
  <mp-tabs :variant="variant" :size="size" default-value="news">
    <mp-tabs-navs aria-label="内容分类">
      <mp-tab-nav name="news" title="资讯" />
      <mp-tab-nav name="favorites" title="收藏" />
      <mp-tab-nav name="history" title="历史" />
    </mp-tabs-navs>
    <mp-tabs-items>
      <mp-tab-item name="news">最新资讯</mp-tab-item>
      <mp-tab-item name="favorites">我的收藏</mp-tab-item>
      <mp-tab-item name="history">浏览历史</mp-tab-item>
    </mp-tabs-items>
  </mp-tabs>
</template>

<style scoped>
.demo-panel {
  display: grid;
  gap: 16px;
  margin-bottom: 16px;
}

.demo-control {
  display: grid;
  gap: 8px;
}

.demo-label {
  font-size: 13px;
  opacity: 0.7;
}
</style>
