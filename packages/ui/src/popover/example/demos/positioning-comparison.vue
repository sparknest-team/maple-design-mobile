<script setup lang="ts">
import { proxyRefs as demoProxyRefs, ref } from 'vue'

const scene1 = demoProxyRefs(
  (() => {
    const placementValue = ref('bottom-start')

    const placementOptions = ref([
      'top',
      'top-start',
      'top-end',
      'bottom',
      'bottom-start',
      'bottom-end',
      'right',
      'right-start',
      'right-end',
      'left',
      'left-start',
      'left-end',
    ])
    return { placementValue, placementOptions }
  })(),
)
</script>

<template>
  <div class="demo-comparison">
    <section class="demo-comparison-case demo-comparison-case--1" data-comparison-scene="placement">
      <h4><span lang="zh-CN">位置、偏移与同宽</span><span lang="en-US">Placement and offset</span></h4>
      <mp-form-item layout="vertical" size="sm" label="placementValue">
        <mp-select v-model="scene1.placementValue" aria-label="placementValue" :hint="false">
          <mp-option v-for="(item, index) in scene1.placementOptions" :key="index" :label="item" />
        </mp-select>
      </mp-form-item>
      <div class="placement-container">
        <mp-popover :placement="scene1.placementValue">
          <mp-button status="primary">
            <m-icon-star-fill />
          </mp-button>
          <template #content>
            <mp-cell>选项</mp-cell>
            <mp-cell>选项</mp-cell>
            <mp-cell>选项</mp-cell>
          </template>
        </mp-popover>
      </div>
    </section>

    <section class="demo-comparison-case demo-comparison-case--2" data-comparison-scene="offset">
      <h4><span lang="zh-CN">位置、偏移与同宽</span><span lang="en-US">Placement and offset</span></h4>
      <mp-popover :popup-translate="[36, 18]">
        <mp-button status="primary">偏移量</mp-button>
        <template #content>
          <mp-cell>选项</mp-cell>
          <mp-cell>选项</mp-cell>
          <mp-cell>选项</mp-cell>
        </template>
      </mp-popover>
    </section>

    <section class="demo-comparison-case demo-comparison-case--3" data-comparison-scene="auto-fit-popup-width">
      <h4><span lang="zh-CN">位置、偏移与同宽</span><span lang="en-US">Placement and offset</span></h4>
      <mp-popover auto-fit-popup-width>
        <mp-button status="primary">与触发元素同宽</mp-button>

        <template #content>
          <mp-cell>选项</mp-cell>
          <mp-cell>选项</mp-cell>
          <mp-cell>选项</mp-cell>
        </template>
      </mp-popover>
    </section>
  </div>
</template>

<style scoped lang="less">
.demo-comparison {
  display: grid;
  gap: 24px;
  min-width: 0;
  max-width: 100%;
}
.demo-comparison-case {
  min-width: 0;
  max-width: 100%;
}
.demo-comparison-case > h4 {
  margin: 0 0 12px;
  font-size: 14px;
}
html:not([lang='en-US']) .demo-comparison-case > h4 > [lang='en-US'],
html[lang='en-US'] .demo-comparison-case > h4 > [lang='zh-CN'] {
  display: none;
}
.demo-comparison-case--1 {
  .placement-container {
    height: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.demo-comparison-case--2 {
  .placement-container {
    height: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.demo-comparison-case--3 {
  .placement-container {
    height: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
