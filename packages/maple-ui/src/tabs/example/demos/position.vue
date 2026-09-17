<script setup lang="ts">
import { ref } from 'vue'

const orientations = ['horizontal', 'vertical'] as const
const positions = ['normal', 'reverse'] as const
const componentOrders = ['nav-first', 'items-first'] as const
const orientation = ref<(typeof orientations)[number]>('horizontal')
const indicatorPosition = ref<(typeof positions)[number]>('normal')
const componentOrder = ref<(typeof componentOrders)[number]>('nav-first')
</script>

<template>
  <div class="demo-controls">
    <div class="demo-control">
      <span class="demo-label">Orientation</span>
      <mp-radio-group v-model="orientation">
        <mp-radio v-for="value in orientations" :key="value" :value="value">{{ value }}</mp-radio>
      </mp-radio-group>
    </div>
    <div class="demo-control">
      <span class="demo-label">Indicator</span>
      <mp-radio-group v-model="indicatorPosition">
        <mp-radio v-for="value in positions" :key="value" :value="value">{{ value }}</mp-radio>
      </mp-radio-group>
    </div>
    <div class="demo-control">
      <span class="demo-label">Component order</span>
      <mp-radio-group v-model="componentOrder">
        <mp-radio value="nav-first">TabsNavs → TabsItems</mp-radio>
        <mp-radio value="items-first">TabsItems → TabsNavs</mp-radio>
      </mp-radio-group>
    </div>
  </div>
  <mp-tabs :orientation="orientation" :indicator-position="indicatorPosition" default-active="first">
    <template v-if="componentOrder === 'items-first'">
      <mp-tabs-items>
        <mp-tab-item key="first">第一个面板</mp-tab-item>
        <mp-tab-item key="second">第二个面板</mp-tab-item>
        <mp-tab-item key="third">第三个面板</mp-tab-item>
      </mp-tabs-items>
      <mp-tabs-navs aria-label="方向示例">
        <mp-tab-nav key="first" title="第一个" />
        <mp-tab-nav key="second" title="第二个" />
        <mp-tab-nav key="third" title="第三个" />
      </mp-tabs-navs>
    </template>
    <template v-else>
      <mp-tabs-navs aria-label="方向示例">
        <mp-tab-nav key="first" title="第一个" />
        <mp-tab-nav key="second" title="第二个" />
        <mp-tab-nav key="third" title="第三个" />
      </mp-tabs-navs>
      <mp-tabs-items>
        <mp-tab-item key="first">第一个面板</mp-tab-item>
        <mp-tab-item key="second">第二个面板</mp-tab-item>
        <mp-tab-item key="third">第三个面板</mp-tab-item>
      </mp-tabs-items>
    </template>
  </mp-tabs>
</template>

<style scoped>
.demo-controls,
.demo-control {
  display: grid;
  gap: 12px;
}

.demo-controls {
  margin-bottom: 16px;
}

.demo-label {
  font-size: 13px;
  opacity: 0.7;
}
</style>
