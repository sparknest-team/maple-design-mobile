<script setup lang="ts">
import { proxyRefs as demoProxyRefs } from 'vue'

const scene1 = demoProxyRefs(
  (() => {
    const items = [
      { label: 'System', value: 24, color: '#64748b', tip: 'System · 24 GB' },
      { label: 'Apps', value: 8, color: '#f53f3f' },
      { label: 'Media', value: 42, color: '#00b42a' },
    ]

    const sizes = ['xs', 'sm', 'md', 'lg', 'xl']

    const trackOnlyItems = [{ value: 16 }, { value: 22, color: '#722ed1' }, { value: 28, color: '#0fc6c2' }]
    return { items, sizes, trackOnlyItems }
  })(),
)

const scene2 = demoProxyRefs(
  (() => {
    const items = [
      { label: 'System', value: 24, color: '#64748b', tip: 'System · 24 GB' },
      { label: 'Apps', value: 8, color: '#f53f3f' },
      { label: 'Media', value: 42, color: '#00b42a' },
    ]

    const trackOnlyItems = [{ value: 16 }, { value: 22, color: '#722ed1' }, { value: 28, color: '#0fc6c2' }]
    return { items, trackOnlyItems }
  })(),
)
</script>

<template>
  <div class="demo-comparison">
    <section class="demo-comparison-case demo-comparison-case--1" data-comparison-scene="size">
      <h4><span lang="zh-CN">进度轨尺寸</span><span lang="en-US">Track Sizes</span></h4>
      <mp-space direction="column" size="md">
        <div v-for="size in scene1.sizes" :key="size" class="progress-group-example__size-row">
          <span>{{ size }}</span>
          <mp-progress-group :items="scene1.trackOnlyItems" :size="size" />
        </div>
      </mp-space>
    </section>

    <section class="demo-comparison-case demo-comparison-case--2" data-comparison-scene="color">
      <h4><span lang="zh-CN">默认颜色与纯进度轨</span><span lang="en-US">Default Color and Track Only</span></h4>
      <mp-space direction="column" size="lg">
        <mp-progress-group
          :items="[
            {
              label: 'Docs',
              value: 20,
            },
            {
              label: 'Tests',
              value: 35,
            },
          ]"
          color="#ff7d00"
          show-text
        />
        <mp-progress-group :items="scene2.trackOnlyItems" size="lg" />
      </mp-space>
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
  .progress-group-example__size-row {
    display: grid;
    grid-template-columns: 24px minmax(0, 1fr);
    align-items: center;
    gap: 12px;
  }

  .progress-group-example__orientations {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: start;
    gap: 24px;
  }

  .progress-group-example__vertical {
    height: 220px;
  }

  .progress-group-example__circles {
    display: flex;
    align-items: flex-start;
    justify-content: space-around;
    gap: 16px;
  }

  .progress-group-example__circle-status {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
.demo-comparison-case--2 {
  .progress-group-example__size-row {
    display: grid;
    grid-template-columns: 24px minmax(0, 1fr);
    align-items: center;
    gap: 12px;
  }

  .progress-group-example__orientations {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: start;
    gap: 24px;
  }

  .progress-group-example__vertical {
    height: 220px;
  }

  .progress-group-example__circles {
    display: flex;
    align-items: flex-start;
    justify-content: space-around;
    gap: 16px;
  }

  .progress-group-example__circle-status {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
